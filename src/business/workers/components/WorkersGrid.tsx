/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import {
  SelectionMode,
  DetailsListLayoutMode,
  IconButton,
} from "@fluentui/react";
import { useTranslation } from "react-i18next";
import "../styles/WorkersList.scss";
import {
  DetailsList,
  FilteredColumn,
  SortedColumnInfo,
} from "../../../shared/components/customDetailList/CustomDetailList";
import { FilterType } from "../../../shared/components/customDetailList/FilteredHeaderColumn";
import { WorkerDTO } from "../../../shared/models/WorkerDTO";
import { Action, Mode } from "../../../shared/constants/types";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { EditableItem } from "../models/EditableItem";
import { ValidationType } from "../../../shared/constants/constants";
import { ValidationUtil } from "../../../shared/utils/validationUtil";

interface GridProps {
  items: WorkerDTO[];
  mode: Mode;
  onChanged?: (
    pageIndex: number,
    filteredColumn: FilteredColumn[],
    sortedColumn?: SortedColumnInfo
  ) => boolean;
  onNbItemPerPageChanged: (nbItemPerPage: number) => boolean;
}

export const WorkersGrid: FC<GridProps> = (props: GridProps) => {
  const { t } = useTranslation(["workers", "common"]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(10);
  const { items: itemsProps, mode } = props;
  const [editInPlace, setEditInPlace] = useState<boolean>(false);

  const [items, setItems] = useState<EditableItem<WorkerDTO>[]>([]);
  const [isNew, setIsNew] = useState<boolean>(false);

  useEffect(() => {
    setItems(
      itemsProps.map((c) => {
        return new EditableItem(c, c, false);
      })
    );
  }, [itemsProps]);

  useEffect(() => {
    if (mode === Mode.New) {
      if (!editInPlace) {
        const newItem = new WorkerDTO();
        newItem.ID = "0";
        // eslint-disable-next-line no-undef
        const newWorker = new EditableItem<WorkerDTO>(newItem, newItem, true);
        items.splice(0, 0, newWorker);

        setItems([...items]);
        setEditInPlace(true);
        setIsNew(true);
      }
    }
  }, [mode]);

  const onValidateEdition = (
    curFieldName: string | null,
    validatedItem: EditableItem<WorkerDTO>
  ): boolean => {
    let isValid = true;

    if (!curFieldName || curFieldName === "NationalID") {
      return ValidationUtil.isValidNationalID(
        validatedItem.editedItem.NationalID
      );
    }

    return isValid;
  };

  const changeItem = (
    curFieldName: string | null,
    id: string | undefined,
    newItem: EditableItem<WorkerDTO>
  ) => {
    const originalItem = items.find((i) => i.item.ID === id ?? 0);
    if (originalItem) {
      const index = items.indexOf(originalItem);
      const newItems = items.slice();
      newItems[index] = { ...originalItem, ...newItem };

      setItems([...newItems]);
    }
  };

  const onSave = async (item: EditableItem<WorkerDTO>) => {
    const isValid = onValidateEdition("NationalID", item);
    if (isValid) {
      setEditInPlace(false);
      changeItem(null, item.item.ID, { ...item, isEdited: false });
    }
  };

  const onDelete = async (item: EditableItem<WorkerDTO>) => {
    const originalItem = items.find((i) => i.item.ID === item.item.ID ?? 0);
    if (originalItem) {
      const index = items.indexOf(originalItem);
      items.splice(index, 1);
      setItems([...items]);
    }
  };

  const onEdit = (item: EditableItem<WorkerDTO>) => {
    setEditInPlace(true);
    setIsNew(false);
    changeItem(null, item.item.ID, { ...item, isEdited: true });
  };

  const cancelChangeItem = (id: string | undefined) => {
    const originalItem = items.filter((i) => i.item.ID === id)[0];
    const index = items.indexOf(originalItem);
    const newItems = items.slice();
    newItems[index] = {
      ...originalItem,
      editedItem: originalItem?.item,
      isEdited: false,
    };
    setItems(newItems);
  };

  const onCancelEdit = (item: EditableItem<WorkerDTO>) => {
    if (isNew) {
      const index = items?.indexOf(item);
      items.splice(index, 1);
      setIsNew(false);
    } else {
      cancelChangeItem(item.item.ID);
    }

    setEditInPlace(false);
  };

  const getTotalPages = (totalNumOfData: number) => {
    const totalNumOfPages = Math.ceil(totalNumOfData / pageSize);
    setTotalPages(totalNumOfPages);
  };

  const onNbItemPerPageChanged = (nbItemPerPage: number) => {
    setPageSize(nbItemPerPage);
    setCurrentPage(1);
    return true;
  };
  const onChanged = (
    pageIndex: number,
    filteredColumns: FilteredColumn[],
    sortedColumn?: SortedColumnInfo
  ) => {
    setCurrentPage(pageIndex + 1);

    return false;
  };

  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;
    const slicedItems = itemsProps?.slice(start, end);

    setItems(
      slicedItems.map((c) => {
        return new EditableItem(c, c, false);
      })
    );
    getTotalPages(itemsProps.length);
  }, [itemsProps, currentPage, pageSize]);

  const gridColumns = [
    {
      key: "Name",
      name: t("workerName"),
      fieldName: "Name",
      filterOption: {
        placeholder: "",
        type: FilterType.Text,
        fieldNames: [
          {
            fieldName: "Name",
            displayName: t("Name"),
          },
        ],
      },
      minWidth: 200,
      maxWidth: 200,
      isRowHeader: true,
      isResizable: true,
      onRender: (item: EditableItem<WorkerDTO>) => {
        return (
          <div className="flex">
            {item.isEdited ? (
              <TextField
                value={item.editedItem.Name}
                onChange={(_, value) => {
                  changeItem("Name", item?.item.ID, {
                    ...item,
                    editedItem: {
                      ...item.editedItem,
                      Name: value ?? "",
                    },
                  });
                }}
                required
              />
            ) : (
              item.editedItem.Name
            )}
          </div>
        );
      },
    },
    {
      key: "NationalID",
      name: t("nationalID"),
      fieldName: "NationalID",
      minWidth: 150,
      maxWidth: 150,
      isRowHeader: true,
      isResizable: true,
      onRender: (item: EditableItem<WorkerDTO>) => {
        return (
          <div className="flex">
            {item.isEdited ? (
              <TextField
                value={item.editedItem.NationalID}
                onChange={(_, value) => {
                  changeItem("NationalID", item?.item.ID, {
                    ...item,
                    editedItem: {
                      ...item.editedItem,
                      NationalID: value ?? "",
                    },
                  });
                }}
                maxLength={14}
                validations={[ValidationType.NationalID]}
                required
              />
            ) : (
              item.editedItem.NationalID
            )}
          </div>
        );
      },
    },
    {
      key: "occupation",
      name: t("occupation"),
      fieldName: "Occupation",
      minWidth: 150,
      maxWidth: 150,
      isRowHeader: true,
      isResizable: true,
      onRender: (item: EditableItem<WorkerDTO>) => {
        return (
          <div className="flex">
            {item.isEdited ? (
              <TextField
                value={item.editedItem.Occupation}
                onChange={(_, value) => {
                  changeItem("occupation", item?.item.ID, {
                    ...item,
                    editedItem: {
                      ...item.editedItem,
                      Occupation: value ?? "",
                    },
                  });
                }}
                required
              />
            ) : (
              item.editedItem.Occupation
            )}
          </div>
        );
      },
    },
    {
      key: "address",
      name: t("address"),
      fieldName: "Address",
      minWidth: 150,
      maxWidth: 150,
      isRowHeader: true,
      isResizable: true,
      onRender: (item: EditableItem<WorkerDTO>) => {
        return (
          <div className="flex">
            {item.isEdited ? (
              <TextField
                value={item.editedItem.Address}
                onChange={(_, value) => {
                  changeItem("Address", item?.item.ID, {
                    ...item,
                    editedItem: {
                      ...item.editedItem,
                      Address: value ?? "",
                    },
                  });
                }}
                required
              />
            ) : (
              item.editedItem.Address
            )}
          </div>
        );
      },
    },
    {
      key: "phoneNo",
      name: t("phoneNo"),
      fieldName: "PhoneNo",
      minWidth: 150,
      maxWidth: 150,
      isRowHeader: true,
      isResizable: true,
      onRender: (item: EditableItem<WorkerDTO>) => {
        return (
          <div className="flex">
            {item.isEdited ? (
              <TextField
                value={item.editedItem.PhoneNo}
                onChange={(_, value) => {
                  changeItem("PhoneNo", item?.item.ID, {
                    ...item,
                    editedItem: {
                      ...item.editedItem,
                      PhoneNo: value ?? "",
                    },
                  });
                }}
                required
              />
            ) : (
              item.editedItem.PhoneNo
            )}
          </div>
        );
      },
    },
    {
      key: "action",
      name: "",
      fieldName: "action",
      minWidth: 100,
      maxWidth: 100,
      isRowHeader: true,
      isResizable: false,
      onRender: (item: EditableItem<WorkerDTO>) => {
        return (
          <div className="actions">
            {item.isEdited ? (
              <>
                <IconButton
                  iconProps={{ iconName: "Save" }}
                  onClick={() => onSave(item)}
                ></IconButton>
                <IconButton
                  iconProps={{ iconName: "Cancel" }}
                  onClick={() => onCancelEdit(item)}
                ></IconButton>
              </>
            ) : (
              <>
                <IconButton
                  iconProps={{ iconName: "Edit" }}
                  onClick={() => onEdit(item)}
                ></IconButton>
                <IconButton
                  iconProps={{ iconName: "Delete" }}
                  onClick={() => onDelete(item)}
                ></IconButton>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <DetailsList
      className="grid"
      columns={gridColumns ?? []}
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
        currentPage: currentPage - 1,
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
