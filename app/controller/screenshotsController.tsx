import axios, { AxiosError } from "axios";

export const screenshotsController = async (
  url: string,
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

const get_screens = async () => {
  try {
    const response = await axios.get("api/images");
    return response.data; // Assuming response.data contains the screens or an indication of existence
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        return false; // Screens do not exist
      }
    }
    throw error;
  }
};

const createScreens = async (url: string, foldername: string) => {
  try {
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
    console.error(error);
    throw error;
  }
};
