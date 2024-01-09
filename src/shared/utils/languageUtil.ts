import { Languages } from "../constants/constants";
import { StorageUtil } from "./storageUtil";

export class LanguageUtil {
  public static getStorageLang = () => {
    const localstorageval = StorageUtil.loadState("currentLanguage");

    if (localstorageval) {
      return localstorageval.toString();
    }
    return Languages.ar;
  };

  public static getCurrentLang = () => {
    const localstorageval = StorageUtil.loadState("currentLanguage");

    if (localstorageval) {
      return localstorageval.toString();
    }
    return Languages.ar;
  };
}
