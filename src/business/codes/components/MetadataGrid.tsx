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
import { Mode } from "../../../shared/constants/types";
import { MetadataDTO } from "../../../shared/models/MetadataDTO";

interface GridProps {
  metadata: MetadataDTO[];
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

export const MetadatasGrid: FC<GridProps> = (props: GridProps) => {
  const { t } = useTranslation(["codes", "common"]);
  const [columns, setColumns] = useState<ColumnInfo[]>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const {
    metadata,
    onChanged,
    onNbItemPerPageChanged,
    reload,
    onRealod,
    onDelete,
    mode,
  } = props;
  const [editMode, setEditMode] = useState<Mode>(mode);
  const _root = React.createRef<IDetailsList>();

  const [items, setItems] = useState<MetadataDTO[]>();

  useEffect(() => {
    setItems(metadata?.slice());
  }, [metadata]);

  useEffect(() => {
    setEditMode(mode);
  }, [mode]);

  useEffect(() => {
    if (reload) {
      setItems(metadata.slice() ?? []);
      onRealod();
    }
    _root?.current?.focusIndex(metadata.length, true);
  }, [reload]);

  const deleteMetadata = (name: string) => {
    const index = metadata.findIndex((i) => i.Name.toString() === name);
    if (index !== -1) {
      const filtered = metadata;
      filtered.splice(index, 1);
      setItems(filtered);
    }
    onDelete();
  };

  useEffect(() => {
    let gridColumns = [
      {
        key: "fieldName",
        name: t("fieldName"),
        fieldName: "Name",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: MetadataDTO) => {
          return <div>{item.Name}</div>;
        },
      },
      {
        key: "fieldLabel",
        name: t("fieldLabel"),
        fieldName: "Name",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: MetadataDTO) => {
          return <div>{item.Label}</div>;
        },
      },
      {
        key: "fieldType",
        name: t("fieldType"),
        fieldName: "fieldType",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: MetadataDTO) => {
          return <div>{t(item.Type.toString())}</div>;
        },
      },
      {
        key: "fieldMaxLength",
        name: t("fieldMaxLength"),
        fieldName: "fieldMaxLength",
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: MetadataDTO) => {
          return <div>{item.MaxLength}</div>;
        },
      },
      {
        key: "fieldMinValue",
        name: t("fieldMinValue"),
        fieldName: "fieldMinValue",
        minWidth: 100,
        maxWidth: 100,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: MetadataDTO) => {
          return <div>{item.MinValue}</div>;
        },
      },
      {
        key: "fieldMaxValue",
        name: t("fieldMaxValue"),
        fieldName: "fieldMaxValue",
        minWidth: 100,
        maxWidth: 100,
        isRowHeader: true,
        isResizable: true,
        onRender: (item: MetadataDTO) => {
          return <div>{item.MaxValue}</div>;
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
        onRender: (item: MetadataDTO) => {
          return (
            <div>
              {editMode !== Mode.View && !item.ReadOnly && (
                <ActionButton
                  iconProps={{ iconName: "Delete" }}
                  onClick={() => deleteMetadata(item.Name)}
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
