"use client";

import { useUi } from "@/app/providers";

/**
 * Первая цель табуляции: уводит сразу к содержимому, минуя меню.
 * Видна только при переходе с клавиатуры.
 */
export function SkipLink() {
  const { t } = useUi();

  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-pill focus:bg-brand focus:px-4 focus:py-2 focus:text-[14px] focus:font-semibold focus:text-on-brand"
    >
      {t.skipLink}
    </a>
  );
}
