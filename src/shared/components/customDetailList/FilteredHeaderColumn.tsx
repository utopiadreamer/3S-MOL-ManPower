/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import {
  IDropdownOption,
  IColumn,
  IconButton,
  Callout,
  PrimaryButton,
  Label,
} from '@fluentui/react';
import { useTranslation } from 'react-i18next';
import React, { FC, useRef, useReducer, useEffect } from 'react';
import clsx from 'clsx';
import './FilteredHeaderColumn.scss';
import { TextField } from '../forms/CustomTextField';
import { DatePicker } from '../forms/CustomDatePicker';
import { Dropdown } from '../forms/CustomDropdown';

export interface ColumnInfo extends IColumn {
  nameAsJsx?: JSX.Element;
  valueAccesor?: (root: any) => any;
  filterOption?: FilterOption;
  allowSorting?: boolean;
}
export type ValueComparator = (value: any, filterValue: FilterValue) => boolean;
export type FilterValue = Date | string | number | null | undefined;
export interface FieldDefinition {
  fieldName: string;
  displayName: string;
  placeholder?: string;
  options?: IDropdownOption[];
  type?: FilterType;
  selectedKey?: string | number;
  disabled?: boolean;
  className?: string;
  value?: string;
  required?: boolean;
  onDropdownChange?: (value?: IDropdownOption) => void;
}
export interface FilterCriteria {
  fieldName: string;
  filterValue: FilterValue;
}
export type OnFilterCallback = (
  col: ColumnInfo,
  value?: FilterCriteria[]
) => void;

export enum FilterType {
  Label,
  Text,
  Date,
  Enum,
  Custom,
}
export interface FilterOption {
  type: FilterType;
  placeholder: string;
  selectedKey?: string | number;
  options?: IDropdownOption[];
  comparator?: ValueComparator;
  fieldNames?: FieldDefinition[];
  onReset?: () => void;
  onTextChange?: (value: string[]) => void;
  onDateChange?: (value?: Date[]) => void;
  onDropdownChange?: (value?: IDropdownOption[]) => void;
  useFilterButton?: boolean;
}

export interface FilteredHeaderColumnProps {
  column: ColumnInfo;
  filter: FilterOption;
  onColumnClick: (ev?: React.MouseEvent<HTMLElement>, col?: ColumnInfo) => void;
  onfilterApply: OnFilterCallback;
  forceResetFilter?: boolean;
}

export interface FilteredHeaderColumnState {
  fieldLength: number;
  calloutOpen: boolean;
  isFiltered: boolean;
  dateValues: Date[];
  textValues: string[];
  itemValues: IDropdownOption[];
  commitedDateValues: Date[];
  commitedTextValues: string[];
  commitedItemValues: IDropdownOption[];
}

function init(fieldLength: number): FilteredHeaderColumnState {
  return {
    fieldLength,
    calloutOpen: false,
    isFiltered: false,
    textValues: Array<string>(fieldLength),
    dateValues: Array<Date>(fieldLength),
    itemValues: Array<IDropdownOption>(fieldLength),
    commitedTextValues: Array<string>(fieldLength),
    commitedDateValues: Array<Date>(fieldLength),
    commitedItemValues: Array<IDropdownOption>(fieldLength),
  };
}

function updateStateTextValues(
  state: FilteredHeaderColumnState,
  fieldValue: string,
  fieldIndex: number
): FilteredHeaderColumnState {
  return {
    ...state,
    textValues: [...state.textValues].map((v, i) => {
      if (fieldIndex === i) {
        return fieldValue;
      }
      return v;
    }),
  };
}

function updateStateDateValues(
  state: FilteredHeaderColumnState,
  fieldValue: Date,
  fieldIndex: number
): FilteredHeaderColumnState {
  return {
    ...state,
    dateValues: [...state.dateValues].map((v, i) => {
      if (fieldIndex === i) {
        return fieldValue;
      }
      return v;
    }),
  };
}

