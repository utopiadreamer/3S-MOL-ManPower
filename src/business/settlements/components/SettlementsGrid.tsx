/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import { SelectionMode, DetailsListLayoutMode } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import {
  DetailsList,
  FilteredColumn,
  SortedColumnInfo,
} from "../../../shared/components/customDetailList/CustomDetailList";
import { ColumnInfo } from "../../../shared/components/customDetailList/FilteredHeaderColumn";
import { SettlementDTO } from "../../../shared/models/SettlementDTO";
import { NavLink } from "react-router-dom";
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
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: SettlementDTO) => {
          return (
            <div>
              <NavLink to={`${"/settlements"}/${item.ID}`} className={"navLink"}>
                {item.SettlementNo}
              </NavLink>
            </div>
          );
        },
      },
      {
        key: "ContractNo",
        name: t("contractNo"),
        fieldName: "ContractNo",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true
      },
      {
        key: "assignEstablishment",
        name: t("assignEstablishment"),
        fieldName: "AssignEstablishmentName",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true
      },
      {
        key: "execEstablishment",
        name: t("execEstablishment"),
        fieldName: "ExecEstablishmentName",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true
      },
      {
        key: "settlementType",
        name: t("settlementDocumentType"),
        fieldName: "settlementType",
        minWidth: 150,
        maxWidth: 150,
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
