/* eslint-disable no-restricted-globals */
import { FC } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { PrimaryButton } from "@fluentui/react";
import "../styles/SettlementSearch.scss";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const SettlementSearch: FC = () => {
  const { t } = useTranslation(["settlements", "common"]);
  return (
    <LayoutContent>
      <div className="settlementSearch panel">
        <div className="row">
          <TextField label={t("requestNo")} />
          <TextField label={t("assignEstID")} />
          <TextField label={t("execEstID")} />
          <PrimaryButton>{t("common:search")}</PrimaryButton>
        </div>
        <div className="extract">
          <NavLink to={'/settlements/new'}>{t("extractSettlement")}</NavLink>
        </div>
      </div>
    </LayoutContent>
  );
};
