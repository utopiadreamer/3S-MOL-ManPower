import { FC, useEffect, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { ContractsGrid } from "./ContractsGrid";
import { getContracts } from "../../../shared/mockups/Contracts";
import { ContractDTO } from "../../../shared/models/ContractDTO";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { CommandBar, IconButton, Label } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const ContractsList: FC = () => {
  const { t } = useTranslation(["contracts", "common"]);
  const [contracts, setContracts] = useState<ContractDTO[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<string>();

  const navigate = useNavigate();

  const Search = () => {
    let list = getContracts();
    list = list.filter((i) => i.ContractNo === searchCriteria);
    setContracts(list);
  };

  return (
    <LayoutContent>
      <div className="panel">
        <div className="flex">
          <div className="searchArea">
            <Label>{t("contractNo")}</Label>
            <TextField
              className="searchText"
              value={searchCriteria}
              onChange={(e, newValue) => setSearchCriteria(newValue)}
            />
            <IconButton
              className="searchButton"
              iconProps={{ iconName: "Search" }}
              onClick={() => {
                Search();
              }}
            ></IconButton>
          </div>
        </div>
        <br />
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
    </LayoutContent>
  );
};
