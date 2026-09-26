import { del, put } from "@vercel/blob";

type PutBody = Parameters<typeof put>[1];

/**
 * Upload server-side para o Vercel Blob.
 * Exige BLOB_READ_WRITE_TOKEN no server.
 */
export async function uploadToBlob(
  pathname: string,
  body: PutBody,
  opts?: { contentType?: string; addRandomSuffix?: boolean },
) {
  const blob = await put(pathname, body, {
    access: "public",
    contentType: opts?.contentType,
    addRandomSuffix: opts?.addRandomSuffix ?? true,
  });
  return blob; // { url, downloadUrl, pathname, ... }
}

export async function deleteFromBlob(url: string) {
  await del(url);
}
