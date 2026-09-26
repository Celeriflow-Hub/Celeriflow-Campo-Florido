import {
  applicationDefault,
  cert,
  getApp,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getMessaging, type Messaging } from "firebase-admin/messaging";

let app: App | null = null;

function buildCredential() {
  // Opção A: service account em base64 (recomendado na Vercel)
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (b64) {
    const json = JSON.parse(
      Buffer.from(b64, "base64").toString("utf-8"),
    ) as Parameters<typeof cert>[0];
    return cert(json);
  }
  // Opção B: 3 vars separadas
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
    process.env;
  if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
    return cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      // Vercel: salve com \n escapados; aqui convertemos de volta.
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
  }
  // Opção C: GOOGLE_APPLICATION_CREDENTIALS (local / GCP)
  return applicationDefault();
}

export function getAdminApp(): App | null {
  try {
    if (app) return app;
    if (getApps().length) {
      app = getApp();
      return app;
    }
    app = initializeApp({ credential: buildCredential() });
    return app;
  } catch {
    return null; // sem credenciais — rotas devem responder 503 amigável
  }
}

export function getAdminAuth(): Auth | null {
  const fb = getAdminApp();
  return fb ? getAuth(fb) : null;
}

export function getAdminDb(): Firestore | null {
  const fb = getAdminApp();
  return fb ? getFirestore(fb) : null;
}

export function getAdminMessaging(): Messaging | null {
  const fb = getAdminApp();
  return fb ? getMessaging(fb) : null;
}

/** Valida um Firebase ID Token (enviado pelo client) no server. */
export async function verifyIdToken(idToken: string) {
  const auth = getAdminAuth();
  if (!auth) throw new Error("Firebase Admin não configurado.");
  return auth.verifyIdToken(idToken);
}
