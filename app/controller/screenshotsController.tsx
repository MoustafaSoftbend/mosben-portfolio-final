"use client";

import axios from "axios";

export const screenshotsController = async (url, foldername = "default") => {
  try {
    const response = await axios.post("/api/images", {
      url: url,
      fullPage: true,
    });

    if (!response.ok) {
      throw data;
    }
  } catch (error) {
    console.error(error);
  } finally {
  }
};

// const args = process.argv.slice(2);

// // Check if there are any arguments
// if (args.length === 0) {
//   const url = args[0];
//   console.log("Process started... ", url);
//   screenshotsController(url);
//   process.exit(1);
// }
