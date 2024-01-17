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

export const EstablishmentDetails: FC = () => {
  let params = useParams();
  const [details, setDetails] = useState<EstablishmentDTO>();
  const [contracts, setContracts] = useState<ContractDTO[]>([]);
  const { t } = useTranslation("establishments");

  useEffect(() => {
    const list = getEstablishments().filter((i) => i.ID === params.id);
    if (list && list.length > 0) {
      setDetails(list[0]);
      const cont = getContracts().filter(
        (i) =>
          i.AssignEstablishment.ID === params.id ||
          i.ExecEstablishment.ID === params.id
      );
      setContracts(cont);
    }
  }, [params.id]);

  return (
    <LayoutContent>
      <div className="establishmentDetails panel">
        <div className="body">
          <Section
            title={t("establishmentDetails")}
            size={SectionSize.h2}
            iconName="Bank"
          />
          <div className="row">
            <TextField readOnly label={t("name")} value={details?.Name ?? ""} />
            <TextField
              readOnly
              label={t("establishmentType")}
              value={t(details?.Type ?? "")}
            />
            {params.type === EstablishmentType.Company && (
              <>
                <TextField
                  readOnly
                  label={t("commRegistrationNo")}
                  value={details?.CommRegistrationNo ?? ""}
                />
                <TextField
                  readOnly
                  label={t("taxNumber")}
                  value={details?.TaxNumber ?? ""}
                />
              </>
            )}
            {params.type === EstablishmentType.Government && (
              <TextField
                readOnly
                label={t("institutionalCode")}
                value={details?.InstitutionalCode ?? ""}
              />
            )}
            {params.type === EstablishmentType.Person && (
              <TextField
                readOnly
                label={t("nationalID")}
                value={details?.NationalID ?? ""}
              />
            )}
            <TextField
              readOnly
              label={t("insuranceNumber")}
              value={details?.InsuranceNumber ?? ""}
            />
            <TextField
              readOnly
              label={t("agentName")}
              value={details?.AgentName ?? ""}
            />
            <TextField
              readOnly
              label={t("address")}
              value={details?.Address ?? ""}
            />
            <TextField
              readOnly
              label={t("phoneNumber")}
              value={details?.PhoneNo ?? ""}
            />
          </div>
<br/>
<br/>
          <Section
            title={t("contractDetails")}
            size={SectionSize.h2}
            iconName="ActivateOrders"
          />
          <div>
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
    </LayoutContent>
  );
};
