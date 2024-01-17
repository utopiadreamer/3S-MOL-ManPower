/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from "react";
import "../styles/SettlementManage.scss";
import { useTranslation } from "react-i18next";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { DatePicker } from "../../../shared/components/forms/CustomDatePicker";
import { SettlementDTO } from "../../../shared/models/SettlementDTO";
import { Form } from "../../../shared/components/forms/Form";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { SettlementDocumentType } from "../../../shared/constants/constants";
import { Mode } from "../../../shared/constants/types";

export interface Props {
  mode: Mode;
  onValidate?: (valid: boolean) => void;
}

export const SettlementManage: FC<Props> = (props: Props) => {
  const { t } = useTranslation(["settlements", "common"]);
  const [details, setDetails] = useState<SettlementDTO>();
  const { mode, onValidate } = props;

  const form = useRef(new Form({}));
  const [isFormValid, setIsFormValid] = useState<boolean>(form.current.isValid);
  form.current.onValidityChanged = (isValid) => setIsFormValid(isValid);

  const documentTypes = [
    {
      key: SettlementDocumentType.Invoice,
      text: t("invoice"),
      data: { icon: "PageList" },
    },
    {
      key: SettlementDocumentType.Clearance,
      text: t("clearance"),
      data: { icon: "M365InvoicingLogo" },
    },
  ];
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDetails((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = () => {};

  const SetValidity = (name: string, isValid: boolean) => {
    form.current.SetValidity(name, isValid);
  };

  useEffect(() => {
    if (onValidate) onValidate(true);
  });

  return (
    <div className="contractManage panel">
      <div className="body">
        <div className="section">
          <Section
            size={SectionSize.h2}
            title={t("settlementInfo")}
            iconName="ActivateOrders"
          />
          <div className="content">
            <div className="row">
              <TextField
                label={t("contractNo")}
                name="ContractNo"
                value={details?.ContractNo ?? ""}
                readOnly
              />
              <TextField
                label={t("settlementNumber")}
                name="SettlementNo"
                value={details?.SettlementNo ?? ""}
                readOnly
              />
              <DatePicker
                label={t("operationStartDate")}
                value={details?.OperationStartDate}
                onChange={handleDateChange}
                isRequired
              />
              <DatePicker
                label={t("operationEndDate")}
                value={details?.OperationEndDate}
                onChange={handleDateChange}
                isRequired
              />
            </div>
            <div className="row">
              <Dropdown
                label={t("settlementDocumentType")}
                options={documentTypes}
                selectedKey={details?.DocumentType ?? ""}
                onValidationChange={SetValidity}
                required
              />
              <TextField
                label={t("description")}
                name="Description"
                value={details?.Description ?? ""}
                onChange={handleInputChange}
              />
              <TextField
                label={t("notes")}
                name="Notes"
                value={details?.Notes ?? ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="section">
          <Section
            size={SectionSize.h2}
            title={t("workItems")}
            iconName="ActivateOrders"
          />
        </div>
      </div>
    </div>
  );
};
