/**
 * Сайт отдаётся из подпапки /ykjam-terjime/ на GitHub Pages.
 *
 * next/link и next/image подставляют basePath сами, а обычные <img src="/icon.png">
 * и ссылки на файлы из public — нет. Для них и нужен asset().
 * Значение обязано совпадать с basePath в next.config.ts.
 */
export const BASE_PATH = "/ykjam-terjime";

export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export const LINKS = {
  appStore: "https://apps.apple.com/app/ykjam-terjime/id6758071845",
  googlePlay: "https://play.google.com/store/apps/details?id=com.shapak.translator",
  siteRepo: "https://github.com/Shapak-Apps/ykjam-terjime",
  appRepo: "https://github.com/Shapak-Apps/turkmen-phrasebook",
  org: "https://shapak-apps.github.io/",
  license: "https://github.com/Shapak-Apps/ykjam-terjime/blob/main/LICENSE",
  email: "shapak.apps@gmail.com",
} as const;
