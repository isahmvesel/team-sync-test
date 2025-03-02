import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const uploadDir = path.join(process.cwd(), "public/uploads");

async function ensureUploadDir() {
  try {
    await fs.access(uploadDir);
  } catch (error) {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

export async function POST(req) {
  try {
    await ensureUploadDir();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const ext = path.extname(file.name);
    const filePath = path.join(uploadDir, `${userId}${ext}`);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    return NextResponse.json(
      { message: "Upload successful", file: `/uploads/${userId}${ext}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
