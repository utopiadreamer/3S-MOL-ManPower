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
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import { RequestDTO } from "../../../shared/models/RequestDTO";
import { DatesUtil } from "../../../shared/utils/datesUtil";
import { RequestType } from "../../../shared/constants/types";

interface GridProps {
  items: RequestDTO[];
  onChanged?: (
    pageIndex: number,
    filteredColumn: FilteredColumn[],
    sortedColumn?: SortedColumnInfo
  ) => boolean;
  onNbItemPerPageChanged: (nbItemPerPage: number) => boolean;
}

export const RequestsGrid: FC<GridProps> = (props: GridProps) => {
  const { t } = useTranslation(["requests", "common"]);
  const [columns, setColumns] = useState<ColumnInfo[]>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { items: itemsProps, onChanged, onNbItemPerPageChanged } = props;

  const [items, setItems] = useState<RequestDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(itemsProps?.slice());
  }, [itemsProps]);

  useEffect(() => {
    let gridColumns = [
      {
        key: "id",
        name: t("id"),
        fieldName: "ID",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: RequestDTO) => {
          return <div>{item.ID}</div>;
        },
      },
      {
        key: "code",
        name: t("code"),
        fieldName: "Code",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: RequestDTO) => {
          return <div>{item.Code}</div>;
        },
      },
      {
        key: "type",
        name: t("type"),
        fieldName: "Type",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: RequestDTO) => {
          return <div>{t(item.Type)}</div>;
        },
      },
      {
        key: "date",
        name: t("date"),
        fieldName: "Date",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: RequestDTO) => {
          return <div>{DatesUtil.getLocalizedDateTime("Date", item.Date)}</div>;
        },
      },
      {
        key: "status",
        name: t("status"),
        fieldName: "Status",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: RequestDTO) => {
          return <div>{t(item.Status)}</div>;
        },
      },
      {
        key: "metedata",
        name: t("metedata"),
        fieldName: "Metadata",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: RequestDTO) => {
          return <div>{item.Metadata}</div>;
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
        onRender: (item: RequestDTO) => {
          return (
            <div>
              <IconButton iconProps={{ iconName: "View" }} onClick={() => navigate(`/requests/mine/view/${item.ID}`)} />
              <IconButton iconProps={{ iconName: "Edit" }} onClick={() => navigate(`/requests/mine/edit/${item.ID}`)} />
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
