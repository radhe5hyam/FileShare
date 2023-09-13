import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/config/cloudinary";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";

export async function POST(req: NextRequest) {
  console.log(req.body); // File object
  const formData = await req.formData();

  const file = formData.get("file") as Blob | null;
  if (!file)
    return NextResponse.json(
      { error: "File blob is requered", status: 400 },
      { status: 400 }
    );

  const buffer = Buffer.from(await file.arrayBuffer());

  async function uploadImage(buffer: Buffer): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "dev",
        },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }

  const data = await uploadImage(buffer);
  console.log(data);
  return NextResponse.json({ success: true, data });
}
