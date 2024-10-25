"use server";
import puppeteer from "puppeteer";
import {
  handleCloudinaryUpload,
  handleGetCloudinaryUploads,
  handleFolderCall,
} from "../../../lib/cloudinary";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import {RateLimitmiddleware} from "../../middleware/Rate-limit";


export async function GET(request: NextRequest) {
  let response:any = []
  let results:any = []
  try {
    await RateLimitmiddleware(request);
    const folders = await handleFolderCall();
    if (folders.total_count > 0) {
      const uploadPromises = folders.folders.map(async (folder:any) => {
        const uploads = await handleGetRequest();
        return uploads
      });
      results = await Promise.all(uploadPromises);
    }
      response.push(...results);
    return NextResponse.json(response.length>0 ? response : { message: "No uploads found" });
  }
   catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    await RateLimitmiddleware(request);

    const { url, fullPage, length } = await request.json();

    // Get the last folder name
    const folders = await handleFolderCall();

    const folderName =
      folders.total_count > 0 ? `Screen_${url}` : "Screen_0";
      console.log(folders.total_count,length)
      if(folders.total_count >= length){
        return NextResponse.json({}, { status: 500 });
      
      }
    // return NextResponse.json(folderName)

    // Check if the url variable is an array
    let results;
    if (Array.isArray(url)) {
      // Handle multiple URLs

      // return NextResponse.json("lenFolder not found");
      results = await Promise.all(
        url.map((screenshot, index) =>
          handlePostRequest({ url: screenshot, fullPage, index, folderName })
        )
      );
    } else {
      // Handle single URL
      results = await handlePostRequest({ url, fullPage, folderName });
    }
    console.log(results);
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}

const handleGetRequest = async () => {
  const uploads = await handleGetCloudinaryUploads();
  return uploads;
};

const handlePostRequest = async (options: {
  url: string;
  fullPage: boolean;
  index?: number;
  folderName?: string;
}) => {
  const { url, fullPage, index, folderName } = options;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium-browser",
  });

  const page = await browser.newPage();

  const urlObject = new URL(url);

  const path = `public/screenshots/${
    index !== undefined ? `screen_${index}` : "screen"
  }`;

  await page.goto(url, { timeout: 0 });

  const takeScreenshotsWhileScrolling = async () => {
    const height: number = await page.evaluate(
      () => document.body.scrollHeight as number
    );
    let scrollPosition = 0;
    let index = 0;

    while (scrollPosition < height) {
      const filePath = `${path}_${index}.png`;

      await page.screenshot({
        path: filePath,
        fullPage: false,
      });

      await page.evaluate("window.scrollBy(0, window.innerHeight)");
      const innerHeight = (await page.evaluate(
        () => window.innerHeight
      )) as number;
      scrollPosition += innerHeight;
      index++;
    }
  };

  await takeScreenshotsWhileScrolling();

  await browser.close();

  const screenshots = await fs.readdir("public/screenshots");

  const uploadResponses = await Promise.all(
    screenshots
      .filter((screenshot) =>
        screenshot.startsWith(`screen_${index !== undefined ? index : ""}`)
      )
      .map(async (screenshot) => {
        const parsedUrl = new URL(url);
        const host = parsedUrl.hostname;
        const uploadResponse = await handleCloudinaryUpload({
          path: `public/screenshots/${screenshot}`,
          folder: true,
          folderName: `Screens/${host}`,
        });
        // console.log(uploadResponse);
        await fs.unlink(`public/screenshots/${screenshot}`);
        return uploadResponse;
      })
  );

  return uploadResponses;
};
