# Celeriflow — Campo Florido

Base **Next.js 15 + React 19 + TypeScript + Tailwind v4**, pronta para **Vercel**,
com **Neon Postgres (Drizzle)**, **Vercel Blob** e **Firebase (client + Admin)**.

## Stack

| Camada | Tecnologia | Onde está |
|---|---|---|
| App | Next.js App Router + React + TS strict (`@/*` → `src/*`) | `src/app/` |
| Estilo | Tailwind CSS v4 | `src/app/globals.css` |
| Deploy | Vercel (`gru1`, functions 30s) | `vercel.json`, `next.config.ts` |
| Banco | Neon Postgres + Drizzle ORM | `src/lib/db/`, `drizzle.config.ts` |
| Arquivos | Vercel Blob | `src/lib/blob/server.ts`, `src/app/api/blob/upload/route.ts` |
| Auth/Data client | Firebase Auth/Firestore/Storage | `src/lib/firebase/client.ts` |
| Auth/Data server | Firebase Admin (ID token + FCM) | `src/lib/firebase/admin.ts` |
| Env | Zod (`src/lib/env.ts`) + `.env.example` | `.env.example` |

## Começo rápido

```powershell
# 1. Instalar
npm install

# 2. Configurar envs
Copy-Item .env.example .env.local
# edite .env.local com suas chaves (Neon, Blob, Firebase)

# 3. Rodar
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # build de produção
```

Teste as integrações em **`/api/health`** — retorna `configured/missing` para
Neon, Blob, Firebase client e Admin (+ ping no Neon se `DATABASE_URL` existir).

## Neon + Drizzle

```powershell
npm run db:generate  # gera SQL em ./drizzle a partir de src/lib/db/schema.ts
npm run db:migrate   # aplica no Neon (usa DATABASE_URL_UNPOOLED)
npm run db:studio    # abre o Drizzle Studio
```

A tabela `health_checks` em `src/lib/db/schema.ts` é só exemplo —
**apague/substitua quando colar sua base pronta.**

## Vercel Blob

- Upload: `POST /api/blob/upload?filename=nome.png` (body binário) → `{ url }`.
- Componente de teste: `src/components/blob-upload-form.tsx` (renderizado na home).
- Exige `BLOB_READ_WRITE_TOKEN` (Storage tab no dashboard da Vercel).

## Firebase

- **Client** (`src/lib/firebase/client.ts`): `getFirebaseAuth()`, `getFirebaseDb()`,
  `getFirebaseStorage()` — retornam `null` se as `NEXT_PUBLIC_*` não estiverem setadas.
- **Admin** (`src/lib/firebase/admin.ts`): `verifyIdToken()`, Firestore e Messaging
  no server. Credencial via `FIREBASE_SERVICE_ACCOUNT_BASE64` (recomendado na Vercel)
  ou `FIREBASE_PROJECT_ID` + `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY`.
- **Exemplo**: `GET /api/auth/session` com `Authorization: Bearer <idToken>`.

## Colar sua base pronta

1. Copie seus arquivos para dentro de `src/` (mantendo `src/lib/*` ou mesclando).
2. Some as dependências que faltarem no `package.json` e rode `npm install`.
3. Confira conflitos em `src/app/layout.tsx`, `src/app/page.tsx` e `next.config.ts`.
4. Rode `npm run typecheck` e `npm run build` antes do deploy.

## Deploy na Vercel

```powershell
vercel --prod
```

Configure as mesmas envs do `.env.local` em **Project Settings → Environment Variables**
(`DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `NEXT_PUBLIC_FIREBASE_*`, credenciais Admin).
