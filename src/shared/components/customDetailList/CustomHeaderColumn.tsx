import React, { FC } from 'react';
import { IconButton } from '@fluentui/react';
import { ColumnInfo } from './FilteredHeaderColumn';

import './FilteredHeaderColumn.scss';


export interface CustomHeaderColumnProps {
  column: ColumnInfo;
  onColumnClick: (ev?: React.MouseEvent<HTMLElement>, col?: ColumnInfo) => void;
}

export const CustomHeaderColumn: FC<CustomHeaderColumnProps> = (
  props: CustomHeaderColumnProps
) => {
  const { column } = props;

  const clickSort = (e: React.MouseEvent<HTMLElement>) => {
    // @ts-ignore e being of that exact type is not required here.
    props.onColumnClick(e, props.column);
    // @ts-ignore e being of that exact type is not required here.
    if (column.onColumnClick) {
      column.onColumnClick(e, column);
    }
  };
  return (
    <span aria-hidden className="table-custom-header-cell" onClick={clickSort}>
      <span className="table-custom-header-cell-title">{column.nameAsJsx ?? column.name}</span>
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
    </span>
  );
};
