import { FC, useEffect, useState } from "react";
import "../styles/EstablishmentDetails.scss";
import { useParams } from "react-router-dom";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";

export const EstablishmentDetails: FC = () => {
  let params = useParams();
  const [details, setDetails] = useState<any>();
  const { t } = useTranslation("establishments");

  useEffect(() => {
    const data = {requestNo: '11'};
    setDetails(data);
  }, []);

  return (
    <LayoutContent>
      <div className="establishmentDetails card">
        <div className="body">
          <Section title={t("establishmentDetails")} size={SectionSize.h1} />
          <div className="row">
            <TextField
              readOnly
              label={t("requestNo")}
              value={details?.requestNo ?? ""}
            />
            <TextField
              readOnly
              label={t("requestType")}
              value={details?.requestType ?? ""}
            />
            <TextField
              readOnly
              label={t("requestDate")}
              value={details?.requestDate ?? ""}
            />
            <TextField
              readOnly
              label={t("establishmentType")}
              value={details?.establishmentType ?? ""}
            />
          </div>
          <div className="row">
            <TextField
              readOnly
              label={t("commRegistrationNo")}
              value={details?.commRegistrationNo ?? ""}
            />
            <TextField
              readOnly
              label={t("taxNumber")}
              value={details?.taxNumber ?? ""}
            />
            <TextField
              readOnly
              label={t("institutionalCode")}
              value={details?.institutionalCode ?? ""}
            />
            <TextField
              readOnly
              label={t("nationalID")}
              value={details?.nationalID ?? ""}
            />
          </div>
          <div className="row">
            <TextField
              readOnly
              label={t("insuranceNumber")}
              value={details?.insuranceNumber ?? ""}
            />
            <TextField
              readOnly
              label={t("agentName")}
              value={details?.agentName ?? ""}
            />
            <TextField
              readOnly
              label={t("address")}
              value={details?.address ?? ""}
            />
            <TextField
              readOnly
              label={t("phoneNumber")}
              value={details?.phoneNumber ?? ""}
            />
          </div>
        </div>
      </div>
    </LayoutContent>
  );
};
