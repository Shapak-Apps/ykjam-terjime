"use client";

import Link from "next/link";
import { useUi } from "./providers";
import { HeroDemo } from "@/components/HeroDemo";

const iconClass = "size-6 text-brand transition-transform duration-200 group-hover:scale-110";

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

export default function HomePage() {
  const { t } = useUi();

  const services = [
    { href: "/tekst/", icon: <TextIcon />, title: t.svcTextTitle, body: t.svcTextBody },
    { href: "/ses/", icon: <VoiceIcon />, title: t.svcVoiceTitle, body: t.svcVoiceBody },
    { href: "/surat/", icon: <PhotoIcon />, title: t.svcPhotoTitle, body: t.svcPhotoBody },
    { href: "/programma/", icon: <AppIcon />, title: t.svcAppTitle, body: t.svcAppBody },
  ];

  return (
    <section>
      <h1 className="max-w-[18ch] font-display text-[clamp(27px,3.4vw,40px)] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance text-ink">
        {t.homeTitle}
      </h1>
      <p className="mt-[18px] max-w-[62ch] text-[16.5px] text-muted">{t.homeLead}</p>

      <HeroDemo />

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group flex flex-col rounded-card bg-card px-[26px] py-6 no-underline shadow-card transition duration-200 hover:-translate-y-[2px] hover:bg-brand-softer hover:shadow-[0_8px_26px_rgb(20_33_43_/_0.08)]"
          >
            {service.icon}
            <h2 className="mt-4 font-display text-[19px] font-bold tracking-[-0.015em] text-ink">
              {service.title}
            </h2>
            <p className="mt-2 flex-1 text-[15px] text-muted">{service.body}</p>
            <span className="mt-5 text-[14.5px] font-semibold text-brand-deep">
              {t.svcOpen}{" "}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
