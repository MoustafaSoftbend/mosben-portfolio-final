import { NextRequest, NextResponse } from "next/server"
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

const folder = 'static';
export const GET = async (request: NextRequest) => {
    try {
        const resposne = await handleGetStaticImages(folder)
        return NextResponse.json(resposne);


    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}

const handleGetStaticImages = async (folder: string = "static") => {
    const { resources } = await cloudinary.api.resources({
        type: 'upload',
        prefix: folder, // Only files in this folder will be returned

    });
    return resources
}