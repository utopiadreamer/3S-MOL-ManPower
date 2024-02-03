/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import {
  SelectionMode,
  DetailsListLayoutMode,
  IconButton,
  IDetailsList,
  ActionButton,
} from "@fluentui/react";
import { useTranslation } from "react-i18next";
import {
  DetailsList,
  FilteredColumn,
  SortedColumnInfo,
} from "../../../shared/components/customDetailList/CustomDetailList";
import { ColumnInfo } from "../../../shared/components/customDetailList/FilteredHeaderColumn";
import { Claim } from "../../../shared/constants/auth";
import { Mode } from "../../../shared/constants/types";

interface GridProps {
  claims: Claim[];
  onChanged?: (
    pageIndex: number,
    filteredColumn: FilteredColumn[],
    sortedColumn?: SortedColumnInfo
  ) => boolean;
  onNbItemPerPageChanged: (nbItemPerPage: number) => boolean;
  onDelete: () => void;
  onRealod: () => void;
  reload?: boolean;
  mode: Mode;
}

export const ClaimsGrid: FC<GridProps> = (props: GridProps) => {
  const { t } = useTranslation(["security", "common"]);
  const [columns, setColumns] = useState<ColumnInfo[]>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const {
    claims,
    onChanged,
    onNbItemPerPageChanged,
    reload,
    onRealod,
    onDelete,
    mode,
  } = props;
  const [editMode, setEditMode] = useState<Mode>(mode);
  const _root = React.createRef<IDetailsList>();

  const [items, setItems] = useState<Claim[]>();

  useEffect(() => {
    setItems(claims?.slice());
  }, [claims]);

  useEffect(() => {
    setEditMode(mode);
  }, [mode]);

  useEffect(() => {
    if (reload) {
      setItems(claims?.slice());
      onRealod();
    }
    _root?.current?.focusIndex(claims.length, true);
  }, [reload]);

  const deleteClaim = (claim: string) => {
    const index = claims.findIndex((i) => i.toString() === claim);
    if (index !== -1) {
      const filtered = claims;
      filtered.splice(index, 1);
      setItems(filtered);
    }
    onDelete();
  };

  useEffect(() => {
    let gridColumns = [
      {
        key: "name",
        name: t("claimName"),
        fieldName: "Name",
        minWidth: 400,
        maxWidth: 400,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: Claim) => {
          return <div>{t(item)}</div>;
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
        onRender: (item: Claim) => {
          return (
            <div>
              {editMode !== Mode.View && (
                <ActionButton
                  iconProps={{ iconName: "Delete" }}
                  onClick={() => deleteClaim(item)}
                />
              )}
            </div>
          );
        },
      },
    ];

    setColumns(gridColumns);
  }, [editMode]);

  return (
    <DetailsList
      componentRef={_root}
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
