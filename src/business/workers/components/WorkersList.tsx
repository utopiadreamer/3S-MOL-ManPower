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
import { Section, SectionSize } from "../../../shared/components/forms/Section";

export const WorkersList: FC = () => {
  const [workers, setWorkers] = useState<WorkerDTO[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<WorkerDTO>();
  const { t } = useTranslation(["workers", "common"]);
  const { id } = useParams();

  useEffect(() => {
    Search();
  }, []);

  const Search = () => {
    const results = getWorkers(searchCriteria, id);
    setWorkers(results);
  };

  const Clear = () => {
    const empty = new WorkerDTO();
    setSearchCriteria(empty);
  };

  const setSearchCriteriaField = (
    name: string,
    value?: string | Date | null,
    type?: "Date"
  ) => {
    let val = value;
    if (type === "Date") val = new Date(val ?? "");
    setSearchCriteria((prevData: any) => ({
      ...prevData,
      [name]: val,
    }));
  };

  return (
    <LayoutContent>
      <div className="workersList">
        <Section
          className="pageHeader"
          iconName="FabricUserFolder"
          title={t("workersInfo")}
          size={SectionSize.h1}
        />
        <CollapsibleSection
          open
          title={t("common:searchFilters")}
          iconName="Search"
        >
          <div className="row">
            <TextField
              label={t("workerName")}
              value={searchCriteria?.Name}
              onChange={(e, newValue) =>
                setSearchCriteriaField("Name", newValue)
              }
            />
            <TextField
              label={t("nationalID")}
              value={searchCriteria?.NationalID}
              onChange={(e, newValue) =>
                setSearchCriteriaField("NationalID", newValue)
              }
            />
            <TextField
              label={t("occupation")}
              value={searchCriteria?.Occupation}
              onChange={(e, newValue) =>
                setSearchCriteriaField("Occupation", newValue)
              }
            />
            <SearchBar onSearch={() => Search()} onClear={() => Clear()} />
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          open
          title={t("common:searchResults")}
          iconName="SearchAndApps"
        >
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
