/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactNode, useEffect, useState } from "react";
import {
  IGroup,
  DetailsList,
  DetailsHeader,
  IDetailsHeaderProps,
  IRenderFunction,
  IColumn,
  DetailsListLayoutMode,
  CheckboxVisibility,
  IconButton,
  ActionButton,
  IDetailsList,
} from "@fluentui/react";
import { useTranslation } from "react-i18next";
import {
  FilteredColumn,
  SortedColumnInfo,
} from "../../../shared/components/customDetailList/CustomDetailList";
import { ColumnInfo } from "../../../shared/components/customDetailList/FilteredHeaderColumn";

interface GridProps {
  invoices?: IGroup[];
  workItems: WorkItem[];
  onChanged?: (
    pageIndex: number,
    filteredColumn: FilteredColumn[],
    sortedColumn?: SortedColumnInfo
  ) => boolean;
  onNbItemPerPageChanged: (nbItemPerPage: number) => boolean;
  onDelete: (id: number, invoiceNo: string) => void;
  onRealod: () => void;
  reload?: boolean;
}

export interface WorkItem {
  id: number;
  invoiceNo: string;
  workItem: string;
  amount: number;
}

export const WorkItemsGrid: FC<GridProps> = (props: GridProps) => {
  const { t } = useTranslation(["settlements", "common"]);
  const { invoices, workItems, reload, onRealod, onDelete } = props;
  const _root = React.createRef<IDetailsList>();
  const [items, setItems] = useState<WorkItem[]>();
  const [groups, setGroups] = useState<IGroup[]>();
  const [columns, setColumns] = useState<ColumnInfo[]>();

  useEffect(() => {
    setGroups(invoices ?? []);
  }, [invoices]);

  useEffect(() => {
    setItems(workItems ?? []);
  }, [workItems]);

  useEffect(() => {
    if (reload) {
      setGroups(invoices ?? []);
      setItems(workItems ?? []);
      onRealod();
    }
    _root?.current?.focusIndex(workItems.length, true);
  }, [reload]);

  const onDeleteWorkItem = (id: number, invoiceNo: string) => {
    const deleteIndex = workItems?.findIndex((i) => i.id === id);
    const filtered = workItems;
    filtered.splice(deleteIndex, 1);
    setItems(filtered);

    const index = invoices?.findIndex((i) => i.key === invoiceNo) ?? 0;

    if (invoices && index !== -1) {
      invoices[index].count = invoices[index].count - 1;
      for (let i = 1; i < invoices.length; i++) {
        const count = invoices[i - 1].count;
        const startIndex = invoices[i - 1].startIndex;
        invoices[i].startIndex = startIndex + count;
      }
      setGroups(invoices);
    }
    onDelete(id, invoiceNo);
  };

  const _onRenderDetailsHeader = (
    props?: IDetailsHeaderProps,
    _defaultRender?: IRenderFunction<IDetailsHeaderProps>
  ): JSX.Element => {
    return (
      <DetailsHeader {...props} layoutMode={DetailsListLayoutMode.justified} />
    );
  };

  const _onRenderColumn = (
    item?: any,
    index?: number,
    column?: IColumn
  ): ReactNode => {
    const value =
      item && column && column.fieldName
        ? item[column.fieldName as keyof WorkItem] || ""
        : "";

    return <div data-is-focusable={true}>{value}</div>;
  };

  const _addItem = () => {

    setItems(
      workItems.concat([
        {
          invoiceNo: "1",
          workItem: "4",
          amount: 44,
          id: 1
        },
      ])
    );
    if (_root.current) {
      _root.current.focusIndex(workItems.length, true);
    }
  };

  useEffect(() => {
    let gridColumns = [
      {
        key: "workItemText",
        name: t("workItem"),
        fieldName: "workItemText",
        minWidth: 450,
        maxWidth: 450,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "amount",
        name: t("amount"),
        fieldName: "amount",
        minWidth: 100,
        maxWidth: 100,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "action",
        name: "",
        fieldName: "",
        minWidth: 40,
        maxWidth: 40,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: WorkItem) => {
          return (
            <div>
              <ActionButton
                iconProps={{ iconName: "Delete" }}
                onClick={() => {
                  onDeleteWorkItem(item.id, item.invoiceNo);
                }}
              />
            </div>
          );
        },
      },
    ];

    setColumns(gridColumns);
  }, [workItems, invoices, reload]);

  return (
    <DetailsList
      componentRef={_root}
      items={items ?? []}
      groups={groups}
      columns={columns}
      onRenderDetailsHeader={_onRenderDetailsHeader}
      groupProps={{
        showEmptyGroups: true,
      }}
      onRenderItemColumn={_onRenderColumn}
      checkboxVisibility={CheckboxVisibility.hidden}
    />
  );
};
