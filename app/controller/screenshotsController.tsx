import axios, { AxiosError } from "axios";

export const screenshotsController = async (urls: string[]): Promise<any[]> => {
  const screens: any[] = [];

  for (const url of urls) {
    const length: number = screens.length;

    try {
      const existingScreens = await get_screens();

      // Ensure that existingScreens is properly checked
      if (existingScreens && Array.isArray(existingScreens) && existingScreens.length >= urls.length) {
        console.log(`Screens exist for ${url}:`, existingScreens);
        screens.push(existingScreens); // Assuming existingScreens is an array
      } else {
        // If no existing screens, create new ones
        const createdScreens = await createScreens(url, length); // Ensure folder name is passed
        console.log(`Screens created for ${url}:`, createdScreens);
        
        if (createdScreens) {
          screens.push(createdScreens);
        }
      }
    } catch (error) {
      console.error(`Error processing ${url}:`, error);
    }
  }
  return screens;
};

const get_screens = async () => {
  try {
    const response = await axios.get("/api/images");
    
    // If the response is not what you expect, handle it
    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data; // Assuming the data contains screens
    }
    return []; // Return an empty array if no data found
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        return null; // Screens do not exist, return null or empty array
      }
    }
    throw error; // Rethrow unexpected errors
  }
};

const createScreens = async (url: string, length: number) => {
  try {
    const response = await axios.post("/api/images", {
      url,
      fullPage: true,
      length,
    });

    // Ensure the response status is valid
    if (response.status === 200) {
      return response.data; // Assume response.data contains the created screens
    } else {
      throw new Error("Failed to create screens"); // Trigger catch block if not successful
    }
  } catch (error) {
    // More detailed error message and handling
    console.error("Error creating screens:", error);

    if (axios.isAxiosError(error)) {
      // Handle Axios specific error
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(`Error Response Data:`, axiosError.response.data);
        console.error(`Error Response Status:`, axiosError.response.status);
      }
    }
    throw error; // Still throw the error to propagate
  }
};
