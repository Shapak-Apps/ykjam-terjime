import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/paths";

// при output: export маршрут обязан быть статическим
export const dynamic = "force-static";

/**
 * Сайт пока внутренний: людям его не предлагаем, в поиск ему рано.
 * Когда запустимся — поменять disallow на allow и убрать noindex в app/layout.tsx.
 *
 * Оговорка: поисковики читают robots.txt в корне домена, а мы живём в подпапке
 * shapak-apps.github.io/ykjam-terjime/. Так что настоящий запрет здесь даёт
 * мета-тег noindex, а этот файл — для порядка и для будущего своего домена.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
