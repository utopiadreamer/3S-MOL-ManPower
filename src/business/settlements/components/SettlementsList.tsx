import { FC, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { getSettlements } from "../../../shared/mockups/Settlements";
import { SettlementDTO } from "../../../shared/models/SettlementDTO";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { PrimaryButton } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { SettlementsGrid } from "./SettlementsGrid";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { SettlementDocumentType } from "../../../shared/constants/constants";
import { DatePicker } from "../../../shared/components/forms/CustomDatePicker";
import "../styles/SettlementsList.scss";
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
        <div className="section">
          <div className="content">
            <Section
              size={SectionSize.h2}
              iconName="Search"
              title={t("common:searchFilters")}
            />
            <div className="row g-5">
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
              <Dropdown
                label={t("settlementDocumentType")}
                options={documentTypes}
                selectedKey={documentType ?? ""}
                onChange={(_, option) => {
                  setDocumentType(option?.key.toString() ?? "");
                }}
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
          <SettlementsGrid
            items={settlements}
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
