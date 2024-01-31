import React, { FC, useState } from "react";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { DatePicker } from "../../../shared/components/forms/CustomDatePicker";
import { IGroup, PrimaryButton } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { WorkItemsGrid } from "./WorkItemsGrid";
import { FileSelector } from "../../../shared/components/forms/FileSelector";
import { AddWorkItems } from "./AddWorkItems";
import { DatesUtil } from "../../../shared/utils/datesUtil";
import { GeneralUtil } from "../../../shared/utils/generalUtil";

export interface WorkItem {
  id: number;
  invoiceNo: string;
  workItem: string;
  amount: number;
  workItemText: string;
}

export const WorkItems: FC = () => {
  const { t } = useTranslation(["settlements", "common"]);
  const today = new Date();
  const [showAddWorkItemDialog, setShowAddWorkItemDialog] =
    useState<boolean>(false);

  const [invoices, setInvoices] = useState<IGroup[]>([]);
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [invoiceNo, setInvoiceNo] = useState<string>();
  const [invoiceDate, setInvoiceDate] = useState<Date>(today);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [notes, setNotes] = useState<string>();
  const [reload, setReload] = useState<boolean>(false);

  const addInvoice = () => {
    if (GeneralUtil.isNothing(invoiceNo)) {
      setErrorMessage(t("invoiceRequired"));
      return;
    }
    const list = invoices.filter((i) => i.key === invoiceNo?.trim());
    if (list && list.length > 0) {
      setErrorMessage(t("existingInvoice"));
    } else {
      const arr = invoices;
      const invoice: IGroup = {
        key: invoiceNo?.toString() ?? "",
        name: ` فاتورة رقم ${
          invoices.length + 1
        } - ${DatesUtil.getLocalizedDateTime("Date", invoiceDate)}`,
        startIndex: invoices.length,
        count: 0,
        level: 0,
        isCollapsed: false,
      };
      arr.push(invoice ?? "");

      setInvoices(arr);
      setErrorMessage(undefined);
      setReload(true);
    }
  };

  const addWorkItem = (
    invoiceNo: string,
    workItem: string,
    amount: number,
    workItemText: string
  ) => {
    const items = workItems;
    const item: WorkItem = {
      id: items.length + 1,
      invoiceNo,
      workItem,
      amount,
      workItemText,
    };
    items.push(item);
    items.sort((a, b) => (a.invoiceNo > b.invoiceNo ? 1 : -1));
    setWorkItems(items);
    console.log(items);

    const index = invoices.findIndex((i) => i.key === invoiceNo);
    if (index !== -1) {
      const length = items.filter((i) => i.invoiceNo === invoiceNo).length;

      invoices[index].count = length;
      if (invoices.length > 1) {
        for (let i = 1; i < invoices.length; i++) {
          const count = invoices[i - 1].count;
          const startIndex = invoices[i - 1].startIndex;
          invoices[i].startIndex = startIndex + count;
        }
      }

      setInvoices(invoices);
    }
    setReload(true);
  };


  const onDeleteWorkItem = () => {
    setReload(true);
  };

  return (
    <div>
      <div className="row">
        <TextField
          label={t("invoiceNo")}
          value={invoiceNo}
          onChange={(_, v) => setInvoiceNo(v ?? "")}
          errorMessage={errorMessage}
        />
        <DatePicker
          label={t("invoiceDate")}
          value={invoiceDate}
          onSelectDate={(val) => {
            setInvoiceDate(val ?? today);
          }}
        />
        <TextField
          label={t("notes")}
          value={notes}
          onChange={(_, v) => setNotes(v ?? "")}
        />
        <FileSelector
          title={t("common:attachments")}
          labels={{
            selectFile: t("common:BrowseFile"),
            chooseAnotherFile: t("common:ChooseAnother"),
            unSelectFile: t("common:UnSelect"),
            viewFile: t("common:view"),
          }}
          extensionFilter=".jpg"
        />
      </div>
      <div>
        <div className="alignEnd">
          <PrimaryButton
            iconProps={{ iconName: "Add" }}
            className="actionButton subAction"
            onClick={() => addInvoice()}
          >
            {t("addInvoice")}
          </PrimaryButton>
          <PrimaryButton
            iconProps={{ iconName: "Add" }}
            className="actionButton primeAction"
            onClick={() => setShowAddWorkItemDialog(true)}
          >
            {t("addWorkItem")}
          </PrimaryButton>
        </div>
      </div>
      <br/>
      <div>
          <WorkItemsGrid
            reload={reload}
            onDelete={() =>
              onDeleteWorkItem()
            }
            onRealod={() => setReload(false)}
            invoices={invoices}
            workItems={workItems}
            onChanged={() => {
              return false;
            }}
            onNbItemPerPageChanged={() => {
              return false;
            }}
          />
      </div>
      {showAddWorkItemDialog && (
        <AddWorkItems
          hidden={!showAddWorkItemDialog}
          invoices={invoices}
          onCancel={() => setShowAddWorkItemDialog(false)}
          onSave={(
            invoiceNo: string,
            workItem: string,
            amount: number,
            workItemText: string
          ) => {
            addWorkItem(invoiceNo, workItem, amount, workItemText);
            setShowAddWorkItemDialog(false);
          }}
        />
      )}
    </div>
  );
};
