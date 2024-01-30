import { FC, useEffect, useState } from "react";
import "../styles/EstablishmentDetails.scss";
import { useParams } from "react-router-dom";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { getEstablishments } from "../../../shared/mockups/Establishments";
import { EstablishmentDTO } from "../../../shared/models/EstablishmentDTO";
import { EstablishmentType } from "../../../shared/constants/constants";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { ContractsGrid } from "../../contracts/components/ContractsGrid";
import { ContractDTO } from "../../../shared/models/ContractDTO";
import { getContracts } from "../../../shared/mockups/Contracts";
import { CommandBar } from "@fluentui/react";
import clsx from "clsx";
import { ConfirmAction } from "../../../shared/components/business/ConfirmAction";
import { Action } from "../../../shared/constants/types";

export const EstablishmentDetails: FC = () => {
  let params = useParams();
  const [details, setDetails] = useState<EstablishmentDTO>();
  const [contracts, setContracts] = useState<ContractDTO[]>([]);
  const [isEditable, setEditable] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const { t } = useTranslation("establishments");

  useEffect(() => {
    try {
      const list = getEstablishments().filter((i) => i.ID === params.id);
      if (list && list.length > 0) {
        setDetails(list[0]);
        const cont = getContracts().filter(
          (i) =>
            i?.AssignEstablishment?.ID === params.id ||
            i?.ExecEstablishment?.ID === params.id
        );
        setContracts(cont);
      }
    } catch {}
  }, [params.id]);

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
    const primeAction = {
      key: "delete",
      className: clsx("actionButton", "primeAction"),
      text: t("common:delete"),
      iconProps: { iconName: "Delete" },
      onClick: () => {
        setShowDeleteDialog(true);
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
          if (isEditable) setEditable(false);
          else {
            setEditable(true);
          }
        },
      },
    ];
    if (isEditable) {
      arr.splice(0, 0, saveAction);
    } else arr.push(primeAction);
    return arr;
  };

  return (
    <LayoutContent>
      <div className="establishmentDetails panel">
        <div className="body">
          <div className="section">
            <div className="content">
            <div className="actionsHeader">
              <Section
                title={t("establishmentDetails")}
                size={SectionSize.h2}
                iconName="Bank"
              />
              <CommandBar items={[]} farItems={getActions()} />
            </div>
              <div className="row">
                <TextField
                  readOnly={!isEditable}
                  label={t("name")}
                  value={details?.Name ?? ""}
                />
                <TextField
                  readOnly={!isEditable}
                  label={t("establishmentType")}
                  value={t(details?.Type ?? "")}
                />
                {params.type === EstablishmentType.Company && (
                  <>
                    <TextField
                      readOnly={!isEditable}
                      label={t("commRegistrationNo")}
                      value={details?.CommRegistrationNo ?? ""}
                    />
                    <TextField
                      readOnly={!isEditable}
                      label={t("taxNumber")}
                      value={details?.TaxNumber ?? ""}
                    />
                  </>
                )}
                {params.type === EstablishmentType.Government && (
                  <TextField
                    readOnly={!isEditable}
                    label={t("institutionalCode")}
                    value={details?.InstitutionalCode ?? ""}
                  />
                )}
                {params.type === EstablishmentType.Person && (
                  <TextField
                    readOnly={!isEditable}
                    label={t("nationalID")}
                    value={details?.NationalID ?? ""}
                  />
                )}
                <TextField
                  readOnly={!isEditable}
                  label={t("insuranceNumber")}
                  value={details?.InsuranceNumber ?? ""}
                />
                <TextField
                  readOnly={!isEditable}
                  label={t("agentName")}
                  value={details?.AgentName ?? ""}
                />
                <TextField
                  readOnly={!isEditable}
                  label={t("address")}
                  value={details?.Address ?? ""}
                />
                <TextField
                  readOnly={!isEditable}
                  label={t("phoneNumber")}
                  value={details?.PhoneNo ?? ""}
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
