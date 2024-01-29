import { FC, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";

import { getWorkersRecords } from "../../../shared/mockups/WorkersRecord";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "@fluentui/react";
import { WorkersRecordDTO } from "../../../shared/models/WorkersRecordDTO";
import { WorkerRecordsGrid } from "./WorkerRecordsGrid";
import { Section, SectionSize } from "../../../shared/components/forms/Section";

export const WorkersRecordList: FC = () => {
  const [workers, setWorkers] = useState<WorkersRecordDTO[]>([]);
  const { t } = useTranslation(["workers", "common"]);
  const [settleNo, setSettleNo] = useState<string>();
  const [recordNo, setRecordNo] = useState<string>();
  const [contractNo, setContractNo] = useState<string>();

  const Search = () => {
    const results = getWorkersRecords();
    setWorkers(results);
  };

  return (
    <LayoutContent>
      <div className="workersList">
        <div className="panel">
          <Section size={SectionSize.h2} iconName="Search" title={t('common:searchFilters')} />
          <div className="row">
            <TextField
              label={t("workerRecordNo")}
              value={recordNo}
              onChange={(e, newValue) => setRecordNo(newValue)}
            />
            <TextField
              label={t("settlementNo")}
              value={settleNo}
              onChange={(e, newValue) => setSettleNo(newValue)}
            />
            <TextField
              label={t("contractNo")}
              value={contractNo}
              onChange={(e, newValue) => setContractNo(newValue)}
            />
          </div>
        </div>
        <div className="searchBar">
          <PrimaryButton
            className="actionButton primeAction"
            iconProps={{ iconName: "Search" }}
            text={t("common:search")}
            onClick={() => {
              Search();
            }}
          />
          <PrimaryButton
            className="actionButton subAction"
            iconProps={{ iconName: "Clear" }}
            text={t("common:clearSearch")}
            onClick={() => {}}
          />
        </div>
        <br />
        <div className="panel">
          <Section size={SectionSize.h2} iconName="SearchAndApps" title={t("common:searchResults")} />
          <WorkerRecordsGrid
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
    </LayoutContent>
  );
};
