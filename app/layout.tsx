import type { Metadata } from "next";
import "./globals.css";
import { UiProvider } from "./providers";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { SITE_URL } from "@/lib/paths";

const DESCRIPTION =
  "Ykjam Terjime — türkmen dili üçin terjimeçi: tekst, ses we surat. Türkmen harplary ä ç ž ň ö ş ü ý klawiaturasyz.";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: "Ykjam Terjime",
  description: DESCRIPTION,
  // Сайт внутренний: в поиске ему пока нечего делать.
  // В день запуска снять это и поменять app/robots.ts.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Ykjam Terjime",
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/`,
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ykjam Terjime",
    description: DESCRIPTION,
    images: [`${SITE_URL}/og.png`],
  },
};

export const viewport = {
  themeColor: "#2FA0D9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tk" className="h-full antialiased">
      {/*
        Шрифты подключаются ссылкой, а не через next/font: next/font скачивает
        файлы во время сборки, и сборка перестаёт работать там, где нет выхода
        к Google Fonts. Ссылку браузер тянет сам, сборке сеть не нужна.
      */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
      />
      <body className="min-h-full bg-bg text-ink">
        <UiProvider>
          <SkipLink />
          <div className="grid md:grid-cols-[236px_minmax(0,1fr)]">
            <Sidebar />
            {/*
              Колонка содержимого тянется на всю высоту экрана, а подвал
              прижат к её низу: иначе на короткой странице он повисает
              посередине, как это было на главной.
            */}
            <div className="flex min-w-0 flex-col md:min-h-screen">
              <main id="content" className="flex-1 px-4 pt-4 pb-10 md:px-[30px] md:pt-[22px]">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </UiProvider>
      </body>
    </html>
  );
}
