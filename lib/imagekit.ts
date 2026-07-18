"use server";

import { ImageKit, toFile } from "@imagekit/nodejs";

// New SDK only requires privateKey in the constructor
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

export async function uploadToImageKit(
  file: File,
  folder: string = "/portfolio"
): Promise<{ url: string; fileId: string }> {
  const fileForUpload = await toFile(await file.arrayBuffer(), file.name, { type: file.type });

  const result = await imagekit.files.upload({
    file: fileForUpload,
    fileName: file.name,
    folder,
    useUniqueFileName: true,
  });

  return {
    url: result.url ?? "",
    fileId: result.fileId ?? "",
  };
}

export async function deleteFromImageKitByUrl(url: string) {
  try {
    if (!url || !url.includes("ik.imagekit.io")) return;
    const filename = url.split("/").pop();
    if (!filename) return;

    const files = await imagekit.assets.list({
      searchQuery: `name="${filename}"`,
    });

    if (files && files.length > 0) {
      const file = files[0] as any;
      if (file.fileId) {
        await imagekit.files.delete(file.fileId);
      }
    }
  } catch (error) {
    console.error("Failed to delete from ImageKit", error);
  }
}
