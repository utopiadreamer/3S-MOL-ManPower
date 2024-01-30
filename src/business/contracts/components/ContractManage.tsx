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
import { Action, Mode } from "../../../shared/constants/types";
import clsx from "clsx";
import { ConfirmAction } from "../../../shared/components/business/ConfirmAction";
import { SettlementsGrid } from "../../settlements/components/SettlementsGrid";
import { SettlementDTO } from "../../../shared/models/SettlementDTO";
import { getSettlements } from "../../../shared/mockups/Settlements";
import { WorkerRecordsGrid } from "../../workers/components/WorkerRecordsGrid";
import { getWorkersRecords } from "../../../shared/mockups/WorkersRecord";
import { WorkersRecordDTO } from "../../../shared/models/WorkersRecordDTO";
import { AuthUtil } from "../../../shared/utils/authUtil";
import { Claim } from "../../../shared/constants/auth";
import { FileSelector } from "../../../shared/components/forms/FileSelector";

export interface Props {
  mode: Mode;
  onValidate?: (valid: boolean) => void;
}

export const ContractManage: FC<Props> = (props: Props) => {
  const { mode, onValidate } = props;
  const { id } = useParams();
  const { t } = useTranslation(["contracts", "common"]);
  const [details, setDetails] = useState<ContractDTO>();
  const [assignEstDetails, setAssignEstDetails] = useState<EstablishmentDTO>();
  const [execEstDetails, setEexcEstDetails] = useState<EstablishmentDTO>();
  const [settlements, setSettlements] = useState<SettlementDTO[]>([]);
  const [workersRecords, setWorkersRecords] = useState<WorkersRecordDTO[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(mode !== Mode.View);
  const [assignEditMode, setAssignEditMode] = useState<Mode>(mode);
  const [execEditMode, setExecEditMode] = useState<Mode>(mode);
  const [showAssignEstSearch, setShowAssignEstSearch] =
    useState<boolean>(false);
  const [showExecEstSearch, setShowExecEstSearch] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<Mode>(mode ?? "");

  const form = useRef(new Form({}));
  const [, setIsFormValid] = useState<boolean>(form.current.isValid);
  form.current.onValidityChanged = (isValid) => setIsFormValid(isValid);

  useEffect(() => {
    setCurrentMode(mode);
    setIsEditable(mode !== Mode.View);
  }, [mode]);

  useEffect(() => {
    if (id) {
      const contracts = getContracts();
      const contract = contracts.filter((i) => i.ID === id)[0];
      setAssignEstDetails(contract?.AssignEstablishment);
      setEexcEstDetails(contract?.ExecEstablishment);
      setDetails(contract);

      const settles = getSettlements().filter((i) => i.ContractNo === id);
      setSettlements(settles);

      const records = getWorkersRecords().filter((i) => i.ContractNo === id);
      setWorkersRecords(records);
    }
  }, [id]);

  useEffect(() => {
    if (onValidate) onValidate(true);
  });

  useEffect(() => {
    if (currentMode === Mode.New) {
      setDetails(new ContractDTO());
      setAssignEstDetails(new EstablishmentDTO());
      setEexcEstDetails(new EstablishmentDTO());
    }
  }, [currentMode]);

  const icon = { icon: "TextDocumentShared" };
  const contractTypes = [
    {
      key: ContractType.Contract,
      text: t("Contract"),
      data: icon,
    },
    {
      key: ContractType.Tender,
      text: t("Tender"),
      data: icon,
    },
    {
      key: ContractType.AssignmentOrder,
      text: t("AssignmentOrder"),
      data: icon,
    },
    {
      key: ContractType.SupplyOrder,
      text: t("SupplyOrder"),
      data: icon,
    },
    {
      key: ContractType.AttributionOrder,
      text: t("AttributionOrder"),
      data: icon,
    },
    {
      key: ContractType.License,
      text: t("License"),
      data: icon,
    },
    {
      key: ContractType.RepairOrder,
      text: t("RepairOrder"),
      data: icon,
    },
    {
      key: ContractType.PurchaseOrder,
      text: t("PurchaseOrder"),
      data: icon,
    },
    {
      key: ContractType.Other,
      text: t("Other"),
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
    // const saveAction = {
    //   key: "save",
    //   className: clsx("actionButton", "primeAction"),
    //   text: t("common:save"),
    //   iconProps: { iconName: "Save" },
    //   onClick: () => {
    //     setEditable(false);
    //   },
    // };
    const primeAction = {
      key: "delete",
      className: clsx("actionButton", "primeAction"),
      text: t("common:delete"),
      iconProps: { iconName: "Delete" },
      onClick: () => {
        setShowDeleteDialog(true);
      },
    };
    // const subAction = {
    //   key: "edit",
    //   className: clsx(
    //     "actionButton",
    //     isEditable ? "subAction" : "subAction"
    //   ),
    //   text: t(isEditable ? "common:cancel" : "common:edit"),
    //   iconProps: { iconName: isEditable ? "Cancel" : "Edit" },
    //   onClick: () => {
    //     if (isEditable) setEditable(false);
    //     else {
    //       setEditable(true);
    //     }
    //   },
    // };
    const arr = [];
    // if (AuthUtil.hasPermission(Claim.EditContract)) arr.push(subAction);
    // if (isEditable) {
    //   arr.splice(0, 0, saveAction);
    // } else
    if (
      currentMode === Mode.Edit &&
      AuthUtil.hasPermission(Claim.DeleteContract)
    ) {
      arr.push(primeAction);
    }
    return arr;
  };

  return (
    <div className="contractManage">
      <div className="body">
        <div className="section">
          <div className="content">
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
            <div className="row">
              {currentMode !== Mode.New && (
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
          <div className="content">
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
              {currentMode !== Mode.View && (
                <CommandBar
                  items={[]}
                  farItems={[
                    {
                      key: "new",
                      className: "actionButton subAction",
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
                      className: "actionButton primeAction",
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
            <EstablishmentManage
              mode={assignEditMode}
              id={assignEstDetails?.ID}
            />
          </div>
        </div>
        <div className="section">
          <div className="content">
            <div className="flex justify-Between">
              <div className="searchTitle">
                <Section
                  size={SectionSize.h2}
                  title={t("execEstInfo")}
                  iconName="CityNext"
                />
                {showExecEstSearch && (
                  <EstablishmentsSearch
                    onSearch={(est?: EstablishmentDTO) =>
                      setEexcEstDetails(est)
                    }
                  />
                )}
              </div>
              {currentMode !== Mode.View && (
                <CommandBar
                  items={[]}
                  farItems={[
                    {
                      key: "new",
                      className: "actionButton subAction",
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
                      className: "actionButton primeAction",
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
            <EstablishmentManage mode={execEditMode} id={execEstDetails?.ID} />
          </div>
        </div>

        <div className="section">
          <div className="content">
            <Section
              size={SectionSize.h2}
              title={t("workInfo")}
              iconName="WorkItem"
            />
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
          <div className="content">
            <Section
              size={SectionSize.h2}
              title={t("financialInfo")}
              iconName="Money"
            />
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
          <div className="content">
            <Section
              size={SectionSize.h2}
              title={t("otherInfo")}
              iconName="EditNote"
            />
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
        {currentMode !== Mode.View && (
          <div className="section">
            <div className="content">
              <Section
                size={SectionSize.h2}
                title={t("common:attachments")}
                iconName="EditNote"
              />
              <div className="row">
                <FileSelector
                  title={t("common:attachments")}
                  labels={{
                    selectFile: t("common:BrowseFile"),
                    chooseAnotherFile: t("common:ChooseAnother"),
                    unSelectFile: t("common:UnSelect"),
                    viewFile: t("common:view"),
                  }}
                  extensionFilter=".jpg"
                />
              </div>
            </div>
          </div>
        )}
        {currentMode === Mode.View && (
          <div className="section">
            <Section
              size={SectionSize.h2}
              title={t("settlements")}
              iconName="EditNote"
            />
            <div className="content">
              <SettlementsGrid
                items={settlements}
                onChanged={() => {
                  return false;
                }}
                onNbItemPerPageChanged={() => {
                  return false;
                }}
              />
            </div>
          </div>
        )}
        {currentMode === Mode.View && (
          <div className="section">
            <Section
              size={SectionSize.h2}
              title={t("workersRecords")}
              iconName="FabricUserFolder"
            />
            <div className="content">
              <WorkerRecordsGrid
                items={workersRecords}
                onChanged={() => {
                  return false;
                }}
                onNbItemPerPageChanged={() => {
                  return false;
                }}
              />
            </div>
          </div>
        )}
      </div>
      {showDeleteDialog && (
        <ConfirmAction
          action={Action.Delete}
          hidden={!showDeleteDialog}
          onCancel={() => {
            setShowDeleteDialog(false);
          }}
          name={details?.Name}
          type={t("type")}
          onConfirm={() => {
            setShowDeleteDialog(false);
          }}
        />
      )}
    </div>
  );
};
