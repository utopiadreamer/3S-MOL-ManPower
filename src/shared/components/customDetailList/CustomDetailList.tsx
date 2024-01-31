/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useReducer, useEffect } from "react";
import {
  ShimmeredDetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  ISelection,
  IRenderFunction,
  IDetailsFooterProps,
  IDetailsRowProps,
  DetailsRow,
  IRefObject,
  IDetailsList,
} from "@fluentui/react";
import clsx from "clsx";
import {
  copyAndSortItems,
  PageInfo,
  pagination,
  BuildPagination,
  FilterFunction,
  PaginationSetting,
} from "./ItemHelper";
import {
  ColumnInfo,
  FilteredHeaderColumn,
  ValueComparator,
  FilterCriteria,
} from "./FilteredHeaderColumn";
import "./CustomDetailList.scss";
import Pagination, { NavigationAction } from "./Pagination";
import { CustomHeaderColumn } from "./CustomHeaderColumn";

export type OnFilterChanged = (filteredColumn: FilteredColumn[]) => boolean;
export type OnPageChanged = (pageIndex: number) => boolean;
export type OnSortChanged = (sortedColumn: SortedColumnInfo) => boolean;
export type OnChanged = (
  pageIndex: number,
  filteredColumn: FilteredColumn[],
  sortedColumn?: SortedColumnInfo
) => boolean;
export type OnNbItemPerPageChanged = (nbItemPerPage: number) => boolean;
export interface SortedColumnInfo {
  name: string;
  key: string;
  isSortDesc: boolean;
}
export interface CustomDetailListLabelsProps {
  resultPerPage?: string;
  totalRecord?: string;
}
export type ReceiveItemsBehavior = "ResetInternalState" | "KeepInternalState";
export interface CustomDetailListProps {
  className?: string;
  selectionMode?: SelectionMode;
  selection?: ISelection;
  layoutMode?: DetailsListLayoutMode;
  columns: ColumnInfo[];
  items?: any[];
  onReceiveItemsBehavior?: ReceiveItemsBehavior;
  totalItemCount?: number;
  paginationSetting?: PaginationSetting;
  onFilterChanged?: OnFilterChanged;
  onPageChanged?: OnPageChanged;
  onSortChanged?: OnSortChanged;
  onChanged?: OnChanged;
  onNbItemPerPageChanged?: OnNbItemPerPageChanged;
  noItemsPlaceholder: React.ReactNode;
  onRenderDetailsFooter?: IRenderFunction<IDetailsFooterProps>;
  labels: CustomDetailListLabelsProps;
  forceResetFilter?: boolean;
  onRowClick?: (item: any) => void;
  enableShimmer?: boolean;
  shimmerLines?: number;
  setKey?: string;
  selectionPreservedOnEmptyClick?: boolean;
  loadingMessage?: string;
  componentRef?: IRefObject<IDetailsList>;
}

export interface FilteredColumn {
  columnName: string;
  fieldName: string;
  valueAccessor?: (root: any) => any;
  valueComparator?: ValueComparator;
  criteria: FilterCriteria[];
}
interface CustomDetailListState {
  columns: ColumnInfo[];
  items?: any[];
  itemsFiltered?: any[];
  itemsView?: any[];
  pageInfo?: PageInfo;
  nbSelectedItemPerPage?: number;
  sortedColumnName?: string;
  sortedColumnkey?: string;
  sortedDirection?: "Asc" | "Desc";
  filteredColumns: FilteredColumn[];
}

export type ReceivedColumnsDefinition = {
  type: "receivedColumnsDefinition";
  columns: ColumnInfo[];
};
export type ReceivedNewItemsAction = {
  type: "receivedNewItems";
  payload: { items: any[]; onReceiveItemsBehavior: ReceiveItemsBehavior };
};
export type PageSettingChangedAction = {
  type: "pageSettingChanged";
  paginationSetting?: PaginationSetting;
};
export type FilterAction =
  | { type: "Addfilter"; columnName: string; criteria: FilterCriteria[] }
  | { type: "Removefilter"; columnName: string }
  | { type: "resetFilters" };

