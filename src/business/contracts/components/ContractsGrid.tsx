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
import { ContractDTO } from "../../../shared/models/ContractDTO";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/ContractsList.scss";
import { DatesUtil } from "../../../shared/utils/datesUtil";

interface GridProps {
  items: ContractDTO[];
  onChanged?: (
    pageIndex: number,
    filteredColumn: FilteredColumn[],
    sortedColumn?: SortedColumnInfo
  ) => boolean;
  onNbItemPerPageChanged: (nbItemPerPage: number) => boolean;
}

export const ContractsGrid: FC<GridProps> = (props: GridProps) => {
  const { t } = useTranslation(["contracts", "common"]);
  const [columns, setColumns] = useState<ColumnInfo[]>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { items: itemsProps, onChanged, onNbItemPerPageChanged } = props;

  const [items, setItems] = useState<ContractDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(itemsProps?.slice());
  }, [itemsProps]);

  useEffect(() => {
    let gridColumns = [
      {
        key: "contractNo",
        name: t("contractNo"),
        fieldName: "contractNo",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: ContractDTO) => {
          return (
            <div>
                {item.ID}
            </div>
          );
        },
      },
      {
        key: "assignEst",
        name: t("assignEst"),
        fieldName: "assignEst",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: ContractDTO) => {
          return (
            <div>
              <NavLink
                to={`${"/establishments"}/${item?.AssignEstablishment?.Type}/${item?.AssignEstablishment?.ID}`}
                className={"navLink"}
              >
                {item?.AssignEstablishment?.Name}
              </NavLink>
            </div>
          );
        },
      },
      {
        key: "execEst",
        name: t("execEst"),
        fieldName: "execEst",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: ContractDTO) => {
          return (
            <div>
              <NavLink
                to={`${"/establishments"}/${item.ExecEstablishment?.Type}/${item.ExecEstablishment?.ID}`}
                className={"navLink"}
              >
                {item.ExecEstablishment?.Name}
              </NavLink>
            </div>
          );
        },
      },
      {
        key: "contractType",
        name: t("contractType"),
        fieldName: "contractType",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: ContractDTO) => {
          return <div>{t(item.ContractType)}</div>;
        },
      },
      {
        key: "contractStartDate",
        name: t("contractStartDate"),
        fieldName: "ContractStartDate",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: ContractDTO) => {
          return (
            <div>
              {DatesUtil.getLocalizedDateTime("Date", item.ContractStartDate)}
            </div>
          );
        },
      },
      {
        key: "contractEndDate",
        name: t("contractEndDate"),
        fieldName: "ContractEndDate",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: ContractDTO) => {
          return (
            <div>
              {DatesUtil.getLocalizedDateTime("Date", item.ContractEndDate)}
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
        onRender: (item: ContractDTO) => {
          return (
            <div>
              <IconButton iconProps={{ iconName: "View" }} onClick={() => navigate(`/contracts/${item.ID}`)} />
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
