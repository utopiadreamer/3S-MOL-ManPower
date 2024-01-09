import { useDispatch, useSelector } from "react-redux";
import { MenuRoutes } from "./shared/routing/Routes";
import { GeneralUtil } from "./shared/utils/generalUtil";
import { AppDispatch, RootState } from "./redux/store/store";
import i18n from "./i18n";
import { LanguageUtil } from "./shared/utils/languageUtil";
import { changeLang } from "./redux/language/languageSlice";
import { useEffect } from "react";
import { setRTL } from "@fluentui/react";

export default function App() {
  const reduxLanguage = useSelector((state: RootState) => state).reduxLanguage;
  const dispatch = useDispatch<AppDispatch>();

  const init = () => {
    if (GeneralUtil.isNothing(reduxLanguage.language.lang)) {
      let lang = i18n.language;
      if (GeneralUtil.isNothing(lang)) lang = LanguageUtil.getCurrentLang();
      dispatch(changeLang(lang));
      setDirection(lang === "ar");
    }
  };

  useEffect(() => {
    init();
  });

  const setDirection = (isRtl: boolean) => {
    setRTL(true);
    document.body.classList.add("rtl");
    // setRTL(isRtl);
    // if (isRtl) {
    //   document.body.classList.add("rtl");
    //   document.body.classList.remove("ltr");
    // } else {
    //   document.body.classList.add("ltr");
    //   document.body.classList.remove("rtl");
    // }
  };

  return (
    <div>
      <MenuRoutes />
    </div>
  );
}