function updateStateItemValues(
  state: FilteredHeaderColumnState,
  fieldValue: IDropdownOption,
  fieldIndex: number
): FilteredHeaderColumnState {
  const res = {
    ...state,
    itemValues: [...state.itemValues].map((v, i) => {
      if (fieldIndex === i) {
        return fieldValue;
      }
      return v;
    }),
  };

  return res;
}

type TextFieldListAction =
  | { type: 'textValueChanged'; fieldValue: string; fieldIndex: number }
  | { type: 'dateValueChanged'; fieldValue: Date; fieldIndex: number }
  | {
      type: 'itemValueChanged';
      fieldValue: IDropdownOption;
      fieldIndex: number;
    }
  | { type: 'resetFilters' }
  | { type: 'acceptFilters'; isFiltered: boolean }
  | { type: 'openCallout' }
  | { type: 'closeCallout' };

function reducer(
  state: FilteredHeaderColumnState,
  action: TextFieldListAction
) {
  switch (action.type) {
    case 'textValueChanged':
      return updateStateTextValues(state, action.fieldValue, action.fieldIndex);
    case 'dateValueChanged':
      return updateStateDateValues(state, action.fieldValue, action.fieldIndex);
    case 'itemValueChanged':
      return updateStateItemValues(state, action.fieldValue, action.fieldIndex);
    case 'resetFilters':
      return init(state.fieldLength);
    case 'acceptFilters':
      return {
        ...state,
        calloutOpen: false,
        commitedDateValues: state.dateValues,
        commitedTextValues: state.textValues,
        commitedItemValues: state.itemValues,
        isFiltered: action.isFiltered,
      };
    case 'closeCallout':
      return { ...state, calloutOpen: false };
    case 'openCallout':
      return {
        ...state,
        calloutOpen: true,
        dateValues: state.commitedDateValues,
        itemValues: state.commitedItemValues,
        textValues: state.commitedTextValues,
      };
    default:
      return { ...state };
  }
}

