"use client";

import { useUi } from "@/app/providers";
import { asset, LINKS } from "@/lib/paths";

const cell = "text-[13.5px] text-muted no-underline hover:text-brand-deep";

export function Footer() {
  const { t } = useUi();

  return (
    <footer className="mt-auto grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line px-4 pt-[26px] pb-10 md:grid-cols-4 md:px-[30px]">
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
