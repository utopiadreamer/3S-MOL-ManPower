import { FC, useEffect, useState } from "react";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { SearchableDropdown } from "../../../shared/components/forms/SearchableDropdown";
import {
  ActionButton,
  DropdownMenuItemType,
  IDropdownOption,
  IGroup,
} from "@fluentui/react";
import {
  InputType,
  TextField,
} from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { Dialog } from "../../../shared/components/forms/CustomDialog";

interface Props {
  invoices: IGroup[];
  hidden: boolean;
  onCancel: () => void;
  onSave: (
    invoiceNo: string,
    workItem: string,
    amount: number,
    workItemText: string
  ) => void;
}

export const AddWorkItems: FC<Props> = (props: Props) => {
  const { t } = useTranslation(["settlements", "common"]);
  const { hidden, onCancel, onSave, invoices } = props;
  const [workItem, setWorkItem] = useState<string>("");
  const [workItemText, setWorkItemText] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [invoiceNo, setInvoiceNo] = useState<string>("");
  const [invoicesList, setInvoicesList] = useState<IDropdownOption[]>([]);

  const items = [
    {
      key: "1",
      text: t("contracting"),
      itemType: DropdownMenuItemType.Header,
    },
    {
      key: "2",
      text: t("FinishedBusiness"),
      itemType: DropdownMenuItemType.Header,
      data: "SubHeader",
    },
    {
      key: "3",
      text: t("LightBuildings"),
    },
    {
      key: "4",
      text: t("RisingWorks"),
    },
    {
      key: "5",
      text: t("ResidentialBuildings"),
    },
    {
      key: "6",
      text: t("ContractingAndQuarryWorks"),
      itemType: DropdownMenuItemType.Header,
    },
    {
      key: "7",
      text: t("UnfinishedBusiness"),
      itemType: DropdownMenuItemType.Header,
      data: "SubHeader",
    },
    {
      key: "8",
      text: t("EmployingWorkers"),
    },
    {
      key: "9",
      text: t("EquipmentOperation"),
    },
    {
      key: "10",
      text: t("MechanicalBasics"),
    },
  ];

  useEffect(() => {
    const list = invoices.map((item) => {
      return {
        key: item.key,
        text: item.name,
      };
    });
    setInvoicesList(list);
  }, [invoices]);

  const onSaveWorkItem = () => {
    const workItemAmount = Number.parseFloat(amount);
    onSave(invoiceNo, workItem, workItemAmount, workItemText);
  };

  return (
    <Dialog
      containerClassName="addWorkItemDialog"
      hidden={hidden}
      onDismiss={() => onCancel()}
      maxWidth={600}
      minWidth={600}
      title={t("addWorkItemTitle")}
      Footer={
        <div className="addWorkItemFooter">
          <ActionButton
            className="actionButton primeAction"
            onClick={onSaveWorkItem}
            text={t("common:add")}
          />
          <ActionButton
            className="actionButton subAction"
            onClick={onCancel}
            text={t("common:cancel")}
          />
        </div>
      }
    >
      <div>
        <div className="row g-1">
          <Dropdown
            label={t("invoiceNo")}
            options={invoicesList}
            selectedKey={invoiceNo}
            onChange={(_, option) => {
              setInvoiceNo(option?.key.toString() ?? "");
            }}
          />
        </div>
        <div className="row g-1">
          <div>
            <SearchableDropdown
              options={items}
              id="workItem"
              label={t("workItem")}
              selectedKey={workItem}
              onChange={(option, text) => {
                setWorkItem(option?.toString() ?? "");
                setWorkItemText(text ?? "");
              }}
            />
          </div>
        </div>
          <div className="row g-1">
            <TextField
              inputType={InputType.DecimalNumber}
              label={t("amount")}
              value={amount}
              onChange={(_, v) => setAmount(v ?? "")}
            />
          </div>
      </div>
    </Dialog>
  );
};
