import type { Metadata } from "next";
import "./globals.css";
import { UiProvider } from "./providers";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

const DESCRIPTION =
  "Ykjam Terjime — türkmen dili üçin terjimeçi: tekst, ses we surat. Türkmen harplary ä ç ž ň ö ş ü ý klawiaturasyz.";

export const metadata: Metadata = {
  title: "Ykjam Terjime",
  description: DESCRIPTION,
  openGraph: {
    title: "Ykjam Terjime",
    description: DESCRIPTION,
    type: "website",
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
          <div className="mx-auto grid max-w-[1420px] md:grid-cols-[236px_minmax(0,1fr)]">
            <Sidebar />
            <main className="min-w-0 px-4 pt-4 pb-11 md:px-[30px] md:pt-[22px] md:pb-14">
              {children}
              <Footer />
            </main>
          </div>
        </UiProvider>
      </body>
    </html>
  );
}
