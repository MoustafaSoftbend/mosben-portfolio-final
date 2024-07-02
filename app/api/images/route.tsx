"use server";

import puppeteer from "puppeteer";
import {
  handleCloudinaryUpload,
  handleGetCloudinaryUploads,
} from "../../../lib/cloudinary";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  try {
    const uploads = await handleGetRequest();
    console.log("Uploads:", uploads);
    return NextResponse.json(uploads);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 },
      );
    }
  }
}

export async function POST(request) {
  try {
    const { url, fullPage } = await request.json();

    let results;
    if (Array.isArray(url)) {
      results = await Promise.all(
        url.map((screenshot, index) =>
          handlePostRequest({ url: screenshot, fullPage, index }),
        ),
      );
    } else {
      results = await handlePostRequest({ url, fullPage });
    }
    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 },
      );
    }
  }
}

const handleGetRequest = async () => {
  const uploads = await handleGetCloudinaryUploads();
  return uploads;
};

const handlePostRequest = async (options) => {
  const { url, fullPage, index } = options;

  // Use URL hostname as folder name to group screenshots
  const folderName = new URL(url).hostname.replace(/\./g, "_");

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium-browser",
  });

  const page = await browser.newPage();
  const path = `public/screenshots/${index !== undefined ? `screen_${index}` : "screen"}`;

  await page.goto(url, { waitUntil: "load" });

  const takeScreenshotsWhileScrolling = async () => {
    const height = await page.evaluate("document.body.scrollHeight");
    let scrollPosition = 0;
    let idx = 0;

    while (scrollPosition < height) {
      const filePath = `${path}_${Date.now()}_${idx}.png`;

      await page.screenshot({
        path: filePath,
        fullPage: false,
      });

      await page.evaluate("window.scrollBy(0, window.innerHeight)");
      scrollPosition += await page.evaluate("window.innerHeight");
      idx++;
    }
  };

  await takeScreenshotsWhileScrolling();
  await browser.close();

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
          folderName,
        });
        console.log(uploadResponse);
        await fs.unlink(`public/screenshots/${screenshot}`);
        return uploadResponse;
      }),
  );

  return uploadResponses;
};
