import { FC, useEffect, useRef, useState } from "react";
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
import { Form } from "../../../shared/components/forms/Form";

export const EstablishmentDetails: FC = () => {
  let params = useParams();
  const [details, setDetails] = useState<EstablishmentDTO>();
  const [contracts, setContracts] = useState<ContractDTO[]>([]);
  const [isEditable, setEditable] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const { t } = useTranslation("establishments");

  const form = useRef(new Form({}));
  const [isFormValid, setIsFormValid] = useState<boolean>(form.current.isValid);
  form.current.onValidityChanged = (isValid) => setIsFormValid(isValid);

  const SetValidity = (name: string, isValid: boolean) => {
    form.current.SetValidity(name, isValid);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDetails((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Save = () => {
    if (form.current.isValid) {
    }
  };

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
      disabled: !isFormValid,
      onClick: () => {
        Save();
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
        className: clsx("actionButton", isEditable ? "subAction" : "subAction"),
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
      <div className="establishmentDetails">
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
                  name="Name"
                  value={details?.Name ?? ""}
                  onChange={handleInputChange}
                  onValidationChange={SetValidity}
                  required
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
                    name="NationalID"
                    label={t("nationalID")}
                    value={details?.NationalID ?? ""}
                    onChange={handleInputChange}
                    onValidationChange={SetValidity}
                    required
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
                  name="Address"
                  label={t("address")}
                  value={details?.Address ?? ""}
                  onChange={handleInputChange}
                  onValidationChange={SetValidity}
                  required
                />
                <TextField
                  readOnly={!isEditable}
                  name="PhoneNo"
                  label={t("phoneNumber")}
                  value={details?.PhoneNo ?? ""}
                  onChange={handleInputChange}
                  onValidationChange={SetValidity}
                  required
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
