/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useRef, useState } from "react";
import "../styles/ClearanceManage.scss";
import { useTranslation } from "react-i18next";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { ClearanceDTO } from "../../../shared/models/ClearanceDTO";
import { Form } from "../../../shared/components/forms/Form";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import {
  RecordType,
  SpecialRequest,
} from "../../../shared/constants/constants";
import { Mode } from "../../../shared/constants/types";
import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import '../styles/ClearanceManage.scss';

export interface Props {
  mode: Mode;
}

export const ClearanceDetails: FC<Props> = (props: Props) => {
  const { t } = useTranslation(["clearances", "common"]);
  const [details, setDetails] = useState<ClearanceDTO>();
  const [request, setRequest] = useState<string>("");
  const { mode } = props;

  const form = useRef(new Form({}));
  const [isFormValid, setIsFormValid] = useState<boolean>(form.current.isValid);
  form.current.onValidityChanged = (isValid) => setIsFormValid(isValid);

  const settlementType = [
    {
      key: RecordType.Current,
      text: t("current"),
    },
    {
      key: RecordType.Final,
      text: t("final"),
    },
  ];

  const requests: IChoiceGroupOption[] = [
    {
      key: SpecialRequest.Discount,
      text: t("discount"),
    },
    {
      key: SpecialRequest.Exemption,
      text: t("exemption"),
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

  return (
    <div className="clearanceManage">
      <div className="body">
        <div className="section">
          <div className="content">
          <Section
            size={SectionSize.h2}
            title={t("clearanceInfo")}
            iconName="ActivateOrders"
          />
            <div className="row">
              <TextField
                label={t("contractNo")}
                name="ContractNo"
                value={details?.ContractNo ?? ""}
                readOnly
              />
              <TextField
                label={t("settleNo")}
                name="SettelmentNo"
                value={details?.SettelmentNo ?? ""}
                readOnly
              />
              <TextField
                label={t("status")}
                name="Status"
                value={details?.Status ?? ""}
                readOnly
              />
              <Dropdown
                label={t("recordType")}
                name="RecordType"
                options={settlementType}
                selectedKey={details?.RecordType ?? ""}
                onValidationChange={SetValidity}
                required
              />
            </div>
            <div className="row">
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
              <div className="request">
                <ChoiceGroup
                  selectedKey={request}
                  options={requests}
                  onChange={(_, option) => {
                    setRequest(option?.key ?? "");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
