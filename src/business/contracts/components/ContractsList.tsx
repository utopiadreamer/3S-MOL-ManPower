import { FC, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { ContractsGrid } from "./ContractsGrid";
import { getContracts } from "../../../shared/mockups/Contracts";
import { ContractDTO } from "../../../shared/models/ContractDTO";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { PrimaryButton } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../../../shared/components/forms/CustomDatePicker";
import { ContractType } from "../../../shared/constants/constants";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { Section, SectionSize } from "../../../shared/components/forms/Section";

export const ContractsList: FC = () => {
  const { t } = useTranslation(["contracts", "common"]);
  const [contracts, setContracts] = useState<ContractDTO[]>([]);
  const [contractNo, setContractNo] = useState<string>();
  const [contractRefNo, setContracReftNo] = useState<string>();
  const [contractType, setContractType] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [startDate, setStatrtDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const Search = () => {
    const list = getContracts();
    setContracts(list);
  };

  const icon = { icon: "TextDocumentShared" };
  const contractTypes = [
    {
      key: ContractType.Contract,
      text: t("Contract"),
      data: icon,
    },
    {
      key: ContractType.Tender,
      text: t("Tender"),
      data: icon,
    },
    {
      key: ContractType.AssignmentOrder,
      text: t("AssignmentOrder"),
      data: icon,
    },
    {
      key: ContractType.SupplyOrder,
      text: t("SupplyOrder"),
      data: icon,
    },
    {
      key: ContractType.AttributionOrder,
      text: t("AttributionOrder"),
      data: icon,
    },
    {
      key: ContractType.License,
      text: t("License"),
      data: icon,
    },
    {
      key: ContractType.RepairOrder,
      text: t("RepairOrder"),
      data: icon,
    },
    {
      key: ContractType.PurchaseOrder,
      text: t("PurchaseOrder"),
      data: icon,
    },
    {
      key: ContractType.Other,
      text: t("Other"),
      data: icon,
    },
  ];

  return (
    <LayoutContent>
      <div className="contractsList">
        <div className="section">
          <div className="content">
            <Section
              size={SectionSize.h2}
              iconName="Search"
              title={t("common:searchFilters")}
            />
            <div className="row">
              <TextField
                label={t("contractNo")}
                value={contractNo}
                onChange={(e, newValue) => setContractNo(newValue)}
              />
              <TextField
                label={t("refContractNo")}
                value={contractRefNo}
                onChange={(e, newValue) => setContracReftNo(newValue)}
              />
              <Dropdown
                label={t("contractType")}
                options={contractTypes}
                selectedKey={contractType ?? ""}
                onChange={(_, option) => {
                  setContractType(option?.key.toString() ?? "");
                }}
              />
              <Dropdown
                label={t("district")}
                options={[]}
                selectedKey={district ?? ""}
                onChange={(_, option) => {
                  setDistrict(option?.key.toString() ?? "");
                }}
              />
            </div>
            <div className="row">
              <Dropdown
                label={t("assignEst")}
                options={[]}
                selectedKey={contractRefNo}
                onChange={(_, option) => {
                  setContractType(option?.key.toString() ?? "");
                }}
              />
              <Dropdown
                label={t("execEst")}
                options={[]}
                selectedKey={contractRefNo}
                onChange={(_, option) => {
                  setContractType(option?.key.toString() ?? "");
                }}
              />
              <DatePicker
                label={t("contractStartDate")}
                value={startDate}
                onSelectDate={(val) => {
                  setStatrtDate(val ?? undefined);
                }}
              />
              <DatePicker
                label={t("contractEndDate")}
                value={endDate}
                onSelectDate={(val) => {
                  setEndDate(val ?? undefined);
                }}
              />
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
          </div>
        </div>
        <div className="panel">
          <Section
            size={SectionSize.h2}
            iconName="SearchAndApps"
            title={t("common:searchResults")}
          />
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
    </LayoutContent>
  );
};
