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
import { UserDTO } from "../../../shared/models/UserDTO";
import { useNavigate } from "react-router-dom";

interface GridProps {
  items: UserDTO[];
  onChanged?: (
    pageIndex: number,
    filteredColumn: FilteredColumn[],
    sortedColumn?: SortedColumnInfo
  ) => boolean;
  onNbItemPerPageChanged: (nbItemPerPage: number) => boolean;
}

export const UsersGrid: FC<GridProps> = (props: GridProps) => {
  const { t } = useTranslation(["security", "common"]);
  const [columns, setColumns] = useState<ColumnInfo[]>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { items: itemsProps, onChanged, onNbItemPerPageChanged } = props;
  const navigate = useNavigate();

  const [items, setItems] = useState<UserDTO[]>([]);

  useEffect(() => {
    setItems(itemsProps?.slice());
  }, [itemsProps]);

  useEffect(() => {
    let gridColumns = [
      {
        key: "name",
        name: t("name"),
        fieldName: "Name",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: UserDTO) => {
          return <div>{item.Name}</div>;
        },
      },
      {
        key: "userName",
        name: t("userName"),
        fieldName: "UserName",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "email",
        name: t("email"),
        fieldName: "Email",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "role",
        name: t("role"),
        fieldName: "Role",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: UserDTO) => {
          return <div>{t(item.Role)}</div>;
        },
      },
      {
        key: "claims",
        name: t("claims"),
        fieldName: "claims",
        minWidth: 150,
        maxWidth: 150,
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
        onRender: (item: UserDTO) => {
          return (
            <div>
              <IconButton
                iconProps={{ iconName: "View" }}
                onClick={() => navigate(`/security/users/${item.ID}`)}
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
