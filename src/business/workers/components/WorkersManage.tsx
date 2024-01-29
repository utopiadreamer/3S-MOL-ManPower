/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";

import { WorkersGrid } from "./WorkersGrid";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { WorkersRecordDTO } from "../../../shared/models/WorkersRecordDTO";
import { Mode } from "../../../shared/constants/types";
import { GeneralUtil } from "../../../shared/utils/generalUtil";
import { ValidationType } from "../../../shared/constants/types";
import { ValidationUtil } from "../../../shared/utils/validationUtil";
import { WorkerDTO } from "../../../shared/models/WorkerDTO";
import FilePicker from "../../../shared/components/forms/FilePicker";
import "../styles/WorkersManage.scss";
import { CommandBar } from "@fluentui/react";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { getWorkers } from "../../../shared/mockups/Workers";

export interface Props {
  mode: Mode;
}

export const WorkersManage: FC<Props> = (props: Props) => {
  const { t } = useTranslation(["workers", "common"]);
  const [details, setDetails] = useState<WorkersRecordDTO>();
  const [isEditable, setEditable] = useState<boolean>(false);
  const [disableAdd, setDisableAdd] = useState<boolean>(true);
  const [newWorkerMode, setNewWorkerMode] = useState<Mode>(Mode.View);
  const [workers, setWorkers] = useState<WorkerDTO[]>([]);
  const { mode } = props;
  const { id } = useParams();

  useEffect(() => {
    if (mode === Mode.View) {
      const list = getWorkers();
      setWorkers(list);
    }
  }, [mode]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDetails((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateWorkersData = (workersData: WorkerDTO[]): boolean => {
    // const errorList: [] = [];

    for (let i = 0; i < workersData.length; i++) {
      const workerData = workersData[i];
      const workerNameRequired = ValidationUtil.validate(
        ValidationType.Required,
        workerData.Name ?? "",
        "",
        t
      );
      const workerNationalIdRequired = ValidationUtil.validate(
        ValidationType.Required,
        workerData.NationalID ?? "",
        "",
        t
      );
      const workerNationalIdValid = ValidationUtil.isValidNationalID(
        workerData.NationalID ?? ""
      );
      const workerProfessionRequired = ValidationUtil.validate(
        ValidationType.Required,
        workerData.Occupation ?? "",
        "",
        t
      );
      const workerPhoneNumRequired = ValidationUtil.validate(
        ValidationType.Required,
        workerData.PhoneNo ?? "",
        "",
        t
      );
      const workerPhoneNumValid = ValidationUtil.isValidMobileNo(
        workerData.PhoneNo ?? ""
      );

      if (
        workerNameRequired ||
        workerNationalIdRequired ||
        workerNationalIdValid === false ||
        workerPhoneNumRequired ||
        workerPhoneNumValid === false ||
        workerProfessionRequired
      ) {
        return false;
      }
    }
    return true;
  };

  const processImportedFile = (data: WorkerDTO[]) => {
    const mapConfig = {
      Name: GeneralUtil.normalizeString(t("workerName")),
      NationalID: GeneralUtil.normalizeString(t("nationalID")),
      Occupation: GeneralUtil.normalizeString(t("occupation")),
      Address: GeneralUtil.normalizeString(t("address")),
      PhoneNo: GeneralUtil.normalizeString(t("phoneNo")),
    };
    const workersData: WorkerDTO[] = GeneralUtil.mapJsonDataToObj<WorkerDTO>(
      data,
      mapConfig
    );

    for (let index = 0; index < workersData.length; index++) {
      workersData[index].ID = index.toString();
    }
    if (validateWorkersData(workersData)) setWorkers(workersData);
  };

  useEffect(() => {
    if (newWorkerMode) {
      setNewWorkerMode(newWorkerMode);
    }
  }, [newWorkerMode]);

  const getActions = () => {
    const saveAction = {
      key: "save",
      className: clsx("actionButton", "primeAction"),
      text: t("common:save"),
      iconProps: { iconName: "Save" },
      onClick: () => {
        setEditable(false);
        setDisableAdd(false);
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
          setDisableAdd(!disableAdd);
          setEditable(!isEditable);
          setNewWorkerMode(Mode.Edit);
        },
      },
    ];
    if (isEditable) arr.splice(0, 0, saveAction);
    return arr;
  };

  return (
    <div className="workersManage panel">
      <div className="body">
        <div className="section">
          <div className="actionsHeader">
            <Section
              size={SectionSize.h2}
              title={t("workersRecordInfo")}
              iconName="ReminderPerson"
            />
            {id !== undefined && mode === Mode.Edit && (
              <CommandBar items={[]} farItems={getActions()} />
            )}
          </div>
          <div className="content">
            <div className="row">
              <TextField
                label={t("settleNo")}
                name="RecordNo"
                value={details?.SettlementNo ?? ""}
                readOnly
              />
              <TextField
                label={t("recordNumber")}
                name="RecordNo"
                value={details?.RecordNo ?? ""}
                readOnly
              />
              <TextField
                label={t("notes")}
                name="Notes"
                value={details?.Notes ?? ""}
                onChange={handleInputChange}
                readOnly={!isEditable && mode === Mode.View}
              />
            </div>
          </div>
        </div>
        <div className="section">
          <div className="actionsHeader">
            <Section
              size={SectionSize.h2}
              title={t("workersInfo")}
              iconName="ReminderPerson"
            />
            {mode !== Mode.View && (
              <div className="import">
                {/* <PrimaryButton
                  className="actionButton subAction"
                  iconProps={{ iconName: "Add" }}
                  text={t("addWorker")}
                  onClick={() => {
                    addNewWorker();
                  }}
                /> */}
                <FilePicker
                  name="ImportWorkersSheet"
                  label={t("importWorkersSheet")}
                  handleImportedFile={(data: any[]) => {
                    processImportedFile(data);
                  }}
                />
              </div>
            )}
          </div>
          <div className="content">
            <div className="row g-1">
              <WorkersGrid
                mode={Mode.View}
                items={workers}
                onChanged={() => {
                  return false;
                }}
                onNbItemPerPageChanged={() => {
                  return false;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
