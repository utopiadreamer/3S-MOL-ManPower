/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import {
  SelectionMode,
  DetailsListLayoutMode,
  IconButton,
} from "@fluentui/react";
import { useTranslation } from "react-i18next";
import {
  DetailsList,
  FilteredColumn,
  SortedColumnInfo,
} from "../../../shared/components/customDetailList/CustomDetailList";
import { ColumnInfo } from "../../../shared/components/customDetailList/FilteredHeaderColumn";
import { NavLink, useNavigate } from "react-router-dom";
import { WorkersRecordDTO } from "../../../shared/models/WorkersRecordDTO";

interface GridProps {
  items: WorkersRecordDTO[];
  onChanged?: (
    pageIndex: number,
    filteredColumn: FilteredColumn[],
    sortedColumn?: SortedColumnInfo
  ) => boolean;
  onNbItemPerPageChanged: (nbItemPerPage: number) => boolean;
}

export const WorkerRecordsGrid: FC<GridProps> = (props: GridProps) => {
  const { t } = useTranslation(["workers", "common"]);
  const [columns, setColumns] = useState<ColumnInfo[]>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { items: itemsProps, onChanged, onNbItemPerPageChanged } = props;
  const navigate = useNavigate();

  const [items, setItems] = useState<WorkersRecordDTO[]>([]);

  useEffect(() => {
    setItems(itemsProps?.slice());
  }, [itemsProps]);

  useEffect(() => {
    let gridColumns = [
      {
        key: "workerRecordNo",
        name: t("workerRecordNo"),
        fieldName: "WorkerRecordNo",
        minWidth: 250,
        maxWidth: 250,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: WorkersRecordDTO) => {
          return <div>{item.RecordNo}</div>;
        },
      },
      {
        key: "ContractNo",
        name: t("contractNo"),
        fieldName: "ContractNo",
        minWidth: 250,
        maxWidth: 250,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: WorkersRecordDTO) => {
          return <div>{item.ContractNo}</div>;
        },
      },
      {
        key: "SettlementNo",
        name: t("settlementNo"),
        fieldName: "SettlementNo",
        minWidth: 250,
        maxWidth: 250,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "action",
        name: "",
        fieldName: "",
        minWidth: 60,
        maxWidth: 60,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: WorkersRecordDTO) => {
          return (
            <div>
              <IconButton
                iconProps={{ iconName: "View" }}
                onClick={() =>
                  navigate(`${"/workers/record"}/${item.RecordNo}`)
                }
              />
            </div>
          );
        },
      },
    ];

    setColumns(gridColumns);
  }, []);

  return (
    <DetailsList
      className="grid"
      columns={columns ?? []}
      items={items}
      selectionMode={SelectionMode.none}
      layoutMode={DetailsListLayoutMode.fixedColumns}
      noItemsPlaceholder={<span>{t("common:NoRecords")}</span>}
      labels={{
        resultPerPage: t("common:nbItemPerPage"),
        totalRecord: t("common:totalRecord"),
      }}
      paginationSetting={{
        nbItemPerPage: pageSize,
        nbPageShown: 5,
        currentPage,
        totalPage: totalPages,
      }}
      onNbItemPerPageChanged={onNbItemPerPageChanged}
      onChanged={(
        pageIndex: number,
        filteredColumn: FilteredColumn[],
        sortedColumn?: SortedColumnInfo
      ) => {
        if (onChanged) {
          return onChanged(pageIndex, filteredColumn, sortedColumn);
        }
        return false;
      }}
    />
  );
};
