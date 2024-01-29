import { FC, useEffect, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";

import { WorkersGrid } from "./WorkersGrid";
import { Mode } from "../../../shared/constants/types";
import { WorkerDTO } from "../../../shared/models/WorkerDTO";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "@fluentui/react";
import { getWorkers } from "../../../shared/mockups/Workers";
import { useParams } from "react-router-dom";
import { Section, SectionSize } from "../../../shared/components/forms/Section";

export const WorkersList: FC = () => {
  const [workers, setWorkers] = useState<WorkerDTO[]>([]);
  const { t } = useTranslation(["workers", "common"]);
  const [nationalID, setNationalID] = useState<string>();
  const [occupation, setOccupation] = useState<string>();
  const [name, setName] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    Search();
  });

  const Search = () => {
    const results = getWorkers(name, nationalID, occupation, id);
    setWorkers(results);
  };

  return (
    <LayoutContent>
      <div className="workersList">
        <div className="panel">
          <Section size={SectionSize.h2} iconName="Search" title={t("common:searchFilters")} />
          <div className="row">
            <TextField
              label={t("workerName")}
              value={name}
              onChange={(e, newValue) => setName(newValue)}
            />
            <TextField
              label={t("nationalID")}
              value={nationalID}
              onChange={(e, newValue) => setNationalID(newValue)}
            />
            <TextField
              label={t("occupation")}
              value={occupation}
              onChange={(e, newValue) => setOccupation(newValue)}
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
    </LayoutContent>
  );
};
