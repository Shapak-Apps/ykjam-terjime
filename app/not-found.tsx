"use client";

import Link from "next/link";
import { useUi } from "./providers";

export default function NotFound() {
  const { t } = useUi();

  return (
    <section className="rounded-card bg-card px-[26px] py-12 text-center shadow-card">
      <p className="font-display text-[64px] leading-none font-extrabold tracking-[-0.04em] text-brand-soft">
        404
      </p>
      <h1 className="mt-4 font-display text-[24px] font-extrabold tracking-[-0.028em] text-ink">
        {t.notFoundTitle}
      </h1>
      <p className="mx-auto mt-3 max-w-[46ch] text-[15.5px] text-muted">{t.notFoundBody}</p>
      <Link
        href="/"
        className="mt-7 inline-block rounded-pill bg-brand px-5 py-[10px] text-[15px] font-semibold text-on-brand no-underline"
      >
        {t.notFoundHome}
      </Link>
    </section>
  );
}
