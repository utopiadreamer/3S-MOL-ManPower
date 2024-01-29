/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from "react";
import "../styles/SettlementManage.scss";
import { useTranslation } from "react-i18next";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { DatePicker } from "../../../shared/components/forms/CustomDatePicker";
import { SettlementDTO } from "../../../shared/models/SettlementDTO";
import { Form } from "../../../shared/components/forms/Form";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { SettlementDocumentType } from "../../../shared/constants/constants";
import { Mode } from "../../../shared/constants/types";
import { CommandBar } from "@fluentui/react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import "../styles/SettlementManage.scss";
import { WorkItems } from "./WorkItems";

export interface Props {
  mode: Mode;
  onValidate?: (valid: boolean) => void;
}

export const SettlementManage: FC<Props> = (props: Props) => {
  const { t } = useTranslation(["settlements", "common"]);
  const [details, setDetails] = useState<SettlementDTO>();
  const { mode, onValidate } = props;
  const { id } = useParams();
  const [isEditable, setEditable] = useState<boolean>(mode !== Mode.View);

  const form = useRef(new Form({}));
  const [, setIsFormValid] = useState<boolean>(form.current.isValid);
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

  const getActions = () => {
    const saveAction = {
      key: "save",
      className: clsx("actionButton", "primeAction"),
      text: t("common:save"),
      iconProps: { iconName: "Save" },
      onClick: () => {
        setEditable(false);
      },
    };
    const arr = [
      {
        key: "edit",
        className: clsx(
          "actionButton",
          isEditable ? "subAction" : "subAction"
        ),
        text: t(isEditable ? "common:cancel" : "common:edit"),
        iconProps: { iconName: isEditable ? "Cancel" : "Edit" },
        onClick: () => {
          setEditable(!isEditable);
        },
      },
    ];
    if (isEditable) arr.splice(0, 0, saveAction);
    return arr;
  };

  return (
    <div className="settlementManage panel">
      <div className="body">
        <div className="section">
          <div className="actionsHeader">
            <Section
              size={SectionSize.h2}
              title={t("settlementInfo")}
              iconName="ActivateOrders"
            />
            {id !== undefined && mode === Mode.Edit && (
              <CommandBar items={[]} farItems={getActions()} />
            )}
          </div>
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
                disabled={!isEditable}
              />
              <DatePicker
                label={t("operationEndDate")}
                value={details?.OperationEndDate}
                onChange={handleDateChange}
                isRequired
                disabled={!isEditable}
              />
            </div>
            <div className="row">
              <Dropdown
                label={t("settlementDocumentType")}
                options={documentTypes}
                selectedKey={details?.DocumentType ?? ""}
                onValidationChange={SetValidity}
                required
                readOnly={!isEditable}
              />
              <TextField
                label={t("description")}
                name="Description"
                value={details?.Description ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <TextField
                label={t("notes")}
                name="Notes"
                value={details?.Notes ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
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
          <div className="content">
            <WorkItems />
          </div>
        </div>
      </div>
    </div>
  );
};
