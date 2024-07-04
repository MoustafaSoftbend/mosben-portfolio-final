import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
interface UploadParams {
  path: string;
  folderName: string;
  folder: boolean;
}
export const handleCloudinaryUpload = async ({ path, folderName }) => {
  const result = await cloudinary.uploader.upload(path, {
    folder: folderName,
    public_id: `${Date.now()}_${Math.floor(Math.random() * 1000)}`,
  });
  return result;
};

export const handleGetCloudinaryUploads = async () => {
  const resources = await cloudinary.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(500)
    .execute();

  const groupedResources = resources.resources.reduce((acc, resource) => {
    const folderName = resource.folder;
    if (!acc[folderName]) {
      acc[folderName] = [];
    }
    acc[folderName].push(resource);
    return acc;
  }, {});

  return groupedResources;
};
