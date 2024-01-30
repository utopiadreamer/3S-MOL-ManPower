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
import { CodeDTO } from "../../../shared/models/CodeDTO";
import { DatesUtil } from "../../../shared/utils/datesUtil";
import { CodeType } from "../../../shared/constants/types";
import { getCodesTypes } from "../../../shared/mockups/CodesTypes";
import { getCodes } from "../../../shared/mockups/Codes";

interface GridProps {
  items: CodeDTO[];
  onChanged?: (
    pageIndex: number,
    filteredColumn: FilteredColumn[],
    sortedColumn?: SortedColumnInfo
  ) => boolean;
  onNbItemPerPageChanged: (nbItemPerPage: number) => boolean;
}

export const CodesGrid: FC<GridProps> = (props: GridProps) => {
  const { t } = useTranslation(["codes", "common"]);
  const [columns, setColumns] = useState<ColumnInfo[]>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { items: itemsProps, onChanged, onNbItemPerPageChanged } = props;

  const [items, setItems] = useState<CodeDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(itemsProps?.slice());
  }, [itemsProps]);

  const getCodeType = (codeTypeId: number) => {
    const types = getCodesTypes();
    return types.find((type) => type.ID === codeTypeId)?.Name || "";
  }
  
  const getParentCode = (codeId: number) => {
    const codes = getCodes();
    return codes.find((type) => type.ID === codeId)?.Name || "";
  }

  useEffect(() => {
    let gridColumns = [
      {
        key: "code",
        name: t("code"),
        fieldName: "Code",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true
      },
      {
        key: "name",
        name: t("name"),
        fieldName: "Name",
        minWidth: 300,
        maxWidth: 300,
        isRowHeader: true,
        isResizable: true
      },
      {
        key: "type",
        name: t("codeType"),
        fieldName: "Type",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: CodeDTO) => {
          return <div>{getCodeType(item.CodeTypeID)}</div>;
        },
      },
      {
        key: "parentID",
        name: t("parentID"),
        fieldName: "parentID",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: CodeDTO) => {
          return <div>{getParentCode(item.ParentID ?? 0)}</div>;
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
        onRender: (item: CodeDTO) => {
          return (
            <div>
              <IconButton iconProps={{ iconName: "View" }} onClick={() => navigate(`/codes/${item.ID}`)} />
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