export const FilteredHeaderColumn: FC<FilteredHeaderColumnProps> = (
  props: FilteredHeaderColumnProps
) => {
  const { filter, column, forceResetFilter } = props;
  const { fieldNames } = filter;
  const fields = fieldNames ?? [
    {
      fieldName: column.fieldName ?? column.key,
      displayName: column.name,
    },
  ];
  const menuCaretRef = useRef<HTMLSpanElement>(null);
  const [state, dispatch] = useReducer(reducer, fields.length, init);
  const { t } = useTranslation('common');

  const resetFilter = (notify: boolean) => {
    dispatch({ type: 'resetFilters' });

    if (filter.onTextChange) {
      filter.onTextChange([]);
    }
    if (filter.onDropdownChange) {
      filter.onDropdownChange([]);
    }
    if (filter.onDateChange) {
      filter.onDateChange([]);
    }
    if (filter.onReset) {
      filter.onReset();
    }
    if (notify) {
      props.onfilterApply(props.column, undefined);
    }
  };
  useEffect(() => {
    if (forceResetFilter) {
      resetFilter(false);
    }
  }, [forceResetFilter]);

  const getFilterValue = (fieldDef: FieldDefinition, i: number) => {
    let filterValue = undefined;
    if (fieldDef.type === FilterType.Text) {
      filterValue = state.textValues[i];
    } else if (fieldDef.type === FilterType.Date) {
      filterValue = state.dateValues[i];
    } else if (state.itemValues[i] && state.itemValues[i].key !== 'all') {
      filterValue = state.itemValues[i].key;
    }
    return filterValue;
  };

  const acceptFilter = () => {
    if (filter.type === FilterType.Custom) {
      // fields.map((fn, i) => (
      //   getFilter(fn, i)
      // ));

      if (
        state.textValues.some((v) => !!v) ||
        state.itemValues.some((v) => !!v) ||
        state.dateValues.some((v) => !!v)
      ) {
        if (filter.onTextChange) {
          filter.onTextChange(state.textValues);
        }
        if (filter.onDropdownChange) {
          filter.onDropdownChange(state.itemValues);
        }

        props.onfilterApply(
          props.column,
          fields.map((fieldDef, i) => ({
            fieldName: fieldDef.fieldName,
            filterValue: getFilterValue(fieldDef, i),
          }))
        );
      } else {
        props.onfilterApply(props.column, undefined);
      }
    } else {
      switch (filter.type) {
        case FilterType.Text:
          if (state.textValues.some((v) => !!v)) {
            if (filter.onTextChange) {
              filter.onTextChange(state.textValues);
            }
            props.onfilterApply(
              props.column,
              fields.map((fieldDef, i) => ({
                fieldName: fieldDef.fieldName,
                filterValue: state.textValues[i],
              }))
            );
          } else {
            props.onfilterApply(props.column, undefined);
          }
          break;
        case FilterType.Date:
          if (state.dateValues.some((v) => !!v)) {
            if (filter.onDateChange) {
              filter.onDateChange(state.dateValues);
            }
            props.onfilterApply(
              props.column,
              fields.map((fieldDef, i) => ({
                fieldName: fieldDef.fieldName,
                filterValue: state.dateValues[i],
              }))
            );
          } else {
            props.onfilterApply(props.column, undefined);
          }
          break;
        case FilterType.Enum:
          if (state.itemValues.some((v) => !!v)) {
            if (filter.onDropdownChange) {
              filter.onDropdownChange(state.itemValues);
            }
            props.onfilterApply(
              props.column,
              fields.map((fieldDef, i) => ({
                fieldName: fieldDef.fieldName,
                filterValue:
                  state.itemValues[i] && state.itemValues[i].key !== 'all'
                    ? state.itemValues[i].key
                    : undefined,
              }))
            );
          } else {
            props.onfilterApply(props.column, undefined);
          }
          break;
        default:
          break;
      }
    }
    dispatch({
      type: 'acceptFilters',
      isFiltered:
        state.textValues.some((v) => !!v) ||
        state.itemValues.some((v) => !!v && v.key !== 'all') ||
        state.dateValues.some((v) => !!v),
    });
  };

  const getInput = (fn: FieldDefinition, i: number) => {
    const type = filter.type === FilterType.Custom ? fn.type : filter.type;
    switch (type) {
      case FilterType.Label:
        return (
          <>
            <Label key={fn.fieldName} required={fn.required} className={fn.className}>
              {fn.value}
            </Label>
          </>
        );

      case FilterType.Text:
        return (
          <>
            <TextField
              key={fn.fieldName}
              label={fn.displayName}
              placeholder={fn.placeholder ?? filter.placeholder}
              inputMode="search"
              value={state.textValues[i]}
              disabled={fn.disabled}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  acceptFilter();
                }
              }}
              onChange={(_, value) => {
                if (value !== undefined) {
                  dispatch({
                    type: 'textValueChanged',
                    fieldValue: value,
                    fieldIndex: i,
                  });
                }
              }}
            />
          </>
        );
      case FilterType.Date:
        return (
          <>
            <DatePicker
              key={fn.fieldName}
              label={fn.displayName}
              placeholder={fn.placeholder ?? filter.placeholder}
              isRequired={false}
              value={state.dateValues[i]}
              disabled={fn.disabled}
              className="search-box-first-name"
              onSelectDate={(date) => {
                if (date !== undefined && date !== null) {
                  dispatch({
                    type: 'dateValueChanged',
                    fieldValue: date,
                    fieldIndex: i,
                  });
                }
              }}
            />
          </>
        );
      case FilterType.Enum:
        return (
          <>
            <Dropdown
              key={fn.fieldName}
              label={fn.displayName}
              placeholder={fn.placeholder ?? filter.placeholder}
              selectedKey={fn.selectedKey}
              disabled={fn.disabled}
              defaultSelectedKey={state.commitedItemValues[i]?.key || 'all'}
              onChanged={(item) => {
                if (fn.onDropdownChange) fn.onDropdownChange(item);
                dispatch({
                  type: 'itemValueChanged',
                  fieldValue: item,
                  fieldIndex: i,
                });
              }}
              options={fn.options ?? filter.options ?? []}
            />
          </>
        );
      default:
        return <></>;
    }
  };

  const getFilterInput = () => {
    if (!filter) {
      return null;
    }

    if (filter.type === FilterType.Custom) {
      return <>{fields.map((fn, i) => getInput(fn, i))}</>;
    }

    switch (filter.type) {
      case FilterType.Text:
        return <>{fields.map((fn, i) => getInput(fn, i))}</>;
      case FilterType.Date:
        return <>{fields.map((fn, i) => getInput(fn, i))}</>;
      case FilterType.Enum:
        return <>{fields.map((fn, i) => getInput(fn, i))}</>;
      default:
        return <></>;
    }
  };

  const clickSort = (e: React.MouseEvent<HTMLElement>) => {
    // @ts-ignore e being of that exact type is not required here.
    props.onColumnClick(e, props.column);
    // @ts-ignore e being of that exact type is not required here.
    if (column.onColumnClick) {
      column.onColumnClick(e, column);
    }
  };
  useEffect(() => {
    if (filter.selectedKey) {
      const selectedItem = filter.options?.find(
        (x) => x.key === filter.selectedKey
      );
      if (selectedItem)
        dispatch({
          type: 'itemValueChanged',
          fieldValue: selectedItem,
          fieldIndex: 0,
        });
      acceptFilter();
    }
  }, [filter.selectedKey]);
  return (
    <span
      aria-hidden
      className={clsx(
        'table-custom-header-cell',
        state.isFiltered ? 'filter' : ''
      )}
      onClick={clickSort}
    >
      <span ref={menuCaretRef}>
        <IconButton
          className={state.isFiltered ? 'active' : ''}
          onClick={(e) => {
            dispatch({ type: 'openCallout' });
            e.stopPropagation();
          }}
          iconProps={{ iconName: state.isFiltered ? 'FilterSolid' : 'Filter' }}
        />
      </span>
      <span className="table-custom-header-cell-title">
        {column.nameAsJsx ?? column.name}
      </span>
      {column.isSorted && (
        <span>
          <IconButton
            iconProps={{
              iconName: column.isSortedDescending ? 'SortDown' : 'SortUp',
            }}
          />
        </span>
      )}

      {!column.isSorted && column.allowSorting && (
        <span>
          <IconButton
            iconProps={{
              iconName: 'Sort',
            }}
          />
        </span>
      )}

      {filter && state.calloutOpen ? (
        <Callout
          className="table-filter-callout"
          target={menuCaretRef.current}
          beakWidth={12}
          onDismiss={() => dispatch({ type: 'closeCallout' })}
        >
          {getFilterInput()}
          <div className="table-filter-callout-buttons">
            {filter?.useFilterButton ? (
              <PrimaryButton
                className="customClearFilterButton"
                menuIconProps={{ iconName: 'ClearFilter' }}
                text={t('clearFilters')}
                onClick={() => resetFilter(true)}
              />
            ) : (
              <IconButton
                onClick={() => resetFilter(true)}
                iconProps={{ iconName: 'ClearFilter' }}
              />
            )}
            {filter?.useFilterButton ? (
              <PrimaryButton
                className="customApplyFilterButton"
                menuIconProps={{ iconName: 'FilterSolid' }}
                text={t('apply')}
                onClick={() => acceptFilter()}
              />
            ) : (
              <IconButton
                onClick={() => acceptFilter()}
                iconProps={{ iconName: 'CheckMark' }}
              />
            )}
          </div>
        </Callout>
      ) : null}
    </span>
  );
};
