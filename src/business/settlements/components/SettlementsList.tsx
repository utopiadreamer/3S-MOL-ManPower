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
  const [settlements, setSettlements] = useState<SettlementDTO[]>([]);
  const [settleNo, setSettleNo] = useState<string>();
  const [documentType, setDocumentType] = useState<string>();
  const [contractNo, setContractNo] = useState<string>();
  const [startDate, setStatrtDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const Search = () => {
    let list = getSettlements();
    setSettlements(list);
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
        <Section title={t('searchRequests')} size={SectionSize.h1} />
        <CollapsibleSection title={t("common:searchFilters")} open>
          <div className="row">
            <TextField
              label={t("settlementNumber")}
              value={settleNo}
              onChange={(e, newValue) => setSettleNo(newValue)}
            />
            <TextField
              label={t("contractNo")}
              value={contractNo}
              onChange={(e, newValue) => setContractNo(newValue)}
            />
            <DatePicker
              label={t("operationStartDate")}
              value={startDate}
              onSelectDate={(val) => {
                setStatrtDate(val ?? undefined);
              }}
            />
            <DatePicker
              label={t("operationEndDate")}
              value={endDate}
              onSelectDate={(val) => {
                setEndDate(val ?? undefined);
              }}
            />
          </div>
          <div className="row g-121">
            <Dropdown
              label={t("settlementDocumentType")}
              options={documentTypes}
              selectedKey={documentType ?? ""}
              onChange={(_, option) => {
                setDocumentType(option?.key.toString() ?? "");
              }}
            />
            <div />
            <SearchBar onSearch={() => Search()} onClear={() => {}} />
          </div>
        </CollapsibleSection>
        <CollapsibleSection title={t("common:searchResults")} open>
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
