import axios, { AxiosError } from "axios";

export const screenshotsController = async (
  urls: string[],
  foldername = "default",
) => {
  let screens = {};
  let response;

  try {
    response = await get_screens();
    if (response.status === 200) {
      console.log(response);
      screens = response.data;
      return screens;
    }
  } catch (error) {
    response = await createScreens(url, foldername);
    if (response.status === 200) {
      console.log(response);
      screens = response.data;
      return screens;
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
      url: url,
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
