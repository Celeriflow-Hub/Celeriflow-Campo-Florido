import { NextResponse, type NextRequest } from "next/server";
import { verifyIdToken } from "@/lib/firebase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Exemplo: valida o Firebase ID Token e retorna o UID.
 * Client: Authorization: Bearer <idToken> (getIdToken(auth.currentUser)).
 */
export async function GET(req: NextRequest) {
  const header = req.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return NextResponse.json(
      { error: "Envie Authorization: Bearer <idToken>." },
      { status: 401 },
    );
  }
  try {
    const decoded = await verifyIdToken(token);
    return NextResponse.json({ uid: decoded.uid, email: decoded.email ?? null });
  } catch {
    return NextResponse.json({ error: "Token inválido." }, { status: 401 });
  }
}
