import { NextApiRequest, NextApiResponse } from "next";
import { handleCloudinaryGet } from "../../lib/cloudinary";

/**
 * The handler function for the API route. Takes in an incoming request and outgoing response.
 *
 * @param {NextApiRequest} req The incoming request object
 * @param {NextApiResponse} res The outgoing response object
 */
export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (!id) {
      throw new Error("No ID provided");
    }

    const result = await handleGetRequest(id);

    return res.status(200).json({ message: "Success", result });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error", error });
  }
}

/**
 * Handles the GET request to the API route.
 *
 * @param {string} id Public ID of the image to retrieve
 */
const handleGetRequest = (id) => {
  // Get the uploaded image from Cloudinary
  return handleCloudinaryGet(id.replace(":", "/"));
};
