import { FC, useRef, useState } from "react";
import "../styles/ContractDetails.scss";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { DatePicker } from "../../../shared/components/forms/CustomDatePicker";
import {
  ValidationType,
} from "../../../shared/constants/constants";
import { Panel } from "../../../shared/components/forms/Panel";
import {
  DefaultButton,
  PrimaryButton,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { Form } from "../../../shared/components/forms/Form";

export const ContractManage: FC = () => {
  const [formData, setFormData] = useState<any>({});
  const { t } = useTranslation(["contracts", "common"]);
  const [isEditable, setEditable] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isCanceling, setIsCanceling] = useState<boolean>(false);

  const form = useRef(new Form({}));
  const [isFormValid, setIsFormValid] = useState<boolean>(form.current.isValid);
  form.current.onValidityChanged = (isValid) => setIsFormValid(isValid);

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

  const onFormSave = () => {
    if (form.current.isValid) {
      alert("saved");
    }
  };

  const SetValidity = (name: string, isValid: boolean) => {
    form.current.SetValidity(name, isValid);
  };

  return (
    <LayoutContent>
      <Panel
        title={t("contractDetails")}
        allowEdition
        editable={isEditable}
        editText={t("common:edit")}
        onChangeEdit={onFormEdit}
        footer={
          <div className="btnSaveCode">
            <DefaultButton
              text={t("common:cancel")}
              onClick={onFormCanceled}
              disabled={isCanceling}
            >
              {isCanceling && <Spinner size={SpinnerSize.small} />}{" "}
            </DefaultButton>
            <PrimaryButton
              text={t("common:save")}
              onClick={onFormSave}
              disabled={!isFormValid}
            >
              {isSaving && <Spinner size={SpinnerSize.small} />}
            </PrimaryButton>
          </div>
        }
      >
        <div className="contractDetails card">
          <div className="body">
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
              <TextField
                label={t("commRegistrationNo")}
                name="commRegistrationNo"
                value={formData?.commRegistrationNo ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                required
              />
            </div>
            <div className="row">
              <TextField
                label={t("taxNumber")}
                name="taxNumber"
                value={formData?.taxNumber ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                required
              />
              <TextField
                label={t("institutionalCode")}
                name="institutionalCode"
                value={formData?.institutionalCode ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                required
              />
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
              <TextField
                label={t("insuranceNumber")}
                name="insuranceNumber"
                value={formData?.insuranceNumber ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                required
              />
            </div>
            <div className="row g-112">
              <TextField
                label={t("agentName")}
                name="agentName"
                value={formData?.agentName ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
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
      </Panel>
    </LayoutContent>
  );
};
