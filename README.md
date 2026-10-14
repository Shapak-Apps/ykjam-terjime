# Ykjam Terjime — sahypa

Türkmen dili üçin terjimeçi: tekst, ses we surat. Sahypanyň kody.

> ⚠️ **Terjime hyzmaty entek birikdirilmedi.** Häzirlikçe bu maket: diňe programmadaky sekiz hakyky sözlem terjime edilýär, galan tekstler ýok. Ses we surat üçin interfeýs taýýar, tanamak serwerde bolar.

## Bölümler

| Salgy | Bölüm |
| --- | --- |
| `/` | **Tekst** — terjime konsoly, bäş dil: `TK` `RU` `EN` `ZH` `TR` |
| `/ses/` | **Ses** — mikrofona ýazgy, serwere ibermek |
| `/surat/` | **Surat** — surat ýüklemek, serwerde tanamak |
| `/programma/` | **Programma** — App Store we Google Play |

Konsolda: **türkmen harplary hatary** `ä ç ž ň ö ş ü ý` (klawiatura olary bermeýän bolsa), hytaý dili üçin transkripsiýa, `Diňle` brauzeriň sesi bilen (türkmen üçin `tr-TR`, programmadaky ýaly), soňky terjimeleriň taryhy.

Interfeýs üç dilde: türkmen, rus, iňlis. Saýlanan dil brauzerde ýatda saklanýar.

## Gurluş

Next.js 16 (App Router) + TypeScript + Tailwind v4, statik eksport (`output: "export"`).

| Faýl | Näme üçin |
| --- | --- |
| `app/` | sahypalar we umumy görnüş |
| `components/` | gapdal menýu, podval, terjime konsoly |
| `lib/engine.ts` | **terjime hyzmaty bilen birikme nokady** — tutuş sahypa diňe şu ýerden terjime soraýar |
| `lib/i18n.ts` | interfeýsiň üç dildäki setirleri |
| `lib/paths.ts` | `basePath` we daşky salgylar |
| `public/` | `icon.png`, `privacy-policy.html`, `.nojekyll` |

Terjime serweri taýýar bolanda üýtgedilýän ýeke-täk ýer — `lib/engine.ts` içindäki `ENGINE_URL`.

## Ýerli işletmek

    npm install
    npm run dev

Soňra `http://localhost:3000/ykjam-terjime` açyň — sahypa GitHub Pages-de kiçi papkada ýaşaýar, şonuň üçin `basePath` ýerli hem işleýär.

Statik ýygnamak:

    npm run build

Netije `out/` papkasynda. Ol git-e girmeýär: GitHub Actions her `main`-e puşdan soň özi ýygnaýar we Pages-e çykarýar (`.github/workflows/deploy.yml`).

## Programma

- [App Store](https://apps.apple.com/app/ykjam-terjime/id6758071845)
- [Google Play](https://play.google.com/store/apps/details?id=com.shapak.translator)
- [Programmanyň kody](https://github.com/Shapak-Apps/turkmen-phrasebook)

## Litsenziýa

MIT — [LICENSE](./LICENSE) faýlyna serediň.

[Shapak-Apps](https://github.com/Shapak-Apps) guramasynyň bir bölegi.
