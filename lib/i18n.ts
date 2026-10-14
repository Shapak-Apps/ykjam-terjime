import type { Lang } from "./engine";

/** Язык интерфейса сайта. Туркменский по умолчанию. */
export type UiLang = "tk" | "ru" | "en";

export const UI_LANGS: UiLang[] = ["tk", "ru", "en"];

/** Названия языков перевода на языке интерфейса. */
export const LANG_NAMES: Record<Lang, Record<UiLang, string>> = {
  tk: { tk: "Türkmen dili", ru: "Туркменский", en: "Turkmen" },
  ru: { tk: "Rus dili", ru: "Русский", en: "Russian" },
  en: { tk: "Iňlis dili", ru: "Английский", en: "English" },
  zh: { tk: "Hytaý dili", ru: "Китайский", en: "Chinese" },
  tr: { tk: "Türk dili", ru: "Турецкий", en: "Turkish" },
};

export type Strings = {
  maket: string;

  navText: string;
  navVoice: string;
  navPhoto: string;
  navApp: string;
  navProject: string;

  srcRole: string;
  tgtRole: string;
  placeholder: string;
  outEmpty: string;
  lettersCap: string;
  listen: string;
  clear: string;
  copy: string;
  copied: string;
  swap: string;
  tryCap: string;

  stateNotReady: string;
  stateTooLong: string;
  stateOffline: string;
  stateError: string;

  historyTitle: string;
  historyEmpty: string;
  historyClear: string;

  voiceTitle: string;
  voiceLead: string;
  voiceStart: string;
  voiceStop: string;
  voiceCancel: string;
  voiceListening: string;
  voiceNoMic: string;
  voiceDenied: string;
  voiceReady: string;
  voiceSend: string;

  photoTitle: string;
  photoLead: string;
  photoDrop: string;
  photoChoose: string;
  photoCamera: string;
  photoReplace: string;
  photoSend: string;
  photoWrongType: string;
  photoTooBig: string;

  appTitle: string;
  appLead: string;
  appP1: string;
  appP2: string;
  appP3: string;

  pOffTitle: string;
  pOffBody: string;
  pMaketTitle: string;
  pMaketBody: string;
  heroTitle: string;
  heroBody: string;

  footSite: string;
  footApp: string;
  footPrivacy: string;
  footLicense: string;
};

