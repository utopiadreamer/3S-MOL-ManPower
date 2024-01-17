import { FC, useEffect, useRef, useState } from "react";
import "../styles/ContractManage.scss";
import {
  InputType,
  TextField,
} from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../../../shared/components/forms/CustomDatePicker";
import { ContractType } from "../../../shared/constants/constants";
import { CommandBar, IDropdownOption } from "@fluentui/react";
import { Form } from "../../../shared/components/forms/Form";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { EstablishmentManage } from "../../establishments/components/EstablishmentManage";
import { EstablishmentsSearch } from "../../establishments/components/EstablishmentsSearch";
import { useParams } from "react-router-dom";
import { getContracts } from "../../../shared/mockups/Contracts";
import { ContractDTO } from "../../../shared/models/ContractDTO";
import { EstablishmentDTO } from "../../../shared/models/EstablishmentDTO";
import { Mode } from "../../../shared/constants/types";
import clsx from "clsx";

export interface Props {
  mode: Mode;
  onValidate?: (valid: boolean) => void;
}

export const ContractManage: FC<Props> = (props: Props) => {
  const { mode, onValidate } = props;
  const { id } = useParams();
  const [details, setDetails] = useState<ContractDTO>();
  const [assignEstDetails, setAssignEstDetails] = useState<EstablishmentDTO>();
  const [execEstDetails, setEexcEstDetails] = useState<EstablishmentDTO>();
  const { t } = useTranslation(["contracts", "common"]);
  const [isEditable, setEditable] = useState<boolean>(mode !== Mode.View);
  const [assignEditMode, setAssignEditMode] = useState<Mode>(mode);
  const [execEditMode, setExecEditMode] = useState<Mode>(mode);
  const [showAssignEstSearch, setShowAssignEstSearch] =
    useState<boolean>(false);
  const [showExecEstSearch, setShowExecEstSearch] = useState<boolean>(false);

  const form = useRef(new Form({}));
  const [isFormValid, setIsFormValid] = useState<boolean>(form.current.isValid);
  form.current.onValidityChanged = (isValid) => setIsFormValid(isValid);

  useEffect(() => {
    if (id) {
      const contracts = getContracts();
      const contract = contracts.filter((i) => i.ID === id)[0];
      setAssignEstDetails(contract.AssignEstablishment);
      setEexcEstDetails(contract.ExecEstablishment);
      setDetails(contract);
    }
  }, [id]);

  useEffect(() => {
    if (onValidate) onValidate(true);
  });

  const icon = { icon: "TextDocumentShared" };
  const contractTypes = [
    {
      key: ContractType.Contract,
      text: t("contract"),
      data: icon,
    },
    {
      key: ContractType.Tender,
      text: t("tender"),
      data: icon,
    },
    {
      key: ContractType.AssignmentOrder,
      text: t("assignmentOrder"),
      data: icon,
    },
    {
      key: ContractType.SupplyOrder,
      text: t("supplyOrder"),
      data: icon,
    },
    {
      key: ContractType.AttributionOrder,
      text: t("attributionOrder"),
      data: icon,
    },
    {
      key: ContractType.License,
      text: t("license"),
      data: icon,
    },
    {
      key: ContractType.RepairOrder,
      text: t("repairOrder"),
      data: icon,
    },
    {
      key: ContractType.PurchaseOrder,
      text: t("purchaseOrder"),
      data: icon,
    },
    {
      key: ContractType.Other,
      text: t("other"),
      data: icon,
    },
  ];

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
      ContractType: option?.key,
    }));
  };

  const handleDateChange = () => {};

  const SetValidity = (name: string, isValid: boolean) => {
    form.current.SetValidity(name, isValid);
  };

  const getActions = () => {
    const saveAction = {
      key: "action",
      className: clsx("actionButton", "newAction"),
      text: t("common:save"),
      iconProps: { iconName: "Save" },
      onClick: () => {
        setEditable(false);
      },
    };
    const arr = [
      {
        key: "action",
        className: clsx(
          "actionButton",
          isEditable ? "cancelAction" : "editAction"
        ),
        text: t(isEditable ? "common:cancel" : "common:edit"),
        iconProps: { iconName: isEditable ? "Cancel" : "Edit" },
        onClick: () => {
          if (isEditable) setEditable(false);
          else {
            setEditable(true);
          }
        },
      },
    ];
    if (isEditable) arr.splice(0, 0, saveAction);
    return arr;
  };

  return (
    <div className="contractManage panel">
      <div className="body">
        <div className="section">
          <div className="actionsHeader">
            <Section
              size={SectionSize.h2}
              title={t("contractInfo")}
              iconName="ActivateOrders"
            />
            {id !== undefined && (
              <CommandBar items={[]} farItems={getActions()} />
            )}
          </div>
          <div className="content">
            <div className="row">
              {mode !== Mode.New && (
                <TextField
                  label={t("contractNo")}
                  name="ContractNo"
                  value={details?.ContractNo ?? ""}
                  onChange={handleInputChange}
                  readOnly={!isEditable}
                  onValidationChange={SetValidity}
                  maxLength={8}
                  required
                />
              )}
              <TextField
                label={t("name")}
                name="Name"
                value={details?.Name ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                required
              />
              <Dropdown
                label={t("contractType")}
                options={contractTypes}
                selectedKey={details?.ContractType ?? ""}
                onChange={onTypeChange}
                onValidationChange={SetValidity}
                readOnly={!isEditable}
                required
              />
              <TextField
                label={t("refContractNo")}
                name="ReferenceContrctNo"
                value={details?.ReferenceContrctNo ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                maxLength={100}
              />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="flex justify-Between">
            <div className="searchTitle">
              <Section
                size={SectionSize.h2}
                title={t("assignEstInfo")}
                iconName="CityNext2"
              />
              {showAssignEstSearch && (
                <EstablishmentsSearch
                  onSearch={(est?: EstablishmentDTO) =>
                    setAssignEstDetails(est)
                  }
                />
              )}
            </div>
            {mode !== Mode.View && (
              <CommandBar
                items={[]}
                farItems={[
                  {
                    key: "new",
                    className: "actionButton editAction",
                    text: t("common:new"),
                    iconProps: { iconName: "Add" },
                    onClick: () => {
                      setAssignEstDetails(new EstablishmentDTO());
                      setAssignEditMode(Mode.New);
                      setShowAssignEstSearch(false);
                    },
                  },
                  {
                    key: "search",
                    className: "actionButton newAction",
                    text: t("common:search"),
                    iconProps: { iconName: "Search" },
                    onClick: () => {
                      setAssignEditMode(Mode.View);
                      setShowAssignEstSearch(!showAssignEstSearch);
                    },
                  },
                ]}
              />
            )}
          </div>

          <div className="content">
            <EstablishmentManage
              mode={assignEditMode}
              id={assignEstDetails?.ID}
            />
          </div>
        </div>
        <div className="section">
          <div className="flex justify-Between">
            <div className="searchTitle">
              <Section
                size={SectionSize.h2}
                title={t("execEstInfo")}
                iconName="CityNext"
              />
              {showExecEstSearch && (
                <EstablishmentsSearch
                  onSearch={(est?: EstablishmentDTO) => setEexcEstDetails(est)}
                />
              )}
            </div>
            {mode !== Mode.View && (
              <CommandBar
                items={[]}
                farItems={[
                  {
                    key: "new",
                    className: "actionButton editAction",
                    text: t("common:new"),
                    iconProps: { iconName: "Add" },
                    onClick: () => {
                      setEexcEstDetails(new EstablishmentDTO());
                      setExecEditMode(Mode.New);
                      setShowExecEstSearch(false);
                    },
                  },
                  {
                    key: "search",
                    className: "actionButton newAction",
                    text: t("common:search"),
                    iconProps: { iconName: "Search" },
                    onClick: () => {
                      setShowExecEstSearch(!showExecEstSearch);
                      setExecEditMode(Mode.View);
                    },
                  },
                ]}
              />
            )}
          </div>
          <div className="content">
            <EstablishmentManage mode={execEditMode} id={execEstDetails?.ID} />
          </div>
        </div>

        <div className="section">
          <Section
            size={SectionSize.h2}
            title={t("workInfo")}
            iconName="WorkItem"
          />
          <div className="content">
            <div className="row">
              <TextField
                label={t("scopeOfWork")}
                name="scopeOfWork"
                value={details?.ScopeOfWork ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                required
              />
              <TextField
                label={t("worksDescription")}
                name="worksDescription"
                value={details?.Description ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                required
              />
              <DatePicker
                label={t("contractStartDate")}
                value={details?.ContractStartDate}
                onChange={handleDateChange}
                disabled={!isEditable}
                isRequired
              />
              <DatePicker
                label={t("contractStartDate")}
                value={details?.ContractEndDate}
                onChange={handleDateChange}
                disabled={!isEditable}
                isRequired
              />
            </div>
          </div>
        </div>

        <div className="section">
          <Section
            size={SectionSize.h2}
            title={t("financialInfo")}
            iconName="Money"
          />
          <div className="content">
            <div className="row">
              <TextField
                label={t("totalAmount")}
                name="totalAmount"
                inputType={InputType.DecimalNumber}
                value={details?.TotalAmount?.toString() ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                maxLength={12}
                required
              />
              <TextField
                label={t("realAmount")}
                name="realAmount"
                inputType={InputType.DecimalNumber}
                value={details?.RealAmount?.toString() ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                maxLength={12}
                required
              />
              <TextField
                label={t("taxRate")}
                name="taxRate"
                inputType={InputType.DecimalNumber}
                value={details?.TaxRate?.toString() ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
                onValidationChange={SetValidity}
                maxLength={2}
                required
                suffix="%"
              />
            </div>
          </div>
        </div>

        <div className="section">
          <Section
            size={SectionSize.h2}
            title={t("otherInfo")}
            iconName="EditNote"
          />
          <div className="content">
            <div className="row">
              <TextField
                label={t("description")}
                name="description"
                value={details?.Description ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
              <TextField
                label={t("notes")}
                name="notes"
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
            title={t("settlements")}
            iconName="EditNote"
          />
          <div className="row">{/* <SettlementsGrid /> */}</div>
        </div>
      </div>
    </div>
  );
};
