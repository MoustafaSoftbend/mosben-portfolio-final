// pages/api/images/index.js

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
"use server";

import puppeteer from "puppeteer";
import {
  handleCloudinaryUpload,
  handleGetCloudinaryUploads,
} from "../../../lib/cloudinary";
import { promises as fs } from "fs";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const uploads = await handleGetRequest();
    console.log("Uploads:", uploads);
    return NextResponse.json(uploads);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url, fullPage } = await request.json();

    // Check if the url variable is an array
    let results;
    if (Array.isArray(url)) {
      // Handle multiple URLs
      results = await Promise.all(
        url.map((screenshot, index) =>
          handlePostRequest({ url: screenshot, fullPage, index }),
        ),
      );
    } else {
      // Handle single URL
      results = await handlePostRequest({ url, fullPage });
    }
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
const handleGetRequest = async () => {
  const uploads = await handleGetCloudinaryUploads();

  return uploads;
};

const handlePostRequest = async (options) => {
  // Get the url and fullPage from the options
  const { url, fullPage } = options;
  const index = options.index;
  const folderName = options.folderName || "Folder_0";

  // Launch a new browser using puppeteer
  const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium-browser'
  });

  // Create a new page in the browser
  const page = await browser.newPage();

  const urlObject = new URL(url);

  // Define a path where the screenshot will be saved
  const path = `public/screenshots/${index !== undefined ? `screen_${index}` : "screen"}`;

  // Navigate to the url
  await page.goto(url, { waitUntil: "load" });

  // // Take a screenshot of the page
  // await page.screenshot({
  //   path,
  //   fullPage,
  // });
  // Function to scroll and take screenshots
  const takeScreenshotsWhileScrolling = async () => {
    const height = await page.evaluate("document.body.scrollHeight");
    let scrollPosition = 0;
    let index = 0;

    while (scrollPosition < height) {
      const filePath = `${path}_${index}.png`;

      await page.screenshot({
        path: filePath,
        fullPage: false,
      });

      await page.evaluate("window.scrollBy(0, window.innerHeight)");
      scrollPosition += await page.evaluate("window.innerHeight");
      index++;
    }
  };

  // Take screenshots while scrolling
  await takeScreenshotsWhileScrolling();

  // Close the browser once done
  await browser.close();

  // Upload all screenshots to Cloudinary
  const screenshots = await fs.readdir("public/screenshots");
  const uploadResponses = await Promise.all(
    screenshots
      .filter((screenshot) =>
        screenshot.startsWith(`screen_${index !== undefined ? index : ""}`),
      )
      .map(async (screenshot) => {
        const uploadResponse = await handleCloudinaryUpload({
          path: `public/screenshots/${screenshot}`,
          folder: true,
        });
        console.log(uploadResponse);
        await fs.unlink(`public/screenshots/${screenshot}`);
        return uploadResponse;
      }),
  );

  return uploadResponses;

  // Close the browser once done
  await browser.close();

  // Upload the screenshot to cloudinary
  const uploadResponse = await handleCloudinaryUpload({
    path,
    folder: true,
    folderName,
  });
  console.log(uploadResponse);
  // Delete the screenshot from the server
  await fs.unlink(path);

  return uploadResponse;
};
