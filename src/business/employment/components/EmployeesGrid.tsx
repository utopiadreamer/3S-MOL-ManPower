/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import {
    SelectionMode,
    DetailsListLayoutMode
} from '@fluentui/react';
import { useTranslation } from 'react-i18next';
import '../styles/EmploymentList.scss';
import { DetailsList, FilteredColumn, SortedColumnInfo } from '../../../shared/components/customDetailList/CustomDetailList';
import { ColumnInfo, FilterType } from '../../../shared/components/customDetailList/FilteredHeaderColumn';
import { EstablishmentDTO } from '../../settlements/context/DTOs';
import { EstablishmentType } from '../../../shared/constants/constants';

interface GridProps {
    items: EstablishmentDTO[];
    onChanged?: (
        pageIndex: number,
        filteredColumn: FilteredColumn[],
        sortedColumn?: SortedColumnInfo
    ) => boolean;
    onNbItemPerPageChanged: (nbItemPerPage: number) => boolean;
}

export const EmployeesGrid: FC<GridProps> = (props: GridProps) => {
    const { t } = useTranslation(['employment', 'common']);
    const [columns, setColumns] = useState<ColumnInfo[]>();
    const [pageSize, setPageSize] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(10);
    const {
        items: itemsProps,
        onChanged,
        onNbItemPerPageChanged
    } = props;

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

    const gridColumns = [
        {
            key: 'workerName',
            name: t('workerName'),
            fieldName: 'workerName',
            filterOption: {
                placeholder: '',
                type: FilterType.Text,
                fieldNames: [
                    {
                        fieldName: 'workerName',
                        displayName: t('workerName')
                    }
                ],
            },
            minWidth: 200,
            maxWidth: 200,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'nationalID',
            name: t('nationalID'),
            fieldName: 'nationalID',
            minWidth: 150,
            maxWidth: 150,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'occupation',
            name: t('occupation'),
            fieldName: 'occupation',
            minWidth: 150,
            maxWidth: 150,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'address',
            name: t('address'),
            fieldName: 'address',
            minWidth: 150,
            maxWidth: 150,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'phoneNo',
            name: t('phoneNo'),
            fieldName: 'phoneNo',
            minWidth: 150,
            maxWidth: 150,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'action',
            name: '',
            fieldName: '',
            minWidth: 40,
            maxWidth: 40,
            isRowHeader: true,
            isResizable: false
        },
    ];

    return (
        <DetailsList
            className="grid submissionDetails"
            columns={gridColumns ?? []}
            items={[items]}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.fixedColumns}
            noItemsPlaceholder={<span>{t('common:NoRecords')}</span>}
            labels={{
                resultPerPage: t('common:nbItemPerPage'),
                totalRecord: t('common:totalRecord'),
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
