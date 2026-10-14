"use client";

import { useUi } from "../providers";
import { LINKS } from "@/lib/paths";

const store =
  "flex items-center justify-between gap-[14px] rounded-box bg-card px-[18px] py-[14px] no-underline shadow-card hover:bg-brand-soft";

export default function AppPage() {
  const { t } = useUi();

  return (
    <section>
      <h1 className="mb-[6px] font-display text-[27px] font-extrabold tracking-[-0.028em] text-ink">
        {t.appTitle}
      </h1>
      <p className="mb-6 max-w-[60ch] text-[15.5px] text-muted">{t.appLead}</p>

      <div className="grid items-start gap-4 md:grid-cols-[1fr_300px]">
        <div className="rounded-card bg-card px-[26px] py-6 shadow-card">
          <p className="mb-[14px] max-w-[56ch] text-[16.5px] text-ink">{t.appP1}</p>
          <p className="mb-[14px] max-w-[56ch] text-[15.5px] text-muted">{t.appP2}</p>
          <p className="max-w-[56ch] text-[15.5px] text-muted">{t.appP3}</p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <a className={store} href={LINKS.appStore}>
            <span className="text-[15px] font-semibold text-ink">App Store</span>
            <span className="text-[12px] font-semibold tracking-[0.06em] text-muted uppercase">iOS</span>
          </a>
          <a className={store} href={LINKS.googlePlay}>
            <span className="text-[15px] font-semibold text-ink">Google Play</span>
            <span className="text-[12px] font-semibold tracking-[0.06em] text-muted uppercase">Android</span>
          </a>
          <a className={store} href={LINKS.appRepo}>
            <span className="text-[15px] font-semibold text-ink">GitHub</span>
            <span className="text-[12px] font-semibold tracking-[0.06em] text-muted uppercase">MIT</span>
          </a>
        </div>
      </div>
    </section>
  );
}
