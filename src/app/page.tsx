import { BlobUploadForm } from "@/components/blob-upload-form";

const cards = [
  { title: "Next.js + React + TS", desc: "App Router, Server Components, rotas tipadas e typecheck no build." },
  { title: "Vercel", desc: "Deploy zero-config. Região gru1 + maxDuration 30s nas functions (vercel.json)." },
  { title: "Neon + Drizzle", desc: "Postgres serverless. Veja src/lib/db — ping em /api/health." },
  { title: "Vercel Blob", desc: "Upload público via /api/blob/upload. Teste o formulário abaixo." },
  { title: "Firebase client", desc: "Auth / Firestore / Storage prontos em src/lib/firebase/client." },
  { title: "Firebase Admin", desc: "verifyIdToken + Messaging no server. Veja src/lib/firebase/admin." },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
        Base pronta para colar seu código
      </p>
      <h1 className="mt-3 text-4xl font-bold leading-tight">
        Celeriflow — Campo Florido
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Next.js 15 + React 19 + TypeScript + Tailwind, com Vercel, Neon
        (Drizzle), Vercel Blob e Firebase (client + admin) já ligados.
        Copie sua base pronta para dentro de <code className="text-zinc-200">src/</code> e
        ajuste o <code className="text-zinc-200">.env</code>.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="font-semibold">{c.title}</h2>
            <p className="mt-1 text-sm text-zinc-400">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
          <h2 className="font-semibold">Teste rápido — Blob</h2>
          <p className="mb-4 text-sm text-zinc-400">
            Exige <code>BLOB_READ_WRITE_TOKEN</code>. Sem ele, a API retorna 503.
          </p>
          <BlobUploadForm />
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
          <h2 className="font-semibold">Teste rápido — APIs</h2>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a className="text-sky-400 underline" href="/api/health">/api/health</a><span className="text-zinc-500"> — status de todas as integrações</span></li>
          </ul>
          <h3 className="mt-4 font-semibold text-sm">Próximos passos</h3>
          <ol className="mt-1 list-decimal pl-5 text-sm text-zinc-400 space-y-1">
            <li>Copie <code>.env.example</code> para <code>.env.local</code> e preencha.</li>
            <li><code>npm run db:generate</code> + <code>npm run db:migrate</code> (Neon).</li>
            <li>Cole sua base pronta em <code>src/</code> e rode <code>npm run dev</code>.</li>
            <li>Deploy: <code>vercel --prod</code> com as envs no dashboard.</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
