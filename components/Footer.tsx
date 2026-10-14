"use client";

import { useUi } from "@/app/providers";
import { asset, LINKS } from "@/lib/paths";

const cell = "text-[13.5px] text-muted no-underline hover:text-brand-deep";

export function Footer() {
  const { t } = useUi();

  return (
    <footer className="mt-14 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-[26px] md:grid-cols-4">
      <div className="flex flex-col gap-[9px]">
        <a className={cell} href={LINKS.siteRepo}>
          {t.footSite}
        </a>
        <a className={cell} href={LINKS.appRepo}>
          {t.footApp}
        </a>
      </div>
      <div className="flex flex-col gap-[9px]">
        <a className={cell} href={LINKS.appStore}>
          App Store
        </a>
        <a className={cell} href={LINKS.googlePlay}>
          Google Play
        </a>
      </div>
      <div className="flex flex-col gap-[9px]">
        <a className={cell} href={asset("/privacy-policy.html")}>
          {t.footPrivacy}
        </a>
        <a className={cell} href={LINKS.license}>
          {t.footLicense}
        </a>
      </div>
      <div className="flex flex-col gap-[9px]">
        <a className={cell} href={`mailto:${LINKS.email}`}>
          {LINKS.email}
        </a>
        <a className={cell} href={LINKS.org}>
          şapak — Open Source Turkmenistan
        </a>
      </div>
      <span className="col-span-full mt-[14px] text-[13px] text-faint">© 2026 Şapak Apps</span>
    </footer>
  );
}
