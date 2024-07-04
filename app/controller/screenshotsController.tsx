"use client";

import axios from "axios";

export const screenshotsController = async (
  url: string,
  foldername: string = "default",
) => {
  let screens: any = {};

  try {
    const screensExist = await getScreens();

    if (screensExist) {
      console.log("Screens already exist:", screensExist);
      screens = screensExist;
      return screens;
    }

    const createdScreens = await createScreens(url, foldername);

    if (createdScreens) {
      console.log("Screens created successfully:", createdScreens);
      screens = createdScreens;
      return screens;
    }

    return screens;
  } catch (error) {
    console.error("Error in screenshotsController:", error);
    return screens; // Return empty screens or handle error as per your application logic
  }
};

const getScreens = async () => {
  try {
    const response = await axios.get("/api/images");
    return response.data; // Assuming response.data contains the screens or an indication of existence
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false; // Screens do not exist
    }
    throw error;
  }
};

const createScreens = async (url: string, foldername: string) => {
  try {
    const response = await axios.post("/api/images", {
      url: url,
      fullPage: true,
      foldername: foldername,
    });

    if (response.status === 200) {
      return response.data; // Assuming response.data contains the created screens
    } else {
      throw new Error("Failed to create screens");
    }
  } catch (error) {
    console.error("Error creating screens:", error);
    throw error;
  }
};
