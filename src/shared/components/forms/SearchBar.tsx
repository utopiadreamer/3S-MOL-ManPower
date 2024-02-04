import { PrimaryButton } from "@fluentui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import './SearchBar.scss';

export interface Props {
  onSearch: () => void;
  onClear: () => void;
}
export const SearchBar: FC<Props> = (props: Props) => {
  const { onSearch, onClear } = props;
  const { t } = useTranslation("common");
  return (
    <div className="searchBar">
      <PrimaryButton
        className="actionButton subAction"
        iconProps={{ iconName: "ClearFilter" }}
        text={t("clearSearch")}
        onClick={() => {
          onClear();
        }}
      />
      <PrimaryButton
        className="actionButton primeAction"
        iconProps={{ iconName: "Search" }}
        text={t("search")}
        onClick={() => {
          onSearch();
        }}
      />
    </div>
  );
};
