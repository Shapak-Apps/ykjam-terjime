"use client";

import { useEffect, useRef, useState } from "react";
import { useUi } from "@/app/providers";
import { LANG_NAMES } from "@/lib/i18n";
import { SHOWCASE } from "@/lib/engine";

const TYPE_MS = 48;
const HOLD_MS = 2400;

/**
 * Живой показ на главной: фраза набирается сама, рядом появляется перевод,
 * пары языков сменяются по кругу. Фразы настоящие — те же, что в приложении.
 *
 * Если человек просил систему убрать движение, показываем первую пару целиком
 * и ничего не анимируем.
 */
export function HeroDemo() {
  const { ui } = useUi();
  const [step, setStep] = useState(0);
  // Первая пара показана целиком с самого начала: иначе страница при загрузке
  // встречает пустой рамкой, и такой же она попадает в превью ссылки.
  const [typed, setTyped] = useState(SHOWCASE[0].source);
  const [revealed, setRevealed] = useState(true);
  const [still, setStill] = useState(false);
  const stillRef = useRef(false);
  const firstPass = useRef(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stillRef.current = reduced;
    if (reduced) setStill(true);
  }, []);

  useEffect(() => {
    if (stillRef.current) return;

    const item = SHOWCASE[step];

    // первую пару не набираем — она уже на экране, просто держим и идём дальше
    if (firstPass.current) {
      firstPass.current = false;
      const hold = window.setTimeout(
        () => setStep((current) => (current + 1) % SHOWCASE.length),
        HOLD_MS,
      );
      return () => window.clearTimeout(hold);
    }

    setTyped("");
    setRevealed(false);

    let typedCount = 0;
    let revealTimer = 0;

    const typer = window.setInterval(() => {
      typedCount += 1;
      setTyped(item.source.slice(0, typedCount));
      if (typedCount >= item.source.length) {
        window.clearInterval(typer);
        revealTimer = window.setTimeout(() => setRevealed(true), 280);
      }
    }, TYPE_MS);

    const nextTimer = window.setTimeout(
      () => setStep((current) => (current + 1) % SHOWCASE.length),
      item.source.length * TYPE_MS + HOLD_MS,
    );

    return () => {
      window.clearInterval(typer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(nextTimer);
    };
  }, [step]);

  const item = SHOWCASE[step];

  return (
    <div className="mt-8 overflow-hidden rounded-card bg-card shadow-card" aria-hidden="true">
      <div className="flex items-center gap-3 border-b border-line px-[22px] py-3 text-[12px] font-semibold tracking-[0.07em] text-muted uppercase">
        <span>{LANG_NAMES[item.from][ui]}</span>
        <span className="text-faint">→</span>
        <span>{LANG_NAMES[item.to][ui]}</span>
        <span className="ml-auto flex gap-[5px]">
          {SHOWCASE.map((_, index) => (
            <span
              key={index}
              className={`block size-[6px] rounded-full ${
                index === step ? "bg-brand" : "bg-line"
              }`}
            />
          ))}
        </span>
      </div>

      <div className="grid md:grid-cols-2">
        <p className="min-h-[92px] px-[22px] py-5 text-[20px] leading-[1.4] text-ink">
          {typed}
          {!still && (
            <span className="ml-[2px] inline-block w-[2px] translate-y-[3px] self-center bg-brand align-middle motion-safe:animate-pulse" style={{ height: "1.1em" }} />
          )}
        </p>
        <p
          className={`min-h-[92px] border-t border-line bg-card-2 px-[22px] py-5 text-[20px] leading-[1.4] text-ink transition-opacity duration-500 md:border-t-0 md:border-l ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          {item.target}
          {item.translit && (
            <span className="mt-2 block text-[13.5px] text-muted">{item.translit}</span>
          )}
        </p>
      </div>
    </div>
  );
}
