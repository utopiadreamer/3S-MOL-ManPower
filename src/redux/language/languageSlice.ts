import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setRTL } from "@fluentui/react";
import i18n from "../../i18n";

export const isRtlLanguage = (lang: string): boolean => {
  return lang === "ar";
};

const langToIso4 = (lang: string): string => {
  switch (lang) {
    case "ar":
      return "ar-EG";
    case "en":
      return "en-GB";
    default:
      return "en-GB";
  }
};

export interface LanguageState {
  language: {
    lang: string;
    langIso4: string;
    isRtl: boolean;
  };
}

const initialState: LanguageState = {
  language: {
    lang: "",
    langIso4: "",
    isRtl: false,
  },
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<string>) => {
      const lang = action.payload;
      setRTL(isRtlLanguage(lang), true);
      i18n.changeLanguage(lang);
      state.language = {
        ...state.language,
        lang: action.payload,
        langIso4: langToIso4(lang),
        isRtl: isRtlLanguage(lang),
      };
    },
  },
});

export const { changeLang } = languageSlice.actions;
export default languageSlice.reducer;
