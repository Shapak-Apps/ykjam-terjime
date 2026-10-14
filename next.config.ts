import type { NextConfig } from "next";

/**
 * Сайт живёт на GitHub Pages по адресу https://shapak-apps.github.io/ykjam-terjime/,
 * то есть в подпапке. Отсюда basePath: без него стили и скрипты ищутся в корне домена.
 *
 * Статический экспорт: Pages отдаёт только файлы, сервера у нас тут нет.
 * Когда появится свой бэкенд, браузер будет обращаться к нему напрямую.
 */
const BASE_PATH = "/ykjam-terjime";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  // /ses -> /ses/index.html: Pages отдаёт каталоги, а не .html без расширения
  trailingSlash: true,
  // оптимизация картинок требует сервера
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
