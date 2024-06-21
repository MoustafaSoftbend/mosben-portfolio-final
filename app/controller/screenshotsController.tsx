"use client";

import axios from "axios";

export const screenshotsController = async (url, foldername = "default") => {
  let screens = {};
  const response = await get_screens();
  if (response.status == 200) {
    console.log(response);
    screens = response;
    return screens;
  }
  response = await createScreens(url, foldername);
  if (response.status == 200) {
    console.log(response);
    screens = response;
    return screens;
  }
  return screens;
};

const get_screens = async () => {
  try {
    const response = await axios.get("api/images");
    return response.data.resources.length > 0;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    throw error;
  }
};

const createScreens = async (url, foldername) => {
  try {
    const response = await axios.post("/api/images", {
      url: url,
      fullPage: true,
      foldername,
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
