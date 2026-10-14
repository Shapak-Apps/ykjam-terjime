"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUi } from "@/app/providers";
import { UI_LANGS } from "@/lib/i18n";
import { asset, LINKS } from "@/lib/paths";

const iconClass = "size-[19px] shrink-0";

function TextIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h9M8.5 6v3c0 3-2 5-4.5 6" />
      <path d="M7 12c1.5 2 3.5 3 6 3.5" />
      <path d="M12.5 20l4-9 4 9M14 17.5h5" />
    </svg>
  );
}

function VoiceIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3.5" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <circle cx="8.5" cy="10" r="1.6" />
      <path d="M4 17l4.5-4.5a2 2 0 0 1 2.8 0L16 17M15 14l1.6-1.6a2 2 0 0 1 2.8 0L21 14" />
    </svg>
  );
}

function AppIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M10.5 18.5h3" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l-5-6 5-6M15 6l5 6-5 6" />
    </svg>
  );
}

const linkBase =
  "flex items-center gap-[11px] rounded-[10px] px-[11px] py-[9px] text-[14.5px] font-medium no-underline whitespace-nowrap";

export function Sidebar() {
  const { ui, setUi, t } = useUi();
  const pathname = usePathname();

  const items = [
    { href: "/", label: t.navText, icon: <TextIcon /> },
    { href: "/ses/", label: t.navVoice, icon: <VoiceIcon /> },
    { href: "/surat/", label: t.navPhoto, icon: <PhotoIcon /> },
    { href: "/programma/", label: t.navApp, icon: <AppIcon /> },
  ];

  const isActive = (href: string) => {
    const here = pathname.endsWith("/") ? pathname : `${pathname}/`;
    return here === href;
  };

  return (
    <aside className="flex flex-col px-4 pt-[22px] pb-7 md:sticky md:top-0 md:h-screen">
      <Link href="/" className="flex items-center gap-[9px] px-[10px] pb-1 no-underline">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/icon.png")}
          alt=""
          width={192}
          height={192}
          className="size-[30px] rounded-lg"
        />
        <span className="font-display text-[17px] font-bold tracking-[-0.02em] text-ink">
          Ykjam Terjime
        </span>
      </Link>

      <span className="mt-2 mb-5 ml-[10px] self-start rounded-[5px] bg-sand-soft px-[7px] py-[3px] text-[10px] font-semibold tracking-[0.12em] text-sand uppercase">
        {t.maket}
      </span>

      <nav className="flex gap-[6px] overflow-x-auto pb-1 md:flex-col md:gap-[2px] md:overflow-visible md:pb-0">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`${linkBase} ${
                active
                  ? "bg-card text-ink font-semibold shadow-card [&_svg]:text-brand"
                  : "bg-card text-muted shadow-card md:bg-transparent md:shadow-none md:hover:bg-card [&_svg]:text-faint"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="hidden h-px bg-line mx-[11px] my-[10px] md:block" />

        <a
          href={LINKS.siteRepo}
          className={`${linkBase} bg-card text-muted shadow-card md:bg-transparent md:shadow-none md:hover:bg-card md:hover:text-ink [&_svg]:text-faint`}
        >
          <CodeIcon />
          <span>{t.navProject}</span>
        </a>
      </nav>

      <div className="mt-3 px-[2px] md:mt-auto md:px-[11px] md:pt-[14px]">
        <div className="flex gap-[3px]" role="group" aria-label="Interface language">
          {UI_LANGS.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setUi(lang)}
              aria-pressed={ui === lang}
              className={`cursor-pointer rounded-[7px] px-2 py-[5px] text-[12px] font-semibold tracking-[0.06em] ${
                ui === lang ? "bg-brand-soft text-brand-deep" : "text-muted hover:bg-card hover:text-ink"
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
