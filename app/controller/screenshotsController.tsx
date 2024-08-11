import axios, { AxiosError } from "axios";

export const screenshotsController = async (
  urls: string[],
  foldername = "default"
): Promise<any[]> => {
  const screens: any[] = [];

  for (const url of urls) {
    try {
      const response = await get_screens(url);
      if (response && response.length > 0) {
        // console.log(`Screens exist for ${url}:`, response);

        screens.push(response);
      } else {
        const createdScreens = await createScreens(url);
        // console.log(`Screens created for ${url}:`, createdScreens);
        screens.push(createdScreens);
      }
    } catch (error) {
      console.error(`Error processing ${url}:`, error);
    }
  }
  console.log(screens);

  return screens;
};

const get_screens = async (url: string) => {
  try {
    const response = await axios.get("/api/images", { params: { url } });
    return response.data; // Assuming response.data contains the screens or an indication of existence
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        return null; // Screens do not exist
      }
    }
    throw error;
  }
};

const createScreens = async (url: string, foldername: string) => {
  try {
    const response = await axios.post("/api/images", {
      url,
      fullPage: true,
      foldername,
    });

    console.log(response);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to create screens");
    }
  } catch (error) {
    console.error("Error creating screens:", error);
    throw error;
  }
};
