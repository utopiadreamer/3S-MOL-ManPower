import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { WorkerDTO } from "../../../shared/models/WorkerDTO";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { ContractsGrid } from "../../contracts/components/ContractsGrid";
import { ContractDTO } from "../../../shared/models/ContractDTO";
import { CommandBar } from "@fluentui/react";
import clsx from "clsx";
import { ConfirmAction } from "../../../shared/components/business/ConfirmAction";
import { getContracts } from "../../../shared/mockups/Contracts";
import { getWorkers } from "../../../shared/mockups/Workers";
import { AuthUtil } from "../../../shared/utils/authUtil";
import { Claim } from "../../../shared/constants/auth";
import { Action } from "../../../shared/constants/types";

export const WorkerDetails: FC = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<WorkerDTO>();
  const [contracts, setContracts] = useState<ContractDTO[]>([]);
  const [isEditable, setEditable] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const { t } = useTranslation("workers");

  useEffect(() => {
    const list = getWorkers().filter((i) => i.ID === id);
    if (list && list.length > 0) {
      const worker = list[0];
      setDetails(worker);
      const contractNo = worker.WorkersRecordNo;
      const contractsList = getContracts().filter(
        (i) => i.ContractNo === contractNo
      );
      setContracts(contractsList);
    }
  }, [id]);

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
    const deleteAction = {
      key: "delete",
      className: clsx("actionButton", "deleteAction"),
      text: t("common:delete"),
      iconProps: { iconName: "Delete" },
      onClick: () => {
        setShowDeleteDialog(true);
      },
    };
    const subAction = {
      key: "edit",
      className: clsx(
        "actionButton",
        isEditable ? "subAction" : "subAction"
      ),
      text: t(isEditable ? "common:cancel" : "common:edit"),
      iconProps: { iconName: isEditable ? "Cancel" : "Edit" },
      onClick: () => {
        if (isEditable) setEditable(false);
        else {
          setEditable(true);
        }
      },
    };

    const arr = [];
    if (AuthUtil.hasPermission(Claim.EditWorker)) arr.push(subAction);
    if (isEditable) {
      arr.splice(0, 0, saveAction);
    } else if (AuthUtil.hasPermission(Claim.DeleteWorkersRecord)) { arr.push(deleteAction); }
    return arr;
  };

  return (
    <LayoutContent>
      <div className="workerDetails panel">
        <div className="body">
          <div className="section">
            <div className="content">
            <div className="actionsHeader">
              <Section
                title={t("workerDetails")}
                size={SectionSize.h2}
                iconName="FabricUserFolder"
              />
              <CommandBar items={[]} farItems={getActions()} />
            </div>
              <div className="row">
                <TextField
                  readOnly={!isEditable}
                  label={t("workerName")}
                  value={details?.Name ?? ""}
                />
                <TextField
                  readOnly={!isEditable}
                  label={t("nationalID")}
                  value={t(details?.NationalID ?? "")}
                />
                <TextField
                  readOnly={!isEditable}
                  label={t("occupation")}
                  value={details?.Occupation ?? ""}
                />
                <TextField
                  readOnly={!isEditable}
                  label={t("phoneNo")}
                  value={details?.PhoneNo ?? ""}
                />
                <TextField
                  readOnly={!isEditable}
                  label={t("address")}
                  value={details?.Address ?? ""}
                />
                <TextField
                  readOnly={!isEditable}
                  label={t("email")}
                  value={details?.Email ?? ""}
                />
              </div>
            </div>
          </div>
          <div className="section">
            <div className="content">
            <div className="actionsHeader">
              <Section
                title={t("contractDetails")}
                size={SectionSize.h2}
                iconName="ActivateOrders"
              />
            </div>
              <ContractsGrid
                items={contracts}
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
    </LayoutContent>
  );
};
