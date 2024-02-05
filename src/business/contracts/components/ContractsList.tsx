import { FC, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { ContractsGrid } from "./ContractsGrid";
import { getContracts } from "../../../shared/mockups/Contracts";
import { ContractDTO } from "../../../shared/models/ContractDTO";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../../../shared/components/forms/CustomDatePicker";
import { ContractType } from "../../../shared/constants/constants";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { SearchBar } from "../../../shared/components/forms/SearchBar";
import { CollapsibleSection } from "../../../shared/components/forms/CollapsibleSection";
import { Section, SectionSize } from "../../../shared/components/forms/Section";

export const ContractsList: FC = () => {
  const { t } = useTranslation(["contracts", "common"]);
  const [contracts, setContracts] = useState<ContractDTO[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<ContractDTO>();

  const Search = () => {
    const list = getContracts();
    setContracts(list);
  };

  const Clear = () => {
    const empty = new ContractDTO();
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
        <Section
          className="pageHeader"
          iconName="ActivateOrders"
          title={t("contracts")}
          size={SectionSize.h1}
        />
        <CollapsibleSection
          open
          title={t("common:searchFilters")}
          iconName="Search"
        >
          <div className="row">
            <TextField
              label={t("contractNo")}
              value={searchCriteria?.ContractNo}
              onChange={(e, newValue) =>
                setSearchCriteriaField("ContractNo", newValue)
              }
            />
            <TextField
              label={t("refContractNo")}
              value={searchCriteria?.ReferenceContrctNo}
              onChange={(e, newValue) =>
                setSearchCriteriaField("ReferenceContrctNo", newValue)
              }
            />
            <Dropdown
              label={t("contractType")}
              options={contractTypes}
              selectedKey={searchCriteria?.ContractType ?? ''}
              onChange={(e, option) =>
                setSearchCriteriaField("ContractType", option?.key.toString())
              }
            />
            <Dropdown
              label={t("district")}
              options={[]}
              selectedKey={searchCriteria?.District ?? ''}
              onChange={(e, option) =>
                setSearchCriteriaField("District", option?.key.toString())
              }
            />
          </div>
          <div className="row">
            <Dropdown
              label={t("assignEst")}
              options={[]}
              selectedKey={searchCriteria?.AssignEstablishmentID ?? ''}
              onChange={(_, option) => {
                setSearchCriteriaField(
                  "AssignEstablishmentID",
                  option?.key.toString()
                );
              }}
            />
            <Dropdown
              label={t("execEst")}
              options={[]}
              selectedKey={searchCriteria?.ExecEstablishmentID ?? ''}
              onChange={(_, option) => {
                setSearchCriteriaField(
                  "ExecEstablishmentID",
                  option?.key.toString()
                );
              }}
            />
            <DatePicker
              label={t("contractStartDate")}
              value={searchCriteria?.ContractStartDate}
              onSelectDate={(newValue) =>
                setSearchCriteriaField("ContractStartDate", newValue, "Date")
              }
            />
            <DatePicker
              label={t("contractEndDate")}
              value={searchCriteria?.ContractEndDate}
              onSelectDate={(newValue) =>
                setSearchCriteriaField("ContractEndDate", newValue, "Date")
              }
            />
          </div>
          <SearchBar onSearch={() => Search()} onClear={() => Clear()} />
        </CollapsibleSection>
        <CollapsibleSection
          open
          title={t("common:searchResults")}
          iconName="SearchAndApps"
        >
          <ContractsGrid
            items={contracts}
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
