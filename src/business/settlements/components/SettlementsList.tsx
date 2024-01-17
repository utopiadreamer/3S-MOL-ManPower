import { FC, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { getSettlements } from "../../../shared/mockups/Settlements";
import { SettlementDTO } from "../../../shared/models/SettlementDTO";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { CommandBar } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SettlementsGrid } from "./SettlementsGrid";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { SettlementDocumentType } from "../../../shared/constants/constants";
import { DatePicker } from "../../../shared/components/forms/CustomDatePicker";
import '../styles/SettlementsList.scss'

export const SettlementsList: FC = () => {
  const { t } = useTranslation(["settlements", "common"]);
  const [settlements, setSettlements] = useState<SettlementDTO[]>([]);
  const [settleNo, setSettleNo] = useState<string>();
  const [documentType, setDocumentType] = useState<string>();
  const [contractNo, setContractNo] = useState<string>();
  const [startDate, setStatrtDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const navigate = useNavigate();

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

  const handleDateChange = () => {};

  return (
    <LayoutContent>
      <div className="settlementList panel">
        <div className="flex justify-Between">
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

          <div className="settleActions">
            <CommandBar
              items={[]}
              farItems={[
                {
                  key: "search",
                  className: "actionButton editAction",
                  text: t("common:search"),
                  iconProps: { iconName: "Search" },
                  onClick: () => {
                    Search();
                  },
                }
              ]}
            />
          </div>
        </div>
        <br />
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
    </LayoutContent>
  );
};
