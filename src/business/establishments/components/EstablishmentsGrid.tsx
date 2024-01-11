/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import { SelectionMode, DetailsListLayoutMode } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import "../styles/EstablishmentsList.scss";
import {
  DetailsList,
  FilteredColumn,
  SortedColumnInfo,
} from "../../../shared/components/customDetailList/CustomDetailList";
import {
  ColumnInfo,
  FilterType,
} from "../../../shared/components/customDetailList/FilteredHeaderColumn";
import { EstablishmentDTO } from "../../settlements/context/DTOs";
import { EstablishmentType } from "../../../shared/constants/constants";

interface GridProps {
  type?: string;
  items: EstablishmentDTO[];
  onChanged?: (
    pageIndex: number,
    filteredColumn: FilteredColumn[],
    sortedColumn?: SortedColumnInfo
  ) => boolean;
  onNbItemPerPageChanged: (nbItemPerPage: number) => boolean;
}

export const EstablishmentsGrid: FC<GridProps> = (props: GridProps) => {
  const { t } = useTranslation(["establishments", "common"]);
  const [columns, setColumns] = useState<ColumnInfo[]>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(10);
  const { items: itemsProps, onChanged, onNbItemPerPageChanged, type } = props;

  const [items, setItems] = useState<EstablishmentDTO[]>([]);

  useEffect(() => {
    setItems(itemsProps?.slice());
  }, [itemsProps]);

  const establishmentTypes = [
    {
      key: EstablishmentType.Person,
      text: t("person"),
    },
    {
      key: EstablishmentType.Company,
      text: t("company"),
    },
    {
      key: EstablishmentType.Government,
      text: t("government"),
    },
  ];

  useEffect(() => {
    const personsColumns = [
      {
        key: "nationalID",
        name: t("nationalID"),
        fieldName: "nationalID",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "insuranceNumber",
        name: t("insuranceNumber"),
        fieldName: "insuranceNumber",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
      },
    ];

    const companiesColumns = [
      {
        key: "commRegistrationNo",
        name: t("commRegistrationNo"),
        fieldName: "commRegistrationNo",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "taxNumber",
        name: t("taxNumber"),
        fieldName: "taxNumber",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
      },
    ];

    const governColumns = [
      {
        key: "institutionalCode",
        name: t("institutionalCode"),
        fieldName: "institutionalCode",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
      },
    ];

    const restColumns = [
      {
        key: "address",
        name: t("address"),
        fieldName: "address",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "phoneNumber",
        name: t("phoneNumber"),
        fieldName: "phoneNumber",
        minWidth: 150,
        maxWidth: 150,
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
        isResizable: false,
      },
    ];

    let gridColumns = [
      {
        key: "establishmentType",
        name: t("establishmentType"),
        fieldName: "establishmentType",
        filterOption: {
          placeholder: "",
          type: FilterType.Enum,
          fieldNames: [
            {
              fieldName: "establishmentType",
              displayName: t("establishmentType"),
              options: establishmentTypes,
            },
          ],
        },
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "name",
        name: t("name"),
        fieldName: "name",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
      },
    ];

    let arr: any[] = gridColumns;
    if (type === "persons") {
      arr = [...gridColumns, ...personsColumns];
    } else if (type === "companies") {
      arr = [...gridColumns, ...companiesColumns];
    } else if (type === "governments") {
      arr = [...gridColumns, ...governColumns];
    }
    const cols = [...arr, ...restColumns];
    setColumns(cols);
  }, [type]);

  return (
    <DetailsList
      className="grid submissionDetails"
      columns={columns ?? []}
      items={[items]}
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
