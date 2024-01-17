/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import {
  SelectionMode,
  DetailsListLayoutMode,
  IconButton,
  CommandBar,
} from "@fluentui/react";
import { useTranslation } from "react-i18next";
import "../styles/EstablishmentsList.scss";
import {
  DetailsList,
  FilteredColumn,
  SortedColumnInfo,
} from "../../../shared/components/customDetailList/CustomDetailList";
import { ColumnInfo } from "../../../shared/components/customDetailList/FilteredHeaderColumn";
import { EstablishmentType } from "../../../shared/constants/constants";
import { EstablishmentDTO } from "../../../shared/models/EstablishmentDTO";
import { NavLink } from "react-router-dom";
import '../styles/EstablishmentsList.scss'

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
  const [totalPages, setTotalPages] = useState<number>(1);
  const { items: itemsProps, onChanged, onNbItemPerPageChanged, type } = props;

  const [items, setItems] = useState<EstablishmentDTO[]>([]);

  useEffect(() => {
    setItems(itemsProps?.slice());
  }, [itemsProps]);

  useEffect(() => {
    const personsColumns = [
      {
        key: "nationalID",
        name: t("nationalID"),
        fieldName: "NationalID",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "insuranceNumber",
        name: t("insuranceNumber"),
        fieldName: "InsuranceNumber",
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
        fieldName: "CommRegistrationNo",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "taxNumber",
        name: t("taxNumber"),
        fieldName: "TaxNumber",
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
        fieldName: "InstitutionalCode",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
      },
    ];

    const restColumns = [
      {
        key: "agentName",
        name: t("agentName"),
        fieldName: "AgentName",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "address",
        name: t("address"),
        fieldName: "Address",
        minWidth: 160,
        maxWidth: 160,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "phoneNumber",
        name: t("phoneNumber"),
        fieldName: "PhoneNo",
        minWidth: 120,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
      },
      {
        key: "action",
        name: "",
        fieldName: "",
        minWidth: 50,
        maxWidth: 50,
        isRowHeader: true,
        isResizable: false,
        onRender: () => {
          return (
            <div>
              <IconButton iconProps={{ iconName: "Edit" }} />
            </div>
          );
        },
      },
    ];

    let gridColumns = [
      {
        key: "name",
        name: t("name"),
        fieldName: "Name",
        minWidth: 200,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: EstablishmentDTO) => {
          return (
            <div>
              <NavLink to={`${"/establishments/"}${type}/${item.ID}`} className={'navLink'}>
                {item.Name}
              </NavLink>
            </div>
          );
        },
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
