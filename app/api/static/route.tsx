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

const folderName = 'static';
export const GET = async (request: NextRequest) => {
    try {
        const response = await handleGetStaticImages(folderName)
        return NextResponse.json(response);

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json(
                { error: "An unknown error occurred" },
                { status: 500 },
            );
        }
    }
}


const handleGetStaticImages = async (folderName) => {
    const { resources } = await cloudinary.api.resources({
        type: 'upload',
        prefix: folderName, // Only files in this folder will be returned

    });
    return resources
}