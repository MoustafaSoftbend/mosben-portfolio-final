import axios, { AxiosError } from "axios";

export const screenshotsController = async (
  urls: string[],
): Promise<any[]> => {
  const screens: any[] = [];

  for (const url of urls) {
    console.log(url)
    try {
      const existingScreens = await get_screens();
      // Ensure that existingScreens is checked properly
      console.log(Object.keys(existingScreens).length)
      if (existingScreens &&Object.keys(existingScreens).length ==urls.length) {
        console.log(existingScreens)
        console.log(`Screens exist for ${url}:`, existingScreens);
        screens.push(existingScreens);
      } else {
        // If no existing screens, create new ones
        const createdScreens = await createScreens(url); // Make sure foldername is passed
        console.log(`Screens created for ${url}:`, createdScreens);
        screens.push(createdScreens);
      }
    } catch (error) {
      console.error(`Error processing ${url}:`, error);
    }
  }
console.log(screens)
  return screens;
};

const get_screens = async () => {
  try {
    const response = await axios.get("/api/images");
    return response.data; // Assuming response.data contains the screens or null/empty array
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        return null; // Screens do not exist
      }
    }
    throw error; // Rethrow error for unexpected cases
  }
};

const createScreens = async (url: string) => {
  try {
    const response = await axios.post("/api/images", {
      url,
      fullPage: true,
      // foldername,
    });

    if (response.status === 200) {
      return response.data; // Assume response.data contains the created screens
    } else {
      throw new Error("Failed to create screens");
    }
  } catch (error) {
    console.error("Error creating screens:", error);
    throw error;
  }
};
