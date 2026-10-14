import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/paths";

// при output: export маршрут обязан быть статическим
export const dynamic = "force-static";

/**
 * Карта сайта готова заранее: пока стоит запрет на индексирование, она не нужна,
 * но в день запуска менять её не придётся — только снять запрет.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/ses/", "/surat/", "/programma/"];

  return pages.map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
