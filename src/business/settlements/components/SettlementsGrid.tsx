/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import { SelectionMode, DetailsListLayoutMode, IconButton } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import {
  DetailsList,
  FilteredColumn,
  SortedColumnInfo,
} from "../../../shared/components/customDetailList/CustomDetailList";
import { ColumnInfo } from "../../../shared/components/customDetailList/FilteredHeaderColumn";
import { SettlementDTO } from "../../../shared/models/SettlementDTO";
import { NavLink, useNavigate } from "react-router-dom";
import { DatesUtil } from "../../../shared/utils/datesUtil";
import { SettlementDocumentType } from "../../../shared/constants/constants";

interface GridProps {
  items: SettlementDTO[];
  onChanged?: (
    pageIndex: number,
    filteredColumn: FilteredColumn[],
    sortedColumn?: SortedColumnInfo
  ) => boolean;
  onNbItemPerPageChanged: (nbItemPerPage: number) => boolean;
}

export const SettlementsGrid: FC<GridProps> = (props: GridProps) => {
  const { t } = useTranslation(["settlements", "common"]);
  const [columns, setColumns] = useState<ColumnInfo[]>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { items: itemsProps, onChanged, onNbItemPerPageChanged } = props;
  const navigate = useNavigate();

  const [items, setItems] = useState<SettlementDTO[]>([]);

  useEffect(() => {
    setItems(itemsProps?.slice());
  }, [itemsProps]);

  useEffect(() => {
    let gridColumns = [
      {
        key: "settlementNo",
        name: t("settlementNumber"),
        fieldName: "SettlementNo",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: SettlementDTO) => {
          return (
            <div>
                {item.SettlementNo}
            </div>
          );
        },
      },
      {
        key: "ContractNo",
        name: t("contractNo"),
        fieldName: "ContractNo",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true
      },
      {
        key: "assignEstablishment",
        name: t("assignEstablishment"),
        fieldName: "AssignEstablishment",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true
      },
      {
        key: "execEstablishment",
        name: t("execEstablishment"),
        fieldName: "ExecEstablishment",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true
      },
      {
        key: "settlementType",
        name: t("settlementDocumentType"),
        fieldName: "settlementType",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: SettlementDTO) => {
          return <div>{item.DocumentType === SettlementDocumentType.Invoice ? t('invoice') : t('clearance')}</div>;
        },
      },
      {
        key: "settlementStartDate",
        name: t("operationStartDate"),
        fieldName: "SettlementStartDate",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: SettlementDTO) => {
          return (
            <div>
              {DatesUtil.getLocalizedDateTime("Date", item.OperationStartDate)}
            </div>
          );
        },
      },
      {
        key: "settlementEndDate",
        name: t("operationEndDate"),
        fieldName: "SettlementEndDate",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: SettlementDTO) => {
          return (
            <div>
              {DatesUtil.getLocalizedDateTime("Date", item.OperationEndDate)}
            </div>
          );
        },
      },
      {
        key: "action",
        name: "",
        fieldName: "",
        minWidth: 60,
        maxWidth: 60,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: SettlementDTO) => {
          return (
            <div>
              <IconButton iconProps={{ iconName: "View" }} onClick={() => navigate(`/requests/search/view/${item.ID}`)} />
              <IconButton iconProps={{ iconName: "Edit" }} onClick={() => navigate(`/requests/search/edit/${item.ID}`)} />
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
