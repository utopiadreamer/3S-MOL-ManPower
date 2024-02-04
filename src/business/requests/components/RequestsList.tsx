import { FC, useEffect, useState } from "react";
import { RequestsGrid } from "./RequestsGrid";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { RequestDTO } from "../../../shared/models/RequestDTO";
import { getRequests } from "../../../shared/mockups/Requests";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { useTranslation } from "react-i18next";

export const RequestsList: FC = () => {
  const [requests, setRequests] = useState<RequestDTO[]>([]);
  const { t } = useTranslation(["requests"]);

  useEffect(() => {
    const requests = getRequests();
    setRequests(requests);
  }, []);

  return (
    <LayoutContent>
      <div className="panel">
        <Section
          size={SectionSize.h2}
          iconName="CustomListMirrored"
          title={t("requests")}
        />
        <RequestsGrid
          items={requests}
          onChanged={() => {
            return false;
          }}
          onNbItemPerPageChanged={() => {
            return false;
          }}
        />
      </div>
    </LayoutContent>
  );
};
