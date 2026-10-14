"use client";

import { useEffect, useRef, useState } from "react";
import { useUi } from "@/app/providers";
import { LANG_NAMES } from "@/lib/i18n";
import {
  LANGS,
  TEXT_LIMIT,
  TTS_CODE,
  translateText,
  type Lang,
  type TranslateResult,
} from "@/lib/engine";

const TK_LETTERS = ["ä", "ç", "ž", "ň", "ö", "ş", "ü", "ý"];

const iconButton =
  "grid size-[34px] cursor-pointer place-items-center rounded-[9px] text-muted hover:bg-brand-softer hover:text-brand-deep disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-muted";

function SpeakerIcon() {
  return (
    <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5L6.5 9H3v6h3.5L11 19z" />
      <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18 7a7 7 0 0 1 0 10" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg className="size-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 8h14l-3.5-3.5M20 16H6l3.5 3.5" />
    </svg>
  );
}

export function TextTranslator() {
  const { ui, t } = useUi();
  const [src, setSrc] = useState<Lang>("tk");
  const [tgt, setTgt] = useState<Lang>("ru");
  const [text, setText] = useState("");
  const [result, setResult] = useState<TranslateResult>({ status: "empty" });
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let cancelled = false;
    translateText(text, src, tgt).then((next) => {
      if (!cancelled) setResult(next);
    });
    return () => {
      cancelled = true;
    };
  }, [text, src, tgt]);

  /**
   * Буква из нижнего ряда встаёт на место курсора. Если в поле ещё не ставили
   * курсор, selectionStart равен нулю — тогда буква уехала бы в начало строки,
   * поэтому в таком случае дописываем в конец.
   */
  const insertLetter = (letter: string) => {
    const field = inputRef.current;
    if (!field) return;
    const focused = document.activeElement === field;
    const start = focused ? (field.selectionStart ?? text.length) : text.length;
    const end = focused ? (field.selectionEnd ?? text.length) : text.length;
    const next = text.slice(0, start) + letter + text.slice(end);
    setText(next);
    requestAnimationFrame(() => {
      field.focus();
      field.setSelectionRange(start + letter.length, start + letter.length);
    });
  };

  const speak = (value: string, lang: Lang) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !value.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(value);
    utterance.lang = TTS_CODE[lang];
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
  };

  const swap = () => {
    const nextSrc = tgt;
    const nextTgt = src;
    setSrc(nextSrc);
    setTgt(nextTgt);
    if (result.status === "ok") setText(result.text);
  };

  const copy = async () => {
    if (result.status !== "ok") return;
    try {
      await navigator.clipboard.writeText(result.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // буфер недоступен — кнопка просто не даст подтверждения
    }
  };

  const message =
    result.status === "not-connected"
      ? t.stateNotReady
      : result.status === "too-long"
        ? t.stateTooLong
        : result.status === "offline"
          ? t.stateOffline
          : result.status === "error"
            ? t.stateError
            : null;

  return (
    <section className="overflow-hidden rounded-card bg-card shadow-card">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-line">
        <LangSelect value={src} onChange={setSrc} disabledValue={tgt} label={t.srcRole} ui={ui} />
        <button
          type="button"
          onClick={swap}
          title={t.swap}
          aria-label={t.swap}
          className="grid size-10 cursor-pointer place-items-center rounded-full text-muted hover:bg-brand-softer hover:text-brand-deep"
        >
          <SwapIcon />
        </button>
        <LangSelect value={tgt} onChange={setTgt} disabledValue={src} label={t.tgtRole} ui={ui} />
      </div>

      <div className="grid md:grid-cols-2">
        {/* ввод */}
        <div className="flex min-w-0 flex-col">
          <div className="flex min-h-[170px] flex-1 flex-col px-[22px] pt-5 pb-3">
            <label className="sr-only" htmlFor="source-text">
              {t.srcRole}
            </label>
            <textarea
              id="source-text"
              ref={inputRef}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={t.placeholder}
              spellCheck={false}
              rows={3}
              className="min-h-[96px] w-full flex-1 resize-none border-0 bg-transparent p-0 text-[21px] leading-[1.42] text-ink outline-none placeholder:text-faint"
            />
          </div>

          {src === "tk" && (
            <div className="flex flex-wrap items-center gap-[6px] px-[22px] pb-3">
              <span className="mr-[3px] text-[12px] font-medium text-sand">{t.lettersCap}</span>
              {TK_LETTERS.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => insertLetter(letter)}
                  aria-label={letter}
                  className="size-[30px] cursor-pointer rounded-lg bg-sand-soft text-[15px] font-medium text-ink hover:bg-sand hover:text-white"
                >
                  {letter}
                </button>
              ))}
            </div>
          )}

          <div className="flex min-h-[52px] items-center gap-2 py-3 pr-4 pl-[22px]">
            <button
              type="button"
              onClick={() => speak(text, src)}
              disabled={!text.trim()}
              title={t.listen}
              aria-label={t.listen}
              className={iconButton}
            >
              <SpeakerIcon />
            </button>
            <button
              type="button"
              onClick={() => {
                setText("");
                inputRef.current?.focus();
              }}
              disabled={!text}
              title={t.clear}
              aria-label={t.clear}
              className={iconButton}
            >
              <CrossIcon />
            </button>
            <span
              className={`ml-auto text-[12.5px] tabular-nums ${
                text.length > TEXT_LIMIT ? "text-sand" : "text-faint"
              }`}
            >
              {text.length} / {TEXT_LIMIT}
            </span>
          </div>
        </div>

        {/* результат */}
        <div className="flex min-w-0 flex-col border-t border-line bg-card-2 md:border-t-0 md:border-l">
          <div className="flex min-h-[170px] flex-1 flex-col px-[22px] pt-5 pb-3">
            <output className="flex-1" aria-live="polite">
              {result.status === "ok" ? (
                <span className="block min-h-[96px] text-[21px] leading-[1.42] break-words whitespace-pre-wrap text-ink">
                  {result.text}
                </span>
              ) : message ? (
                <span className="block min-h-[96px] text-[15px] leading-[1.5] text-muted">
                  {message}
                </span>
              ) : (
                <span className="block min-h-[96px] text-[21px] leading-[1.42] text-faint">
                  {t.outEmpty}
                </span>
              )}
            </output>
            {result.status === "ok" && result.translit && (
              <p className="mt-3 text-[14px] text-muted">{result.translit}</p>
            )}
          </div>

          <div className="flex min-h-[52px] items-center gap-2 py-3 pr-4 pl-[22px]">
            <button
              type="button"
              onClick={() => result.status === "ok" && speak(result.text, tgt)}
              disabled={result.status !== "ok"}
              title={t.listen}
              aria-label={t.listen}
              className={iconButton}
            >
              <SpeakerIcon />
            </button>
            <button
              type="button"
              onClick={copy}
              disabled={result.status !== "ok"}
              title={t.copy}
              aria-label={t.copy}
              className={iconButton}
            >
              <CopyIcon />
            </button>
            {copied && <span className="text-[12.5px] text-brand-deep">{t.copied}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}

function LangSelect({
  value,
  onChange,
  disabledValue,
  label,
  ui,
}: {
  value: Lang;
  onChange: (lang: Lang) => void;
  disabledValue: Lang;
  label: string;
  ui: "tk" | "ru" | "en";
}) {
  return (
    <>
      <label className="sr-only" htmlFor={`lang-${label}`}>
        {label}
      </label>
      <select
        id={`lang-${label}`}
        value={value}
        onChange={(event) => onChange(event.target.value as Lang)}
        className="w-full cursor-pointer appearance-none border-0 bg-transparent px-3 py-[17px] text-center text-[13px] font-semibold tracking-[0.07em] text-ink uppercase hover:text-brand-deep"
      >
        {LANGS.map((lang) => (
          <option key={lang} value={lang} disabled={lang === disabledValue}>
            {LANG_NAMES[lang][ui]}
          </option>
        ))}
      </select>
    </>
  );
}
