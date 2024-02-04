/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";

import { WorkersGrid } from "./WorkersGrid";
import { Mode } from "../../../shared/constants/types";
import { WorkerDTO } from "../../../shared/models/WorkerDTO";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { getWorkers } from "../../../shared/mockups/Workers";
import { useParams } from "react-router-dom";
import { CollapsibleSection } from "../../../shared/components/forms/CollapsibleSection";
import { SearchBar } from "../../../shared/components/forms/SearchBar";

export const WorkersList: FC = () => {
  const [workers, setWorkers] = useState<WorkerDTO[]>([]);
  const { t } = useTranslation(["workers", "common"]);
  const [nationalID, setNationalID] = useState<string>();
  const [occupation, setOccupation] = useState<string>();
  const [name, setName] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    Search();
  }, []);

  const Search = () => {
    const results = getWorkers(name, nationalID, occupation, id);
    setWorkers(results);
  };

  return (
    <LayoutContent>
      <div className="workersList">
        <CollapsibleSection open title={t("common:searchFilters")}>
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
            <SearchBar onSearch={() => Search()} onClear={() => {}} />
          </div>
        </CollapsibleSection>

        <CollapsibleSection open title={t("common:searchResults")}>
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
        </CollapsibleSection>
      </div>
    </LayoutContent>
  );
};
