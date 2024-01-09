import { ActionButton } from "@fluentui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { changeLang } from "../../../../redux/language/languageSlice";

const LanguageSelector: React.FC = () => {
  const isRtl = useSelector((state: RootState) => state).reduxLanguage.language.isRtl;
  const dispatch = useDispatch();

  const ChangeLanguage = (lang: string) => {
    dispatch(changeLang(lang));
  };

  return (
    <div>
      <ActionButton onClick={() => ChangeLanguage(isRtl ? "en" : "ar")}>{isRtl ? "Switch to English" : "التحويل للعربية"}</ActionButton>
    </div>
  );
};

export default LanguageSelector;
