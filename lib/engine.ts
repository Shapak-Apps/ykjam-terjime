/**
 * Шов под будущий движок перевода.
 *
 * Весь сайт обращается к переводу только через этот файл. Сегодня движка нет:
 * переводятся восемь настоящих фраз из разговорника, на остальное возвращается
 * статус "not-connected". Когда появится свой сервер в Туркменистане, меняется
 * только содержимое функций ниже — страницы и состояния интерфейса остаются как есть.
 */

export type Lang = "tk" | "ru" | "en" | "zh" | "tr";

export const LANGS: Lang[] = ["tk", "ru", "en", "zh", "tr"];

/** Голос для озвучки. Туркменского голоса в браузерах нет, берём турецкий —
 *  то же решение, что в приложении (languages.config.ts). */
export const TTS_CODE: Record<Lang, string> = {
  tk: "tr-TR",
  ru: "ru-RU",
  en: "en-US",
  zh: "zh-CN",
  tr: "tr-TR",
};

export const TEXT_LIMIT = 5000;

/** Адрес будущего сервера. Пока пустой — значит движок не подключён. */
export const ENGINE_URL = "";

export type TranslateOk = {
  status: "ok";
  text: string;
  /** Транскрипция: пиньинь для китайского. */
  translit?: string;
};

export type TranslateFail =
  | { status: "empty" }
  | { status: "too-long"; limit: number }
  | { status: "not-connected" }
  | { status: "offline" }
  | { status: "error" };

export type TranslateResult = TranslateOk | TranslateFail;

/** Восемь фраз из src/data/scenarios/texts/*.ts приложения — настоящие данные, не выдумка. */
type DemoRow = Partial<Record<Lang, string>> & { zt?: string };

const DEMO: DemoRow[] = [
  { tk: "Salam!", ru: "Здравствуйте", en: "Hello", zh: "你好!", zt: "nǐ hǎo!" },
  { tk: "Sag boluň!", ru: "Спасибо", en: "Thank you", zh: "谢谢!", zt: "xiè xiè!" },
  {
    tk: "Bu näçe durýar?",
    ru: "Сколько это стоит?",
    en: "How much is it?",
    zh: "这个多少钱?",
    zt: "zhè ge duō shǎo qián?",
  },
  {
    tk: "Hajathana nirede?",
    ru: "Где туалет?",
    en: "Where is the toilet?",
    zh: "厕所在哪里?",
    zt: "cè suǒ zài nǎ lǐ?",
  },
  {
    tk: "Men düşünemok",
    ru: "Я не понимаю",
    en: "I don't understand",
    zh: "我听不懂",
    zt: "wǒ tīng bù dǒng",
  },
  {
    tk: "Haýyş edýärin, haýalrak gepläň",
    ru: "Говорите медленнее, пожалуйста",
    en: "Please speak slower",
    zh: "请说慢一点",
    zt: "qǐng shuō màn yì diǎn",
  },
  { tk: "Men azaşdym", ru: "Я заблудился", en: "I'm lost", zh: "我迷路了", zt: "wǒ mí lù le" },
  {
    tk: "Maňa lukman gerek",
    ru: "Мне нужен врач",
    en: "I need a doctor",
    zh: "我需要医生",
    zt: "wǒ xū yào yī shēng",
  },
];

/** Пары для живого показа на главной: берём из тех же настоящих фраз. */
export type ShowcaseItem = {
  from: Lang;
  to: Lang;
  source: string;
  target: string;
  translit?: string;
};

export const SHOWCASE: ShowcaseItem[] = [
  { from: "tk", to: "ru", source: DEMO[3].tk!, target: DEMO[3].ru! },
  { from: "tk", to: "zh", source: DEMO[2].tk!, target: DEMO[2].zh!, translit: DEMO[2].zt },
  { from: "tk", to: "en", source: DEMO[7].tk!, target: DEMO[7].en! },
  { from: "tk", to: "ru", source: DEMO[5].tk!, target: DEMO[5].ru! },
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[!?.,;:。！？]+\s*$/g, "").trim();
}

function lookupDemo(text: string, from: Lang, to: Lang): TranslateOk | null {
  const key = normalize(text);
  if (!key) return null;
  for (const row of DEMO) {
    const source = row[from];
    if (source && normalize(source) === key) {
      const target = row[to];
      if (!target) return null;
      return { status: "ok", text: target, translit: to === "zh" ? row.zt : undefined };
    }
  }
  return null;
}

/** Перевод текста. Единственная точка, через которую сайт просит перевод. */
export async function translateText(
  text: string,
  from: Lang,
  to: Lang,
): Promise<TranslateResult> {
  if (!text.trim()) return { status: "empty" };
  if (text.length > TEXT_LIMIT) return { status: "too-long", limit: TEXT_LIMIT };

  if (!ENGINE_URL) {
    const hit = lookupDemo(text, from, to);
    return hit ?? { status: "not-connected" };
  }

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return { status: "offline" };
  }

  try {
    const response = await fetch(`${ENGINE_URL}/translate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text, from, to }),
    });
    if (!response.ok) return { status: "error" };
    const data: { text?: string; translit?: string } = await response.json();
    if (!data.text) return { status: "error" };
    return { status: "ok", text: data.text, translit: data.translit };
  } catch {
    return { status: "error" };
  }
}

/** Распознавание речи. Запись делает браузер, распознаёт сервер. */
export async function transcribeAudio(_audio: Blob, _lang: Lang): Promise<TranslateResult> {
  if (!ENGINE_URL) return { status: "not-connected" };
  return { status: "not-connected" };
}

/** Распознавание текста на фото. Снимок делает браузер, читает сервер. */
export async function readImage(_image: File, _lang: Lang): Promise<TranslateResult> {
  if (!ENGINE_URL) return { status: "not-connected" };
  return { status: "not-connected" };
}

export const engineConnected = Boolean(ENGINE_URL);
