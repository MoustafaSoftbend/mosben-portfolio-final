import axios, { AxiosError } from "axios";

export const screenshotsController = async (
  urls: string[],
  foldername = "default",
): Promise<any[]> => {
  const screens: any[] = [];

  for (const url of urls) {
    try {
      const response = await get_screens(url);
      console.log(response.folders.length, urls.length)
      // if (response && response.folders.length == urls.length) {
      //   // console.log(`Screens exist for ${url}:`, response);

      //   screens.push(response);
      // } else {
      const createdScreens = await createScreens(urls);
      // console.log(`Screens created for ${url}:`, createdScreens);
      screens.push(createdScreens);
      // }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Response error data:', error.response.data);
          console.error('Response error status:', error.response.status);
          console.error('Response error headers:', error.response.headers);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Request error data:', error.request);
        } else {
          // Something else caused the error
          console.error('Error message:', error.message);
        }
      } else {
        // Non-Axios error
        console.error('Unexpected error:', error);
      }
    }
  }

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

const createScreens = async (urls: Array, foldername: string) => {
  try {
    console.log(urls)


    const response = await axios.post("/api/images", {
      urls,
      fullPage: true,
      foldername,
    });
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
