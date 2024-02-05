import { FC, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { getSettlements } from "../../../shared/mockups/Settlements";
import { SettlementDTO } from "../../../shared/models/SettlementDTO";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { SettlementsGrid } from "./SettlementsGrid";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { SettlementDocumentType } from "../../../shared/constants/constants";
import { DatePicker } from "../../../shared/components/forms/CustomDatePicker";
import "../styles/SettlementsList.scss";
import { CollapsibleSection } from "../../../shared/components/forms/CollapsibleSection";
import { SearchBar } from "../../../shared/components/forms/SearchBar";
import { Section, SectionSize } from "../../../shared/components/forms/Section";

export const SettlementsList: FC = () => {
  const { t } = useTranslation(["settlements", "common"]);
  const [searchCriteria, setSearchCriteria] = useState<SettlementDTO>();
  const [settlements, setSettlements] = useState<SettlementDTO[]>([]);

  const Search = () => {
    let list = getSettlements();
    setSettlements(list);
  };

  const Clear = () => {
    const empty = new SettlementDTO();
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

  const documentTypes = [
    {
      key: SettlementDocumentType.Invoice,
      text: t("invoice"),
      data: { icon: "PageList" },
    },
    {
      key: SettlementDocumentType.Clearance,
      text: t("clearance"),
      data: { icon: "M365InvoicingLogo" },
    },
  ];

  return (
    <LayoutContent>
      <div className="settlementList">
        <Section
          className="pageHeader"
          iconName="CustomListMirrored"
          title={t("searchRequests")}
          size={SectionSize.h1}
        />
        <CollapsibleSection
          title={t("common:searchFilters")}
          open
          iconName="Search"
        >
          <div className="row">
            <TextField
              label={t("settlementNumber")}
              value={searchCriteria?.SettlementNo}
              onChange={(e, newValue) =>
                setSearchCriteriaField("SettlementNo", newValue)
              }
            />
            <TextField
              label={t("contractNo")}
              value={searchCriteria?.ContractNo}
              onChange={(e, newValue) =>
                setSearchCriteriaField("ContractNo", newValue)
              }
            />
            <DatePicker
              label={t("operationStartDate")}
              value={searchCriteria?.OperationStartDate}
              onSelectDate={(newValue) =>
                setSearchCriteriaField("OperationStartDate", newValue, "Date")
              }
            />
            <DatePicker
              label={t("operationEndDate")}
              value={searchCriteria?.OperationEndDate}
              onSelectDate={(newValue) =>
                setSearchCriteriaField("OperationEndDate", newValue, "Date")
              }
            />
          </div>
          <div className="row g-121">
            <Dropdown
              label={t("settlementDocumentType")}
              options={documentTypes}
              selectedKey={searchCriteria?.DocumentType ?? ''}
              onChange={(e, option) =>
                setSearchCriteriaField("DocumentType", option?.key.toString())
              }
            />
            <div />
            <SearchBar onSearch={() => Search()} onClear={() => Clear()} />
          </div>
        </CollapsibleSection>
        <CollapsibleSection
          title={t("common:searchResults")}
          open
          iconName="SearchAndApps"
        >
          <SettlementsGrid
            items={settlements}
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
