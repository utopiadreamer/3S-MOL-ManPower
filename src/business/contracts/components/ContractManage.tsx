import { FC, useRef, useState } from "react";
import "../styles/ContractDetails.scss";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../../../shared/components/forms/CustomDatePicker";
import { ContractType } from "../../../shared/constants/constants";
import { IDropdownOption } from "@fluentui/react";
import { Form } from "../../../shared/components/forms/Form";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { EstablishmentManage } from "../../establishments/components/EstablishmentManage";

export interface Props {
  editMode?: boolean;
}

export const ContractManage: FC<Props> = (props: Props) => {
  const { editMode } = props;
  const [formData, setFormData] = useState<any>({});
  const { t } = useTranslation(["contracts", "common"]);
  const [isEditable, setEditable] = useState<boolean>(editMode ?? false);

  const form = useRef(new Form({}));
  const [isFormValid, setIsFormValid] = useState<boolean>(form.current.isValid);
  form.current.onValidityChanged = (isValid) => setIsFormValid(isValid);

  const contractTypes = [
    {
      key: ContractType.Contract,
      text: t("contract"),
    },
    {
      key: ContractType.Tender,
      text: t("tender"),
    },
    {
      key: ContractType.AssignmentOrder,
      text: t("assignmentOrder"),
    },
    {
      key: ContractType.SupplyOrder,
      text: t("supplyOrder"),
    },
    {
      key: ContractType.AttributionOrder,
      text: t("attributionOrder"),
    },
    {
      key: ContractType.License,
      text: t("license"),
    },
    {
      key: ContractType.RepairOrder,
      text: t("repairOrder"),
    },
    {
      key: ContractType.PurchaseOrder,
      text: t("purchaseOrder"),
    },
    {
      key: ContractType.Other,
      text: t("other"),
    },
  ];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onTypeChange = (e: any, option?: IDropdownOption) => {
    setFormData((prevData: any) => ({
      ...prevData,
      establishmentType: option?.key?.toString(),
    }));
  };

  const handleDateChange = () => {};

  const SetValidity = (name: string, isValid: boolean) => {
    form.current.SetValidity(name, isValid);
  };

  return (
    <div className="contractDetails">
      <div className="body">
        <Section size={SectionSize.h2} title={t("contractInfo")} />
        <div className="row">
          <TextField
            label={t("requestNo")}
            name="requestNo"
            value={formData?.requestNo ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
          <DatePicker
            label={t("requestDate")}
            value={new Date()}
            onChange={handleDateChange}
            disabled={!isEditable}
            isRequired
          />
        </div>
        <Section size={SectionSize.h2} title={t("assignEstInfo")} />
        <div>
          <EstablishmentManage editMode />
        </div>
        <Section size={SectionSize.h2} title={t("execEstInfo")} />
        <div>
          <EstablishmentManage editMode />
        </div>
        <Section size={SectionSize.h2} title={t("assignEstInfo")} />
        <div className="row">
          <TextField
            label={t("recordNumber")}
            name="recordNumber"
            value={formData?.recordNumber ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
          <TextField
            label={t("commRegistrationNo")}
            name="commRegistrationNo"
            value={formData?.commRegistrationNo ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
          />
        </div>
        <Section size={SectionSize.h2} title={t("workInfo")} />
        <div className="row">
          <Dropdown
            label={t("contractType")}
            options={contractTypes}
            selectedKey={formData?.establishmentType ?? ""}
            onChange={onTypeChange}
            onValidationChange={SetValidity}
            readOnly={!isEditable}
            required
          />
          <TextField
            label={t("contractNumber")}
            name="contractNumber"
            value={formData?.contractNumber ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
          <TextField
            label={t("scopeOfWork")}
            name="scopeOfWork"
            value={formData?.scopeOfWork ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
          <TextField
            label={t("worksDescription")}
            name="worksDescription"
            value={formData?.worksDescription ?? ""}
            onChange={handleInputChange}
            multiline
            rows={4}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
        </div>
        <div className="row">
          <DatePicker
            label={t("contractStartDate")}
            value={new Date()}
            onChange={handleDateChange}
            disabled={!isEditable}
            isRequired
          />
          <DatePicker
            label={t("contractStartDate")}
            value={new Date()}
            onChange={handleDateChange}
            disabled={!isEditable}
            isRequired
          />
        </div>
        <Section size={SectionSize.h2} title={t("financialInfo")} />
        <div className="row">
          <TextField
            label={t("totalAmount")}
            name="totalAmount"
            value={formData?.totalAmount ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
          <TextField
            label={t("realAmount")}
            name="realAmount"
            value={formData?.scopeOfWork ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
          <TextField
            label={t("taxRate")}
            name="taxRate"
            value={formData?.taxRate ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
        </div>

        <Section size={SectionSize.h2} title={t("otherInfo")} />
        <div className="row">
          <TextField
            label={t("description")}
            name="description"
            value={formData?.description ?? ""}
            onChange={handleInputChange}
            multiline
            rows={4}
            readOnly={!isEditable}
          />
          <TextField
            label={t("notes")}
            name="notes"
            value={formData?.notes ?? ""}
            onChange={handleInputChange}
            multiline
            rows={4}
            readOnly={!isEditable}
          />
        </div>
      </div>
    </div>
  );
};
