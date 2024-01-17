import { FC, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";

import { getWorkers } from "../../../shared/mockups/Workers";
import { WorkersGrid } from "./WorkersGrid";
import { Mode } from "../../../shared/constants/types";
import { WorkerDTO } from "../../../shared/models/WorkerDTO";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "@fluentui/react";

export const WorkersList: FC = () => {
  const [workers, setWorkers] = useState<WorkerDTO[]>([]);
  const { t } = useTranslation(["workers", "common"]);
  const [nationalID, setNationalID] = useState<string>();
  const [occupation, setOccupation] = useState<string>();
  const [name, setName] = useState<string>();

  const Search = () => {
    const results = getWorkers(name, nationalID, occupation);
    setWorkers(results.Workers);
  };

  return (
    <LayoutContent>
      <div className="workersList panel">
        <div className="searchList">
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
          <div className="actions">
            <PrimaryButton
              className="actionButton editAction"
              iconProps={{ iconName: "Search" }}
              text={t("common:search")}
              onClick={() => {
                Search();
              }}
            />
          </div>
        </div>
        <br />
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
    </LayoutContent>
  );
};
