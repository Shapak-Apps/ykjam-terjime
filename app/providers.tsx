"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { STRINGS, type Strings, type UiLang } from "@/lib/i18n";

type UiValue = {
  ui: UiLang;
  setUi: (lang: UiLang) => void;
  t: Strings;
};

const UiContext = createContext<UiValue | null>(null);

const STORAGE_KEY = "ykjam.ui-lang";

export function UiProvider({ children }: { children: React.ReactNode }) {
  // Туркменский — язык по умолчанию. Сервер рендерит именно его,
  // сохранённый выбор подхватывается уже в браузере.
  const [ui, setUiState] = useState<UiLang>("tk");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && saved in STRINGS) setUiState(saved as UiLang);
    } catch {
      // приватный режим или запрет на хранилище — остаёмся на туркменском
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = ui;
  }, [ui]);

  const setUi = useCallback((lang: UiLang) => {
    setUiState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // не смогли запомнить — не беда, выбор держится до перезагрузки
    }
  }, []);

  return (
    <UiContext.Provider value={{ ui, setUi, t: STRINGS[ui] }}>{children}</UiContext.Provider>
  );
}

export function useUi(): UiValue {
  const value = useContext(UiContext);
  if (!value) throw new Error("useUi вызван вне UiProvider");
  return value;
}
