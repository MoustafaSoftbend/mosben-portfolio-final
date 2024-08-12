import puppeteer from "puppeteer";
import {
  handleCloudinaryUpload,
  handleGetCloudinaryUploads,
  handleFolderCall,
} from "../../../lib/cloudinary";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const uploads = await handleGetRequest();
    return NextResponse.json(uploads);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url, fullPage } = await request.json();

    // Get the last folder name
    const folders = await handleFolderCall();

    const folderName =
      folders.length > 0 ? `Screen_${folders.folders.length}` : "Screen_0";

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
  console.log(folderName);

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium-browser",
  });

  const page = await browser.newPage();

  const urlObject = new URL(url);

  const path = `public/screenshots/${
    index !== undefined ? `screen_${index}` : "screen"
  }`;

  await page.goto(url, { waitUntil: "load" });

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
        const uploadResponse = await handleCloudinaryUpload({
          path: `public/screenshots/${screenshot}`,
          folder: true,
          folderName: `Screens/${folderName}`,
        });
        console.log(uploadResponse);
        await fs.unlink(`public/screenshots/${screenshot}`);
        return uploadResponse;
      })
  );

  return uploadResponses;
};