export type CustomDetailListAction =
  | { type: "sortDesc"; columnName: string }
  | { type: "sortAsc"; columnName: string }
  | NavigationAction
  | ReceivedNewItemsAction
  | ReceivedColumnsDefinition
  | PageSettingChangedAction
  | FilterAction;

const getFilterFunctions = (
  filteredColumns: FilteredColumn[]
): FilterFunction<any> | null => {
  return filteredColumns.length > 0
    ? (v: any): boolean => {
        let result = true;
        // eslint-disable-next-line no-restricted-syntax
        for (const filteredColumn of filteredColumns) {
          const selfAccess = (obj: any) => obj;
          const value = filteredColumn.valueAccessor
            ? filteredColumn.valueAccessor(v)
            : selfAccess(v);

          result = filteredColumn.criteria.some((crit) => {
            let res = true;

            if (filteredColumn.valueComparator) {
              if (
                !filteredColumn.valueComparator(
                  value[crit.fieldName],
                  crit.filterValue
                )
              ) {
                res = false;
              }
            } else if (value[crit.fieldName] !== crit.filterValue) {
              res = false;
            }

            return res;
          });

          if (result === false) {
            break;
          }
        }
        return result;
      }
    : null;
};
function addFilter(
  currentFilteredColumns: FilteredColumn[],
  columns: ColumnInfo[],
  columnName: string,
  criteria: FilterCriteria[]
) {
  const filteredColumns = [...currentFilteredColumns];
  const existingFilter = filteredColumns.filter(
    (c) => c.columnName === columnName
  )[0];
  if (existingFilter) {
    existingFilter.criteria = criteria;
  } else {
    const newFilteredColumn = columns.filter((c) => c.name === columnName)[0];
    filteredColumns.push({
      columnName,
      fieldName: newFilteredColumn.fieldName ?? newFilteredColumn.key,
      criteria,
      valueAccessor: newFilteredColumn.valueAccesor,
      valueComparator: newFilteredColumn.filterOption?.comparator,
    });
  }
  return filteredColumns;
}
function removeFilter(
  currentFilteredColumns: FilteredColumn[],
  columnName: string
) {
  return currentFilteredColumns.filter((c) => c.columnName !== columnName);
}
function detailListReducer(
  state: CustomDetailListState,
  action: CustomDetailListAction
): CustomDetailListState {
  const selfAccess = (obj: any) => obj;
  let selectedColumn: ColumnInfo;
  let filteredColumns: FilteredColumn[];
  let sortedColumn: ColumnInfo | null;
  let itemsSortedAndFiltered;
  let newPageInfo;

  switch (action.type) {
    case "receivedColumnsDefinition": {
      const cols = [...action.columns];
      if (state.sortedColumnkey) {
        for (let index = 0; index < cols.length; index += 1) {
          if (cols[index].key === state.sortedColumnkey) {
            cols[index].isSorted = true;
            cols[index].isSortedDescending = state.sortedDirection === "Desc";
          } else {
            cols[index].isSortedDescending = undefined;
            cols[index].isSorted = undefined;
          }
        }
      }
      return { ...state, columns: cols };
    }
    case "pageSettingChanged":
      if (action.paginationSetting) {
        newPageInfo = BuildPagination(
          action.paginationSetting?.initialPage ?? 0,
          state.itemsFiltered ?? state.items,
          {
            ...action.paginationSetting,
            nbItemPerPage:
              state.nbSelectedItemPerPage ??
              action.paginationSetting?.nbItemPerPage,
          }
        );
      } else {
        newPageInfo = undefined;
      }
      return {
        ...state,
        itemsView: pagination(state.itemsFiltered ?? state.items, newPageInfo),
        pageInfo: newPageInfo,
      };

    case "itemsPerPageNumberChanged":
      if (action.numberOfItemPerPage !== state.nbSelectedItemPerPage) {
        newPageInfo = BuildPagination(0, state.itemsFiltered ?? state.items, {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...state.pageInfo!.paginationSetting,
          nbItemPerPage: action.numberOfItemPerPage,
        });
        return {
          ...state,
          itemsView: pagination(
            state.itemsFiltered ?? state.items,
            newPageInfo
          ),
          pageInfo: newPageInfo,
          nbSelectedItemPerPage: action.numberOfItemPerPage,
        };
      }
      return { ...state };
    case "receivedNewItems": {
      let filtersItems = action.payload.items;
      if (action.payload.onReceiveItemsBehavior === "ResetInternalState") {
        newPageInfo = BuildPagination(
          state.pageInfo?.paginationSetting?.initialPage ?? 0,
          action.payload.items,
          state.pageInfo?.paginationSetting
        );
      } else {
        sortedColumn = state.sortedColumnkey
          ? state.columns.filter((c) => c.key === state.sortedColumnkey)[0]
          : null;
        filtersItems = copyAndSortItems(
          action.payload.items,
          getFilterFunctions(state.filteredColumns),
          sortedColumn?.valueAccesor ?? selfAccess,
          sortedColumn?.fieldName ?? sortedColumn?.key,
          state.sortedDirection === "Desc"
        );
        newPageInfo = state.pageInfo
          ? BuildPagination(
              state.pageInfo?.currentPage ??
                state.pageInfo?.paginationSetting?.initialPage ??
                0,
              filtersItems,
              state.pageInfo?.paginationSetting
            )
          : undefined;
      }
      return {
        ...state,
        items: action.payload.items,
        itemsFiltered: filtersItems,
        itemsView: pagination(filtersItems, newPageInfo),
        pageInfo: newPageInfo,
      };
    }
    case "Addfilter":
      if (!state.items) return state;
      filteredColumns = addFilter(
        state.filteredColumns,
        state.columns,
        action.columnName,
        action.criteria
      );
      sortedColumn = state.sortedColumnkey
        ? state.columns.filter((c) => c.key === state.sortedColumnkey)[0]
        : null;
      itemsSortedAndFiltered = copyAndSortItems(
        state.items,
        getFilterFunctions(filteredColumns),
        sortedColumn?.valueAccesor ?? selfAccess,
        sortedColumn?.fieldName ?? sortedColumn?.key,
        state.sortedDirection === "Desc"
      );
      newPageInfo = state.pageInfo
        ? BuildPagination(
            state.pageInfo?.currentPage,
            itemsSortedAndFiltered,
            state.pageInfo?.paginationSetting
          )
        : undefined;
      return {
        ...state,
        filteredColumns,
        itemsFiltered: itemsSortedAndFiltered,
        itemsView: pagination(itemsSortedAndFiltered, newPageInfo),
        pageInfo: newPageInfo,
      };
    case "Removefilter":
      if (!state.items) return state;
      filteredColumns = removeFilter(state.filteredColumns, action.columnName);

      sortedColumn = state.sortedColumnkey
        ? state.columns.filter((c) => c.name === state.sortedColumnkey)[0]
        : null;
      itemsSortedAndFiltered = copyAndSortItems(
        state.items,
        getFilterFunctions(filteredColumns),
        sortedColumn?.valueAccesor ?? selfAccess,
        sortedColumn?.fieldName ?? sortedColumn?.key,
        state.sortedDirection === "Desc"
      );
      newPageInfo = state.pageInfo
        ? BuildPagination(
            state.pageInfo?.currentPage,
            itemsSortedAndFiltered,
            state.pageInfo?.paginationSetting
          )
        : undefined;

      return {
        ...state,
        filteredColumns,
        itemsFiltered: itemsSortedAndFiltered,
        itemsView: pagination(itemsSortedAndFiltered, newPageInfo),
        pageInfo: newPageInfo,
      };
    case "sortAsc":
      if (!state.items) return state;
      [selectedColumn] = state.columns.filter(
        (c) => c.name === action.columnName
      );
      itemsSortedAndFiltered = copyAndSortItems(
        state.items,
        getFilterFunctions(state.filteredColumns),
        selectedColumn.valueAccesor ?? selfAccess,
        selectedColumn?.fieldName ?? selectedColumn?.key,
        false
      );
      return {
        ...state,
        columns: state.columns.map((c) => ({
          ...c,
          isSortedDescending: c.name === action.columnName,
          isSorted: c.name === action.columnName,
        })),
        sortedColumnName: selectedColumn.name,
        sortedColumnkey: selectedColumn.key,
        sortedDirection: "Asc",
        itemsFiltered: itemsSortedAndFiltered,
        itemsView: pagination(itemsSortedAndFiltered, state.pageInfo),
      };
    case "sortDesc":
      if (!state.items) return state;
      [selectedColumn] = state.columns.filter(
        (c) => c.name === action.columnName
      );
      itemsSortedAndFiltered = copyAndSortItems(
        state.items,
        getFilterFunctions(state.filteredColumns),
        selectedColumn.valueAccesor ?? selfAccess,
        selectedColumn?.fieldName ?? selectedColumn?.key,
        true
      );
      return {
        ...state,
        columns: state.columns.map((c) => ({
          ...c,
          isSortedDescending: c.name !== action.columnName,
          isSorted: c.name === action.columnName,
        })),
        sortedColumnName: selectedColumn.name,
        sortedColumnkey: selectedColumn.key,
        sortedDirection: "Desc",
        itemsFiltered: itemsSortedAndFiltered,
        itemsView: pagination(itemsSortedAndFiltered, state.pageInfo),
      };
    case "resetFilters":
      return { ...state, filteredColumns: [] };
    case "beginNav":
    case "endNav":
    case "pageNav":
      if (state.pageInfo) {
        switch (action.type) {
          case "beginNav":
            newPageInfo = { ...state.pageInfo, currentPage: 0 };
            break;
          case "endNav":
            newPageInfo = {
              ...state.pageInfo,
              currentPage: state.pageInfo.totalPage - 1,
            };
            break;
          case "pageNav":
            newPageInfo = {
              ...state.pageInfo,
              currentPage: action.pageNumber,
            };
            break;
          default:
            throw new Error("navigation page action invalid");
        }
        return {
          ...state,
          itemsView: pagination(state.itemsFiltered, newPageInfo),
          pageInfo: newPageInfo,
        };
      }
      return {
        ...state,
        itemsView: pagination(state.itemsFiltered),
      };
    default:
      return { ...state };
  }
}
function getSortedColumnInfo(
  state: CustomDetailListState
): SortedColumnInfo | undefined {
  if (state.sortedColumnName && state.sortedColumnkey) {
    const col = state.columns.filter((c) => c.key === state.sortedColumnkey);
    return {
      name: state.sortedColumnName,
      key: state.sortedColumnkey,
      isSortDesc:
        col && col.length === 1 ? col[0]?.isSortedDescending ?? false : false,
    };
  }
  return undefined;
}
const CustomDetailList: FC<CustomDetailListProps> = (
  props: CustomDetailListProps
) => {
  const {
    paginationSetting,
    items,
    totalItemCount,
    columns,
    onChanged,
    onFilterChanged,
    noItemsPlaceholder,
    className,
    layoutMode,
    onPageChanged,
    onSortChanged,
    onNbItemPerPageChanged,
    selectionMode,
    selection,
    onRenderDetailsFooter,
    labels,
    forceResetFilter,
    onRowClick,
    enableShimmer,
    shimmerLines,
    setKey,
    selectionPreservedOnEmptyClick,
    onReceiveItemsBehavior,
    loadingMessage,
    componentRef,
  } = props;
  const [state, dispatch] = useReducer(
    detailListReducer,
    {
      columns: [],
      filteredColumns: [],
    },
    () => {
      const pageInfo = BuildPagination(0, items, paginationSetting);
      return {
        columns,
        items,
        itemsView: pagination(items, pageInfo),
        pageInfo,
        filteredColumns: [],
      };
    }
  );

  const pageInfo =
    paginationSetting?.currentPage != null &&
    paginationSetting?.totalPage != null
      ? {
          ...state.pageInfo,
          currentPage: paginationSetting.currentPage,
          totalPage: paginationSetting.totalPage,
          paginationSetting: state.pageInfo
            ? state.pageInfo.paginationSetting
            : paginationSetting,
        }
      : state.pageInfo;

  const currentPage = paginationSetting?.currentPage;
  const totalPage = paginationSetting?.totalPage;

  useEffect(() => {
    if (state.pageInfo && paginationSetting) {
      if (
        state.pageInfo.paginationSetting.nbPageShown ===
          paginationSetting.nbPageShown &&
        state.pageInfo.paginationSetting.nbItemPerPage ===
          paginationSetting.nbItemPerPage &&
        paginationSetting.totalPage === undefined &&
        paginationSetting.currentPage === undefined
      ) {
        // if pagination is not manage externaly and nothing change except paginationSetting.initialPage then do not dispatch action
        return;
      }
    }
    dispatch({ type: "pageSettingChanged", paginationSetting });
  }, [paginationSetting, currentPage, totalPage]);
  useEffect(() => {
    if (items) {
      dispatch({
        type: "receivedNewItems",
        payload: {
          items,
          onReceiveItemsBehavior:
            onReceiveItemsBehavior ?? "ResetInternalState",
        },
      });
    }
  }, [items, onReceiveItemsBehavior]);
  useEffect(() => {
    let handle = false;
    if (onFilterChanged) {
      handle = onFilterChanged([]);
    }
    if (onChanged) {
      handle = onChanged(
        state.pageInfo?.currentPage ?? 0,
        [],
        getSortedColumnInfo(state)
      );
    }
    if (!handle) {
      dispatch({ type: "resetFilters" });
    }
  }, [forceResetFilter]);
  useEffect(() => {
    dispatch({ type: "receivedColumnsDefinition", columns });
  }, [columns]);
  const onHeaderColumnClick = (
    pageIndex: number,
    ev?: React.MouseEvent<HTMLElement>,
    col?: ColumnInfo
  ) => {
    if (col) {
      let handled = false;
      if (!col.allowSorting) return;
      const isSortingDesc =
        col.isSortedDescending === undefined ? true : col.isSortedDescending;
      const sortedColumn = {
        name: col.name,
        key: col.key,
        isSortDesc: !isSortingDesc,
      };
      if (onSortChanged) {
        handled = onSortChanged(sortedColumn);
      }
      if (onChanged) {
        handled = onChanged(pageIndex, state.filteredColumns, sortedColumn);
      }
      if (!handled) {
        dispatch({
          type: sortedColumn.isSortDesc ? "sortDesc" : "sortAsc",
          columnName: sortedColumn.name,
        });
      }
    }
  };
  const onHeaderFilterApply = (
    pageIndex: number,
    col: ColumnInfo,
    criteria?: FilterCriteria[]
  ) => {
    let handled = false;
    if (criteria?.some((v) => !!v.filterValue)) {
      const newFilters = addFilter(
        state.filteredColumns,
        state.columns,
        col.name,
        criteria
      );
      if (onFilterChanged) {
        handled = onFilterChanged(newFilters);
      }
      if (onChanged) {
        handled = onChanged(
          state.pageInfo?.currentPage ?? 0,
          newFilters,
          getSortedColumnInfo(state)
        );
      }
      if (!handled) {
        dispatch({
          type: "Addfilter",
          columnName: col.name,
          criteria,
        });
      }
    } else {
      const filters = removeFilter(state.filteredColumns, col.name);
      if (onFilterChanged) {
        handled = onFilterChanged(filters);
      }
      if (onChanged) {
        handled = onChanged(pageIndex, filters, getSortedColumnInfo(state));
      }
      if (!handled) {
        dispatch({
          type: "Removefilter",
          columnName: col.name,
        });
      }
    }
  };
  const onNavigate = (action: NavigationAction) => {
    let handled = false;
    let pageIndex = 0;
    switch (action.type) {
      case "pageNav":
        pageIndex = action.pageNumber;
        break;
      case "beginNav":
        pageIndex = 0;
        break;
      case "endNav":
        pageIndex = pageInfo?.totalPage ? pageInfo?.totalPage - 1 : 0;
        break;
      case "itemsPerPageNumberChanged":
        if (onNbItemPerPageChanged) {
          if (onNbItemPerPageChanged(action.numberOfItemPerPage)) {
            return;
          }
        }
        break;
      default:
        break;
    }
    if (onPageChanged) {
      handled = onPageChanged(pageIndex);
    }
    if (onChanged) {
      handled = onChanged(
        pageIndex,
        state.filteredColumns,
        getSortedColumnInfo(state)
      );
    }
    if (!handled) {
      dispatch(action);
    }
  };
  const onRenderRow = (
    detailsRowProps?: IDetailsRowProps
  ): JSX.Element | null => {
    if (detailsRowProps) {
      return (
        <div
          aria-hidden
          onClick={() => {
            if (onRowClick) {
              onRowClick(detailsRowProps.item);
            }
          }}
        >
          <DetailsRow {...detailsRowProps} />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={clsx(
        "mol-detailListWrapper",
        loadingMessage ? "readonly" : ""
      )}
    >
      <ShimmeredDetailsList
        componentRef={componentRef}
        className={className}
        items={state.itemsView ?? []}
        columns={state.columns}
        selectionMode={selectionMode}
        layoutMode={layoutMode}
        setKey={setKey}
        selectionPreservedOnEmptyClick={selectionPreservedOnEmptyClick}
        selection={selection}
        shimmerLines={shimmerLines}
        enableShimmer={enableShimmer}
        onRenderRow={onRenderRow}
        onColumnHeaderClick={(ev, colInfo) =>
          onHeaderColumnClick(pageInfo?.currentPage ?? 0, ev, colInfo)
        }
        onRenderDetailsFooter={onRenderDetailsFooter}
        onRenderDetailsHeader={(headerProps, defaultRender?) => {
          if (defaultRender && headerProps) {
            return defaultRender({
              ...headerProps,
              // eslint-disable-next-line react/display-name
              onRenderColumnHeaderTooltip: (tooltipHostProps, df) => {
                if (tooltipHostProps?.column) {
                  const columnInfo = tooltipHostProps.column as ColumnInfo;
                  if (columnInfo?.filterOption) {
                    // eslint-disable-next-line react/prop-types
                    return (
                      <FilteredHeaderColumn
                        column={columnInfo}
                        filter={columnInfo.filterOption}
                        onColumnClick={(ev, colInfo) =>
                          onHeaderColumnClick(
                            pageInfo?.currentPage ?? 0,
                            ev,
                            colInfo
                          )
                        }
                        onfilterApply={(col, criteria) =>
                          onHeaderFilterApply(
                            pageInfo?.currentPage ?? 0,
                            col,
                            criteria
                          )
                        }
                        forceResetFilter={forceResetFilter}
                      />
                    );
                  }
                  if (columnInfo.nameAsJsx) {
                    return (
                      <CustomHeaderColumn
                        column={columnInfo}
                        onColumnClick={(ev, colInfo) =>
                          onHeaderColumnClick(
                            pageInfo?.currentPage ?? 0,
                            ev,
                            colInfo
                          )
                        }
                      />
                    );
                  }
                }
                if (df) {
                  return df(tooltipHostProps);
                }
                return <></>;
              },
            });
          }
          return <></>;
        }}
      />
      <div className="mol-detailList">
        {!enableShimmer && state.itemsView && state.itemsView.length === 0 && (
          <div className="centerFlex">{noItemsPlaceholder}</div>
        )}
        <>
          {pageInfo &&
            state.itemsView &&
            state.itemsView.length > 0 &&
            pageInfo.totalPage > 0 && (
              <Pagination
                itemsPerPage={pageInfo.paginationSetting.nbItemPerPage}
                currentPageIndex={pageInfo.currentPage}
                totalPageCount={pageInfo.totalPage}
                labels={{
                  resultPerPage: labels.resultPerPage,
                  totalRecord: labels.totalRecord,
                }}
                totalRecordCount={
                  totalItemCount ?? state.itemsView?.length ?? undefined
                }
                nbPagesShown={pageInfo.paginationSetting.nbPageShown}
                onNavigate={onNavigate}
              />
            )}
        </>
      </div>
    </div>
  );
};

export { CustomDetailList as DetailsList };
