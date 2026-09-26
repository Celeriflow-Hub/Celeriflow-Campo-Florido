"use client";

import type { FormEvent } from "react";
import { useState } from "react";

/** Exemplo de upload direto para /api/blob/upload (Vercel Blob). */
export function BlobUploadForm() {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setUrl(null);
    const data = new FormData(e.currentTarget);
    const file = data.get("file") as File | null;
    if (!file) {
      setError("Escolha um arquivo.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/blob/upload?filename=${encodeURIComponent(file.name)}`,
        { method: "POST", body: file },
      );
      if (!res.ok) throw new Error(await res.text());
      const json = (await res.json()) as { url: string };
      setUrl(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no upload.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input
        type="file"
        name="file"
        className="text-sm text-zinc-300 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-900"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar para Vercel Blob"}
      </button>
      {url && (
        <a href={url} target="_blank" rel="noreferrer" className="text-sm text-sky-400 underline break-all">
          {url}
        </a>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}
