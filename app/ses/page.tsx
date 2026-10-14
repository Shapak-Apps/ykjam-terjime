"use client";

import { useEffect, useRef, useState } from "react";
import { useUi } from "../providers";
import { LANG_NAMES } from "@/lib/i18n";
import { LANGS, transcribeAudio, type Lang, type TranslateResult } from "@/lib/engine";

type Phase = "idle" | "recording" | "ready" | "sending" | "done";

function formatTime(seconds: number): string {
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  return `${mm}:${ss.toString().padStart(2, "0")}`;
}

export default function VoicePage() {
  const { ui, t } = useUi();
  const [src, setSrc] = useState<Lang>("tk");
  const [tgt, setTgt] = useState<Lang>("ru");
  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TranslateResult | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const blobRef = useRef<Blob | null>(null);
  const tickRef = useRef<number | null>(null);

  // таймер записи
  useEffect(() => {
    if (phase !== "recording") return;
    tickRef.current = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [phase]);

  // освобождаем ссылку на запись, чтобы не копить память
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      recorderRef.current?.stream.getTracks().forEach((track) => track.stop());
    };
  }, [audioUrl]);

  const start = async () => {
    setError(null);
    setResult(null);
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError(t.voiceNoMic);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        blobRef.current = blob;
        setAudioUrl((previous) => {
          if (previous) URL.revokeObjectURL(previous);
          return URL.createObjectURL(blob);
        });
        stream.getTracks().forEach((track) => track.stop());
        setPhase("ready");
      };
      recorderRef.current = recorder;
      setSeconds(0);
      recorder.start();
      setPhase("recording");
    } catch {
      setError(t.voiceDenied);
      setPhase("idle");
    }
  };

  const stop = () => recorderRef.current?.stop();

  const cancel = () => {
    recorderRef.current?.stop();
    blobRef.current = null;
    setAudioUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return null;
    });
    setResult(null);
    setPhase("idle");
  };

  const send = async () => {
    if (!blobRef.current) return;
    setPhase("sending");
    const answer = await transcribeAudio(blobRef.current, src);
    setResult(answer);
    setPhase("done");
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
        {t.voiceTitle}
      </h1>
      <p className="mb-6 max-w-[60ch] text-[15.5px] text-muted">{t.voiceLead}</p>

      <div className="rounded-card bg-card p-[22px] shadow-card">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <PairSelect value={src} onChange={setSrc} other={tgt} label={t.srcRole} ui={ui} />
          <span className="text-muted">→</span>
          <PairSelect value={tgt} onChange={setTgt} other={src} label={t.tgtRole} ui={ui} />
        </div>

        <div className="flex flex-col items-center gap-4 rounded-box bg-card-2 px-5 py-9">
          {phase === "recording" ? (
            <>
              <span className="text-[15px] text-muted">{t.voiceListening}</span>
              <span className="font-display text-[34px] font-extrabold tabular-nums text-ink">
                {formatTime(seconds)}
              </span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={stop}
                  className="cursor-pointer rounded-pill bg-brand px-5 py-[10px] text-[15px] font-semibold text-on-brand"
                >
                  {t.voiceStop}
                </button>
                <button
                  type="button"
                  onClick={cancel}
                  className="cursor-pointer rounded-pill px-5 py-[10px] text-[15px] font-semibold text-muted hover:text-ink"
                >
                  {t.voiceCancel}
                </button>
              </div>
            </>
          ) : phase === "ready" || phase === "sending" || phase === "done" ? (
            <>
              <span className="text-[15px] text-muted">{t.voiceReady}</span>
              {audioUrl && <audio controls src={audioUrl} className="w-full max-w-[420px]" />}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={send}
                  disabled={phase === "sending"}
                  className="cursor-pointer rounded-pill bg-brand px-5 py-[10px] text-[15px] font-semibold text-on-brand disabled:opacity-50"
                >
                  {t.voiceSend}
                </button>
                <button
                  type="button"
                  onClick={cancel}
                  className="cursor-pointer rounded-pill px-5 py-[10px] text-[15px] font-semibold text-muted hover:text-ink"
                >
                  {t.voiceCancel}
                </button>
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={start}
              className="flex cursor-pointer flex-col items-center gap-3"
            >
              <span className="grid size-20 place-items-center rounded-full bg-brand text-on-brand">
                <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="2.5" width="6" height="11" rx="3" />
                  <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3.5" />
                </svg>
              </span>
              <span className="text-[15px] font-semibold text-ink">{t.voiceStart}</span>
            </button>
          )}
        </div>

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
