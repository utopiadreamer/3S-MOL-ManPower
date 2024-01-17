import { FC, useEffect, useRef, useState } from "react";
import "../styles/EstablishmentDetails.scss";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import {
  EstablishmentType,
  ValidationType,
} from "../../../shared/constants/constants";
import { IDropdownOption } from "@fluentui/react";
import { Form } from "../../../shared/components/forms/Form";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { FileSelector } from "../../../shared/components/forms/FileSelector";
import { getEstablishments } from "../../../shared/mockups/Establishments";
import { EstablishmentDTO } from "../../../shared/models/EstablishmentDTO";
import { Mode } from "../../../shared/constants/types";

export interface Props {
  mode: Mode;
  id?: string;
}

export const EstablishmentManage: FC<Props> = (props: Props) => {

  const { mode, id } = props;
  const [details, setDetails] = useState<EstablishmentDTO>();
  const { t } = useTranslation(["establishments", "common"]);
  const [isEditable, setEditable] = useState<boolean>(mode !== Mode.View);
  const [] = useState<boolean>(false);

  const form = useRef(new Form({}));
  const [isFormValid, setIsFormValid] = useState<boolean>(form.current.isValid);
  form.current.onValidityChanged = (isValid) => setIsFormValid(isValid);

  const types = [
    {
      key: EstablishmentType.Person,
      text: t("person"),
      data: { icon: 'ReminderPerson' }
    },
    {
      key: EstablishmentType.Company,
      text: t("company"),
      data: { icon: 'CityNext2' }
    },
    {
      key: EstablishmentType.Government,
      text: t("government"),
      data: { icon: 'CityNext' }
    },
  ];

  useEffect(() => {
    setEditable(mode !== Mode.View ?? false);
  }, [mode]);
  
  useEffect(() => {
    let list = getEstablishments();
    const est = list.filter((i) => i.ID === id)[0];
    setDetails(est);
  }, [id]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDetails((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onTypeChange = (e: any, option?: IDropdownOption) => {
    setDetails((prevData: any) => ({
      ...prevData,
      Type: option?.key?.toString(),
    }));
  };

  const SetValidity = (name: string, isValid: boolean) => {
    form.current.SetValidity(name, isValid);
  };

  return (
    <div className="establishmentDetails">
      <div className="body">
        <div className="row">
          <TextField
            label={t("id")}
            name="ID"
            value={details?.ID ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
          <Dropdown
            label={t("establishmentType")}
            name="Type"
            options={types}
            selectedKey={details?.Type ?? ""}
            onChange={onTypeChange}
            onValidationChange={SetValidity}
            readOnly={!isEditable}
            required
          />
          <TextField
            label={t("name")}
            name="Name"
            value={details?.Name ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
          {details?.Type === EstablishmentType.Company && (
            <>
              <TextField
                label={t("commRegistrationNo")}
                name="CommRegistrationNo"
                value={details?.CommRegistrationNo ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                required
              />
              <TextField
                label={t("taxNumber")}
                name="TaxNumber"
                value={details?.TaxNumber ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                required
              />
            </>
          )}
          {details?.Type === EstablishmentType.Government && (
            <TextField
              label={t("institutionalCode")}
              name="InstitutionalCode"
              value={details?.InstitutionalCode ?? ""}
              onChange={handleInputChange}
              readOnly={!isEditable}
              onValidationChange={SetValidity}
              required
            />
          )}
          {details?.Type === EstablishmentType.Person && (
            <TextField
              label={t("nationalID")}
              name="NationalID"
              maxLength={14}
              value={details?.NationalID ?? ""}
              onChange={handleInputChange}
              validations={[ValidationType.NationalID]}
              readOnly={!isEditable}
              onValidationChange={SetValidity}
              required
            />
          )}
          <TextField
            label={t("insuranceNumber")}
            name="InsuranceNumber"
            value={details?.InsuranceNumber ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
          {details?.Type === EstablishmentType.Company && (
            <TextField
              label={t("agentName")}
              name="AgentName"
              value={details?.AgentName ?? ""}
              onChange={handleInputChange}
              readOnly={!isEditable}
            />
          )}
          <TextField
            label={t("phoneNumber")}
            name="PhoneNo"
            value={details?.PhoneNo ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            maxLength={11}
            validations={[ValidationType.MobileNo]}
            onValidationChange={SetValidity}
            required
          />
          <TextField
            label={t("address")}
            name="Address"
            value={details?.Address ?? ""}
            onChange={handleInputChange}
            readOnly={!isEditable}
            onValidationChange={SetValidity}
            required
          />
          {mode !== Mode.View && details?.Type === EstablishmentType.Company && (
            <>
              <FileSelector
                title={t("taxCardImage")}
                labels={{
                  selectFile: t("common:BrowseFile"),
                  chooseAnotherFile: t("common:ChooseAnother"),
                  unSelectFile: t("common:UnSelect"),
                  viewFile: t("common:view"),
                }}
                extensionFilter=".jpg"
              />
              <FileSelector
                title={t("commRegistrationImage")}
                labels={{
                  selectFile: t("common:BrowseFile"),
                  chooseAnotherFile: t("common:ChooseAnother"),
                  unSelectFile: t("common:UnSelect"),
                  viewFile: t("common:view"),
                }}
                extensionFilter=".jpg"
              />
            </>
          )}
          {mode !== Mode.View && details?.Type === EstablishmentType.Person && (
            <>
              <FileSelector
                title={t("nationalIDImage")}
                labels={{
                  selectFile: t("common:BrowseFile"),
                  chooseAnotherFile: t("common:ChooseAnother"),
                  unSelectFile: t("common:UnSelect"),
                  viewFile: t("common:view"),
                }}
                extensionFilter=".jpg"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
