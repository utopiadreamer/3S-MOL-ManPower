import { FC, useEffect, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";

import { getWorkers } from "../../../shared/mockups/Workers";
import { WorkersGrid } from "./WorkersGrid";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { WorkersRecordDTO } from "../../../shared/models/WorkersRecordDTO";
import { Action, Mode } from "../../../shared/constants/types";
import { GeneralUtil } from "../../../shared/utils/generalUtil";
import { ValidationType } from "../../../shared/constants/constants";
import { ValidationUtil } from "../../../shared/utils/validationUtil";
import { WorkerDTO } from "../../../shared/models/WorkerDTO";
import FilePicker from "../../../shared/components/forms/FilePicker";
import "../styles/WorkersManage.scss";
import { PrimaryButton } from "@fluentui/react";
import { EditableItem } from "../models/EditableItem";
import { Section, SectionSize } from "../../../shared/components/forms/Section";

export interface Props {
  mode: Mode;
}

export const WorkersManage: FC<Props> = (props: Props) => {
  const { t } = useTranslation(["workers", "common"]);
  const [details, setDetails] = useState<WorkersRecordDTO>();
  const [isEditable, setEditable] = useState<boolean>(false);
  const [disableAdd, setDisableAdd] = useState<boolean>(false);
  const [newWorkerMode, setNewWorkerMode] = useState<Mode>(Mode.View);
  const [workers, setWorkers] = useState<WorkerDTO[]>([]);
  const { mode } = props;

  useEffect(() => {
    if (mode === Mode.View) {
      const list = getWorkers();
      setWorkers(list.Workers);
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
      const workerNationalIdValid = ValidationUtil.validate(
        ValidationType.NationalID,
        workerData.NationalID ?? "",
        "",
        t
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
      const workerPhoneNumValid = ValidationUtil.validate(
        ValidationType.MobileNo,
        GeneralUtil.normalizeMobileString(workerData.PhoneNo) ?? "",
        "",
        t
      );

      if (
        workerNameRequired ||
        workerNationalIdRequired ||
        workerNationalIdValid ||
        workerPhoneNumRequired ||
        workerPhoneNumValid ||
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
    // if (validateWorkersData(workersData))
    setWorkers(workersData);
  };

  const addNewWorker = () => {
    setNewWorkerMode(Mode.New);
  };

  useEffect(() => {
    if (newWorkerMode) {
      setNewWorkerMode(Mode.View);
    }
  }, [newWorkerMode]);

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
          </div>
          <div className="content">
              <div className="row">
                <TextField
                  label={t("settleNo")}
                  name="RecordNo"
                  value={details?.RecordNo ?? ""}
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
            {!disableAdd && (
              <div className="import">
                <PrimaryButton
                  className="actionButton editAction"
                  iconProps={{ iconName: "Add" }}
                  text={t("addWorker")}
                  onClick={() => {
                    addNewWorker();
                  }}
                />
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
                mode={newWorkerMode}
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
