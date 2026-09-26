import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, string> = {
    app: "ok",
    neon: process.env.DATABASE_URL ? "configured" : "missing",
    blob: process.env.BLOB_READ_WRITE_TOKEN ? "configured" : "missing",
    firebaseClient: process.env.NEXT_PUBLIC_FIREBASE_API_KEY
      ? "configured"
      : "missing",
    firebaseAdmin:
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 ||
      process.env.FIREBASE_PRIVATE_KEY
        ? "configured"
        : "missing",
  };

  // Ping opcional no Neon (só se DATABASE_URL existir)
  if (checks.neon === "configured") {
    try {
      const db = getDb();
      await db
        ?.execute("select 1" as unknown as Parameters<NonNullable<typeof db>["execute"]>[0])
        .catch(() => null);
      checks.neonPing = "ok";
    } catch {
      checks.neonPing = "error";
    }
  }

  return NextResponse.json({ status: "ok", checks, time: new Date().toISOString() });
}