export const STRINGS: Record<UiLang, Strings> = {
  tk: {
    maket: "maket",

    navText: "Tekst",
    navVoice: "Ses",
    navPhoto: "Surat",
    navApp: "Programma",
    navProject: "Taslama",

    srcRole: "Çeşme dili",
    tgtRole: "Niýetlenen dili",
    placeholder: "Terjime etmek üçin tekst giriziň...",
    outEmpty: "Terjime şu ýerde görkeziler",
    lettersCap: "Türkmen harplary",
    listen: "Diňle",
    clear: "Arassala",
    copy: "Göçür",
    copied: "Göçürildi",
    swap: "Dilleri çalyş",
    tryCap: "Synanyşyp görüň",

    stateNotReady:
      "Bu sözlem entek maketde ýok. Terjime hyzmaty birikdirilenden soň islendik tekst terjime ediler.",
    stateTooLong: "Tekst gaty uzyn. Iň köp 5000 simwol.",
    stateOffline: "Internet baglanyşygy ýok. Baglanyşygy barlap gaýtadan synanyşyň.",
    stateError: "Terjime şowsuz boldy. Gaýtadan synanyşyň.",

    historyTitle: "Soňky terjimeler",
    historyEmpty: "Entek terjime ýok",
    historyClear: "Taryhy arassala",

    voiceTitle: "Ses terjimesi",
    voiceLead:
      "Gürläň — ses serwere iberilýär, tanalýar we terjime edilýär. Brauzer diňe ýazgy edýär.",
    voiceStart: "Ýazgy etmek üçin basyň",
    voiceStop: "Dur",
    voiceCancel: "Ýatyr",
    voiceListening: "Ýazgy edilýär...",
    voiceNoMic: "Bu brauzerde mikrofon elýeterli däl.",
    voiceDenied: "Mikrofona rugsat berilmedi. Brauzeriň sazlamalaryndan rugsat beriň.",
    voiceReady: "Ýazgy taýýar",
    voiceSend: "Terjime et",

    photoTitle: "Suratdan terjime",
    photoLead:
      "Surat ýükläň — ýazgy serwerde tanalýar we terjime edilýär. Menýu, bellik, resminama.",
    photoDrop: "Suraty şu ýere süýräň",
    photoChoose: "Faýl saýlaň",
    photoCamera: "Surata düşüriň",
    photoReplace: "Başga surat",
    photoSend: "Terjime et",
    photoWrongType: "Diňe surat faýly bolýar: JPG, PNG ýa-da WebP.",
    photoTooBig: "Surat gaty uly. Iň köp 10 MB.",

    appTitle: "Telefondaky programma",
    appLead: "Ykjam Terjime App Store we Google Play-de. MIT ygtyýarnamasy, kody açyk.",
    appP1:
      "Gepleşik kitaby telefonda internetsiz işleýär — şonuň üçin ol serhetde, dermanhanada we aragatnaşyk ýok ýerde elýeterli.",
    appP2:
      "Ekrany görkezmek režimi: telefony beriň — söhbetdeşiňiz jümläni okap, jogaby basýar, siz ony türkmençe görýärsiňiz.",
    appP3: "Türkmen dili hytaý, iňlis ýa-da rus dilleri bilen jübütde. Interfeýs bäş dilde.",

    pOffTitle: "Telefonda internetsiz",
    pOffBody:
      "Gepleşik kitaby programmada oflaýn işleýär — serhetde, dermanhanada we aragatnaşyk ýok ýerde.",
    pMaketTitle: "Terjime hyzmaty entek ýok",
    pMaketBody:
      "Bu sahypa — maket. Häzir diňe programmadaky hakyky sözlemler terjime edilýär.",
    heroTitle: "Türkmen dili üçin terjimeçi",
    heroBody:
      "Häzir bäş dil elýeterli: türkmen, rus, iňlis, hytaý we türk. Klawiaturada ä, ç, ž, ň, ö, ş, ü, ý harplary ýok bolsa — olar ýazgy meýdanynyň aşagynda.",
    footSite: "Sahypanyň kody",
    footApp: "Programmanyň kody",
    footPrivacy: "Gizlinlik syýasaty",
    footLicense: "MIT ygtyýarnamasy",
  },

  ru: {
    maket: "макет",

    navText: "Текст",
    navVoice: "Голос",
    navPhoto: "Фото",
    navApp: "Приложение",
    navProject: "Проект",

    srcRole: "Язык оригинала",
    tgtRole: "Язык перевода",
    placeholder: "Начните писать текст",
    outEmpty: "Здесь появится перевод",
    lettersCap: "Туркменские буквы",
    listen: "Прослушать",
    clear: "Очистить",
    copy: "Копировать",
    copied: "Скопировано",
    swap: "Поменять языки",
    tryCap: "Попробуйте",

    stateNotReady:
      "Этой фразы в макете пока нет. Когда движок будет подключён, переводиться будет любой текст.",
    stateTooLong: "Текст слишком длинный. Максимум 5000 символов.",
    stateOffline: "Нет соединения. Проверьте интернет и попробуйте снова.",
    stateError: "Перевод не удался. Попробуйте ещё раз.",

    historyTitle: "Последние переводы",
    historyEmpty: "Переводов пока нет",
    historyClear: "Очистить историю",

    voiceTitle: "Голосовой перевод",
    voiceLead:
      "Говорите — запись уходит на сервер, там распознаётся и переводится. Браузер только записывает.",
    voiceStart: "Нажмите, чтобы записать",
    voiceStop: "Стоп",
    voiceCancel: "Отменить",
    voiceListening: "Идёт запись...",
    voiceNoMic: "В этом браузере микрофон недоступен.",
    voiceDenied: "Доступ к микрофону запрещён. Разрешите его в настройках браузера.",
    voiceReady: "Запись готова",
    voiceSend: "Перевести",

    photoTitle: "Перевод с фото",
    photoLead:
      "Загрузите снимок — текст распознаётся на сервере и переводится. Меню, вывеска, документ.",
    photoDrop: "Перетащите фото сюда",
    photoChoose: "Выберите файл",
    photoCamera: "Снять камерой",
    photoReplace: "Другое фото",
    photoSend: "Перевести",
    photoWrongType: "Нужен файл изображения: JPG, PNG или WebP.",
    photoTooBig: "Файл слишком большой. Максимум 10 МБ.",

    appTitle: "Приложение на телефоне",
    appLead: "Ykjam Terjime в App Store и Google Play. Лицензия MIT, код открыт.",
    appP1:
      "Разговорник на телефоне работает без интернета — поэтому он доступен на границе, в аптеке и там, где нет связи.",
    appP2:
      "Режим «покажи экран»: отдайте телефон — собеседник читает фразу и нажимает ответ, вы видите его по-туркменски.",
    appP3: "Туркменский в паре с китайским, английским или русским. Интерфейс на пяти языках.",

    pOffTitle: "На телефоне без интернета",
    pOffBody:
      "Разговорник в приложении работает офлайн — на границе, в аптеке и там, где нет связи.",
    pMaketTitle: "Перевод пока не работает",
    pMaketBody:
      "Это макет. Сейчас переводятся только настоящие фразы приложения.",
    heroTitle: "Переводчик для туркменского языка",
    heroBody:
      "Сейчас доступно пять языков: туркменский, русский, английский, китайский и турецкий. Если на клавиатуре нет ä, ç, ž, ň, ö, ş, ü, ý — они под полем ввода.",
    footSite: "Код сайта",
    footApp: "Код приложения",
    footPrivacy: "Политика приватности",
    footLicense: "Лицензия MIT",
  },

  en: {
    maket: "mockup",

    navText: "Text",
    navVoice: "Voice",
    navPhoto: "Photo",
    navApp: "App",
    navProject: "Project",

    srcRole: "Source language",
    tgtRole: "Target language",
    placeholder: "Start typing",
    outEmpty: "The translation will appear here",
    lettersCap: "Turkmen letters",
    listen: "Listen",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied",
    swap: "Swap languages",
    tryCap: "Try these",

    stateNotReady:
      "This phrase is not in the mockup yet. Once the engine is connected, any text will translate.",
    stateTooLong: "Text is too long. 5000 characters maximum.",
    stateOffline: "No connection. Check the network and try again.",
    stateError: "Translation failed. Try again.",

    historyTitle: "Recent translations",
    historyEmpty: "Nothing translated yet",
    historyClear: "Clear history",

    voiceTitle: "Voice translation",
    voiceLead:
      "Speak — the recording goes to the server, which recognises and translates it. The browser only records.",
    voiceStart: "Press to record",
    voiceStop: "Stop",
    voiceCancel: "Cancel",
    voiceListening: "Recording...",
    voiceNoMic: "The microphone is not available in this browser.",
    voiceDenied: "Microphone access was denied. Allow it in the browser settings.",
    voiceReady: "Recording ready",
    voiceSend: "Translate",

    photoTitle: "Translate from a photo",
    photoLead:
      "Upload a picture — the text is recognised on the server and translated. A menu, a sign, a document.",
    photoDrop: "Drop a photo here",
    photoChoose: "Choose a file",
    photoCamera: "Take a photo",
    photoReplace: "Another photo",
    photoSend: "Translate",
    photoWrongType: "An image file is needed: JPG, PNG or WebP.",
    photoTooBig: "The file is too large. 10 MB maximum.",

    appTitle: "The app on your phone",
    appLead: "Ykjam Terjime on the App Store and Google Play. MIT licensed, source open.",
    appP1:
      "The phrasebook works offline on the phone — so it is there at the border, at the pharmacy, and anywhere without a signal.",
    appP2:
      "Show-the-screen mode: hand over the phone — the other person reads the sentence and taps an answer, you see it in Turkmen.",
    appP3: "Turkmen paired with Chinese, English or Russian. Interface in five languages.",

    pOffTitle: "Offline on your phone",
    pOffBody:
      "The phrasebook works offline in the app — at the border, at the pharmacy, and anywhere without a signal.",
    pMaketTitle: "Translation is not live yet",
    pMaketBody:
      "This page is a mockup. For now only the app's real phrases translate.",
    heroTitle: "A translator for the Turkmen language",
    heroBody:
      "Five languages are available today: Turkmen, Russian, English, Chinese and Turkish. If your keyboard has no ä, ç, ž, ň, ö, ş, ü, ý — they sit under the input field.",
    footSite: "Website source",
    footApp: "App source",
    footPrivacy: "Privacy policy",
    footLicense: "MIT license",
  },
};
