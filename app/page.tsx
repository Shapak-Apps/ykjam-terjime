"use client";

import { TextTranslator } from "@/components/TextTranslator";
import { useUi } from "./providers";

export default function TextPage() {
  const { t } = useUi();

  return (
    <>
      <TextTranslator />

      <section className="mt-13 grid items-center gap-9 md:grid-cols-[1fr_auto]">
        <div>
          <h1 className="max-w-[16ch] font-display text-[clamp(28px,3.6vw,42px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-ink">
            {t.heroTitle}
          </h1>
          <p className="mt-[18px] max-w-[52ch] text-[16px] text-muted">{t.heroBody}</p>
        </div>

        <svg
          viewBox="0 0 300 210"
          role="img"
          aria-label="Salam — Hello"
          className="block h-auto w-[min(340px,72vw)]"
        >
          <rect x="6" y="16" width="176" height="72" rx="22" fill="var(--brand-soft)" />
          <path d="M44 88l-6 22 30-22z" fill="var(--brand-soft)" />
          <text x="34" y="60" fontFamily="Manrope, sans-serif" fontSize="30" fontWeight="800" fill="var(--brand-deep)">
            Salam!
          </text>
          <rect x="112" y="112" width="182" height="72" rx="22" fill="var(--sand-soft)" />
          <path d="M254 184l8 22-32-22z" fill="var(--sand-soft)" />
          <text x="140" y="156" fontFamily="Manrope, sans-serif" fontSize="30" fontWeight="800" fill="var(--sand)">
            Hello!
          </text>
        </svg>
      </section>
    </>
  );
}
