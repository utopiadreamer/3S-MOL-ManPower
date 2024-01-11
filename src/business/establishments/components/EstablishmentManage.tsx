import { FC, useRef, useState } from "react";
import "../styles/EstablishmentDetails.scss";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { DatePicker } from "../../../shared/components/forms/CustomDatePicker";
import {
  EstablishmentType,
  ValidationType,
} from "../../../shared/constants/constants";
import { Panel } from "../../../shared/components/forms/Panel";
import {
  DefaultButton,
  IDropdownOption,
  PrimaryButton,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { Form } from "../../../shared/components/forms/Form";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";

export interface Props {
  editMode?: boolean;
}

export const EstablishmentManage: FC<Props> = (props: Props) => {
  const initData = { establishmentType: EstablishmentType.Person };

  const { editMode } = props;
  const [formData, setFormData] = useState<any>(initData);
  const { t } = useTranslation(["establishments", "common"]);
  const [isEditable, setEditable] = useState<boolean>(editMode ?? false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isCanceling, setIsCanceling] = useState<boolean>(false);

  const form = useRef(new Form({}));
  const [isFormValid, setIsFormValid] = useState<boolean>(form.current.isValid);
  form.current.onValidityChanged = (isValid) => setIsFormValid(isValid);

  const establishmentTypes = [
    {
      key: EstablishmentType.Person,
      text: t("person"),
    },
    {
      key: EstablishmentType.Company,
      text: t("company"),
    },
    {
      key: EstablishmentType.Government,
      text: t("government"),
    },
  ];

  const onFormCanceled = async () => {
    setIsCanceling(true);
    setEditable(false);
    setFormData({});
    setIsFormValid(false);
    setIsCanceling(false);
  };

  const onFormEdit = async () => {
    setEditable(true);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = () => {};

  const onTypeChange = (e: any, option?: IDropdownOption) => {
    setFormData((prevData: any) => ({
      ...prevData,
      establishmentType: option?.key?.toString(),
    }));
  };

  const onFormSave = () => {
    if (form.current.isValid) {
      alert("saved");
    }
  };

  const SetValidity = (name: string, isValid: boolean) => {
    form.current.SetValidity(name, isValid);
  };

  return (
    <div className="establishmentDetails">
      <div className="body">
        <div className="row">
          <Dropdown
            label={t("establishmentType")}
            options={establishmentTypes}
            selectedKey={formData?.establishmentType ?? ""}
            onChange={onTypeChange}
            onValidationChange={SetValidity}
            readOnly={!isEditable}
            required
          />
          <TextField
            label={t("name")}
            name="name"
            value={formData?.name ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
          {formData.establishmentType === EstablishmentType.Company && (
            <>
              <TextField
                label={t("commRegistrationNo")}
                name="commRegistrationNo"
                value={formData?.commRegistrationNo ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                required
              />
              <TextField
                label={t("taxNumber")}
                name="taxNumber"
                value={formData?.taxNumber ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                required
              />
            </>
          )}
          {formData.establishmentType === EstablishmentType.Government && (
            <TextField
              label={t("institutionalCode")}
              name="institutionalCode"
              value={formData?.institutionalCode ?? ""}
              onChange={handleInputChange}
              readOnly={!isEditable}
              onValidationChange={SetValidity}
              required
            />
          )}
          {formData.establishmentType === EstablishmentType.Person && (
            <TextField
              label={t("nationalID")}
              name="nationalID"
              maxLength={14}
              value={formData?.nationalID ?? ""}
              onChange={handleInputChange}
              validations={[ValidationType.NationalID]}
              readOnly={!isEditable}
              onValidationChange={SetValidity}
              required
            />
          )}
          <TextField
            label={t("insuranceNumber")}
            name="insuranceNumber"
            value={formData?.insuranceNumber ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
          {formData.establishmentType === EstablishmentType.Company && (
            <TextField
              label={t("agentName")}
              name="agentName"
              value={formData?.agentName ?? ""}
              onChange={handleInputChange}
              readOnly={!isEditable}
            />
          )}
          <TextField
            label={t("phoneNumber")}
            name="phoneNumber"
            value={formData?.phoneNumber ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            maxLength={11}
            validations={[ValidationType.MobileNo]}
            onValidationChange={SetValidity}
            required
          />
          <TextField
            label={t("address")}
            name="address"
            value={formData?.address ?? ""}
            onChange={handleInputChange}
            multiline
            rows={4}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
        </div>
      </div>
    </div>
  );
};
