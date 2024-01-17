import { FC, useEffect, useState } from "react";
import "../styles/ContractDetails.scss";
import { useParams } from "react-router-dom";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";

export const ContractDetails: FC = () => {
  let params = useParams();
  const [details, setDetails] = useState<any>();
  const { t } = useTranslation("contracts");

  useEffect(() => {
    const data = {requestNo: '11'};
    setDetails(data);
  }, []);

  return (
    <LayoutContent>
      <div className="contractDetails card">
        <div className="body">
          <Section title={t("contractDetails")} size={SectionSize.h1} iconName="ActivateOrders" />
          <div className="row">
            <TextField
              readOnly
              label={t("requestNo")}
              value={details?.requestNo ?? ""}
            />
            <TextField
              readOnly
              label={t("requestDate")}
              value={details?.requestDate ?? ""}
            />
            <TextField
              readOnly
              label={t("establishmentType")}
              value={details?.requestNo ?? ""}
            />
          </div>
          <div className="row">
            <TextField
              readOnly
              label={t("commRegistrationNo")}
              value={details?.requestNo ?? ""}
            />
            <TextField
              readOnly
              label={t("taxNumber")}
              value={details?.requestNo ?? ""}
            />
            <TextField
              readOnly
              label={t("institutionalCode")}
              value={details?.requestNo ?? ""}
            />
            <TextField
              readOnly
              label={t("nationalID")}
              value={details?.requestNo ?? ""}
            />
          </div>
          <div className="row">
            <TextField
              readOnly
              label={t("insuranceNumber")}
              value={details?.requestNo ?? ""}
            />
            <TextField
              readOnly
              label={t("agentName")}
              value={details?.requestNo ?? ""}
            />
            <TextField
              readOnly
              label={t("address")}
              value={details?.requestNo ?? ""}
            />
            <TextField
              readOnly
              label={t("phoneNumber")}
              value={details?.requestNo ?? ""}
            />
          </div>
          
        </div>
      </div>
    </LayoutContent>
  );
};
