/* eslint-disable no-restricted-globals */
import { FC } from "react";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../forms/CustomDropdown";

export const Address: FC = () => {
  const { t } = useTranslation(["common"]);
  return (
      <div className="address">
        <div className="row">
          <Dropdown options={[]} label={t("govern")} />
          <Dropdown options={[]} label={t("city")} />
          <TextField label={t("district")} />
          <TextField label={t("address")} />
        </div>
      </div>
  );
};
