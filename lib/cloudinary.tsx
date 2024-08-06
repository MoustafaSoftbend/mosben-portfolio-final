import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

interface UploadParams {
  path: string;
  folderName: string;
  folder: boolean;
}

export const handleCloudinaryUpload = async ({
  path,
  folderName = "/portfolio-screenshots",
}: UploadParams) => {
  const result = await cloudinary.uploader.upload(path, {
    folder: folderName,
    public_id: `${Date.now()}_${Math.floor(Math.random() * 1000)}`,
  });
  return result;
};

// Define a type for the resource object
type Resource = {
  folder: string;
  [key: string]: any; // Add other properties if needed
};

// Define a type for the accumulator object
type Accumulator = {
  [key: string]: Resource[];
};

export const handleGetCloudinaryUploads = async () => {
  const resources = await cloudinary.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(500)
    .execute();

  // Use a type assertion to tell TypeScript about the type of resources.resources
  const resourceArray = resources.resources as Resource[];

  const groupedResources = resourceArray.reduce<Accumulator>(
    (acc, resource) => {
      const folderName = resource.folder;
      if (!acc[folderName]) {
        acc[folderName] = [];
      }
      acc[folderName].push(resource);
      return acc;
    },
    {},
  );

  return groupedResources;
};
