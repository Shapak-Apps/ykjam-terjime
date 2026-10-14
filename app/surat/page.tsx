"use client";

import { useEffect, useRef, useState } from "react";
import { useUi } from "../providers";
import { LANG_NAMES } from "@/lib/i18n";
import { LANGS, readImage, type Lang, type TranslateResult } from "@/lib/engine";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export default function PhotoPage() {
  const { ui, t } = useUi();
  const [src, setSrc] = useState<Lang>("zh");
  const [tgt, setTgt] = useState<Lang>("tk");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<TranslateResult | null>(null);

  const fileRef = useRef<File | null>(null);
  const pickRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const accept = (file: File | undefined) => {
    if (!file) return;
    setResult(null);
    if (!ALLOWED.includes(file.type)) {
      setError(t.photoWrongType);
      return;
    }
    if (file.size > MAX_BYTES) {
      setError(t.photoTooBig);
      return;
    }
    setError(null);
    fileRef.current = file;
    setPreview((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return URL.createObjectURL(file);
    });
  };

  const send = async () => {
    if (!fileRef.current) return;
    setSending(true);
    const answer = await readImage(fileRef.current, src);
    setResult(answer);
    setSending(false);
  };

  const reset = () => {
    fileRef.current = null;
    setResult(null);
    setError(null);
    setPreview((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return null;
    });
  };

  const message =
    result?.status === "not-connected"
      ? t.stateNotReady
      : result?.status === "offline"
        ? t.stateOffline
        : result?.status === "error"
          ? t.stateError
          : null;

  return (
    <section>
      <h1 className="mb-[6px] font-display text-[27px] font-extrabold tracking-[-0.028em] text-ink">
        {t.photoTitle}
      </h1>
      <p className="mb-6 max-w-[60ch] text-[15.5px] text-muted">{t.photoLead}</p>

      <div className="rounded-card bg-card p-[22px] shadow-card">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <PairSelect value={src} onChange={setSrc} other={tgt} label={t.srcRole} ui={ui} />
          <span className="text-muted">→</span>
          <PairSelect value={tgt} onChange={setTgt} other={src} label={t.tgtRole} ui={ui} />
        </div>

        {preview ? (
          <div className="flex flex-col items-center gap-4 rounded-box bg-card-2 p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="max-h-[360px] rounded-box object-contain" />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={send}
                disabled={sending}
                className="cursor-pointer rounded-pill bg-brand px-5 py-[10px] text-[15px] font-semibold text-on-brand disabled:opacity-50"
              >
                {t.photoSend}
              </button>
              <button
                type="button"
                onClick={reset}
                className="cursor-pointer rounded-pill px-5 py-[10px] text-[15px] font-semibold text-muted hover:text-ink"
              >
                {t.photoReplace}
              </button>
            </div>
          </div>
        ) : (
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              accept(event.dataTransfer.files[0]);
            }}
            className={`flex flex-col items-center gap-4 rounded-box border-2 border-dashed px-5 py-12 text-center ${
              dragging ? "border-brand bg-brand-softer" : "border-line bg-card-2"
            }`}
          >
            <svg className="size-10 text-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <circle cx="8.5" cy="10" r="1.6" />
              <path d="M4 17l4.5-4.5a2 2 0 0 1 2.8 0L16 17M15 14l1.6-1.6a2 2 0 0 1 2.8 0L21 14" />
            </svg>
            <span className="text-[15px] text-muted">{t.photoDrop}</span>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => pickRef.current?.click()}
                className="cursor-pointer rounded-pill bg-brand px-5 py-[10px] text-[15px] font-semibold text-on-brand"
              >
                {t.photoChoose}
              </button>
              <button
                type="button"
                onClick={() => cameraRef.current?.click()}
                className="cursor-pointer rounded-pill bg-card px-5 py-[10px] text-[15px] font-semibold text-ink shadow-card"
              >
                {t.photoCamera}
              </button>
            </div>
            <input
              ref={pickRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(event) => accept(event.target.files?.[0])}
            />
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(event) => accept(event.target.files?.[0])}
            />
          </div>
        )}

        {error && <p className="mt-4 text-[14.5px] text-sand">{error}</p>}
        {message && (
          <p className="mt-4 text-[14.5px] text-muted" aria-live="polite">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}

function PairSelect({
  value,
  onChange,
  other,
  label,
  ui,
}: {
  value: Lang;
  onChange: (lang: Lang) => void;
  other: Lang;
  label: string;
  ui: "tk" | "ru" | "en";
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as Lang)}
        className="cursor-pointer rounded-pill bg-card-2 px-3 py-2 text-[14.5px] font-medium text-ink"
      >
        {LANGS.map((lang) => (
          <option key={lang} value={lang} disabled={lang === other}>
            {LANG_NAMES[lang][ui]}
          </option>
        ))}
      </select>
    </label>
  );
}
