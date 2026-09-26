import { put } from "@vercel/blob";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST /api/blob/upload?filename=foto.png — body = arquivo binário */
export async function POST(req: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN não configurado." },
      { status: 503 },
    );
  }
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename") || "upload.bin";
  const contentType =
    req.headers.get("content-type") || "application/octet-stream";

  const blob = await put(filename, req.body as ReadableStream, {
    access: "public",
    contentType,
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url, pathname: blob.pathname });
}
