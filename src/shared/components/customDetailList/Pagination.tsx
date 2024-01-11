import React, { FC } from 'react';
import { ActionButton, Dropdown, Label } from '@fluentui/react';
import './Pagination.scss';

export type NavigationAction =
    | { type: 'beginNav' }
    | { type: 'endNav' }
    | { type: 'pageNav'; pageNumber: number }
    | { type: 'itemsPerPageNumberChanged'; numberOfItemPerPage: number };

export type OnNavigate = (action: NavigationAction) => void;
export interface LabelsPaginationProps{
    resultPerPage?: string;
    totalRecord?: string;
}
export interface PaginationProps {
    currentPageIndex: number;
    totalPageCount: number;
    nbPagesShown: number;
    itemsPerPage: number;
    onNavigate: OnNavigate;
    labels: LabelsPaginationProps;
    totalRecordCount?: number;
}

interface PageButton {
    label?: string;
    icon?: string;
    pageNum: number;
    action: NavigationAction;
    disabled: boolean;
}

const Pagination: FC<PaginationProps> = (props: PaginationProps) => {
    const {
        currentPageIndex,
        totalPageCount,
        nbPagesShown,
        itemsPerPage,
        onNavigate,
        labels,
        totalRecordCount
    } = props;

    const generatePageButtons = (): PageButton[] => {
        let nbPages = nbPagesShown;
        if (totalPageCount <= 1){
            return [];
        }
        if (nbPagesShown === 0) {
            nbPages = 1;
        }
        if (totalPageCount <= 1){
            return [];
        }
        let firstPage = currentPageIndex - Math.trunc(nbPages / 2);
        if (firstPage < 0) firstPage = 0;
        let lastPage = firstPage + nbPages;
        if (lastPage > totalPageCount) {
            lastPage = totalPageCount;
            firstPage =
                lastPage - nbPages >= 0 ? lastPage - nbPages : firstPage;
        }
        let i = firstPage;
        const result: PageButton[] = [];

        result.push({
            icon: 'DoubleChevronLeft',
            pageNum: -1,
            disabled: firstPage <= 0,
            action: { type: 'beginNav' },
        });
        result.push({
            icon: 'ChevronLeft',
            pageNum: currentPageIndex - 1,
            disabled: currentPageIndex === 0,
            action: { type: 'pageNav', pageNumber: currentPageIndex - 1 },
        });

        while (i < lastPage) {
            result.push({
                label: (i + 1).toString(),
                pageNum: i,
                disabled: false,
                action: { type: 'pageNav', pageNumber: i },
            });
            i += 1;
        }
        result.push({
            icon: 'ChevronRight',
            pageNum: currentPageIndex + 1,
            disabled: currentPageIndex === totalPageCount - 1,
            action: { type: 'pageNav', pageNumber: currentPageIndex + 1 },
        });
        result.push({
            icon: 'DoubleChevronRight',
            pageNum: totalPageCount + 1,
            disabled: lastPage >= totalPageCount,
            action: { type: 'endNav' },
        });
        return result;
    };
    
    return (
          <div className="mol-pagination" dir="ltr">
            <div className="mol-pagination-totalrecordCount">
            {labels.totalRecord && totalRecordCount && (
                <Label className="mol-pagination-totalrecordCount-label">{labels.totalRecord} {totalRecordCount}</Label>)
            }
            </div>
            <div className="mol-pagination-pageselector">
                {generatePageButtons().map((pageButton) => {
                    return (
                        <ActionButton
                            key={pageButton.label ?? pageButton.icon}
                            allowDisabledFocus
                            onClick={() => {
                                onNavigate(pageButton.action);
                            }}
                            className={pageButton.label ? 'mol-pageNumber' : ''}
                            disabled={pageButton.disabled}
                            iconProps={{ iconName: pageButton.icon }}
                            checked={pageButton.pageNum === currentPageIndex}
                        >
                            {pageButton.label}
                        </ActionButton>
                    );
                })}
            </div>
            {labels.resultPerPage && (
            <div className="mol-pagination-itemperpage">
                <Label className="mol-pagination-itemperpage-label">{labels.resultPerPage}
                </Label>
                <Dropdown
                    selectedKey={itemsPerPage}
                    options={[
                        { key: 10, text: '10' },
                        { key: 20, text: '20' },
                        { key: 50, text: '50' },
                        { key: 100, text: '100' },
                    ]}
                    onChange={(_, option) => {
                        if (option) {
                            const numberOfItemPerPage =
                                typeof option.key === 'string'
                                    ? parseInt(option.key, 10)
                                    : option.key;
                            onNavigate({
                                type: 'itemsPerPageNumberChanged',
                                numberOfItemPerPage,
                            });
                        }
                    }}
                />
            </div>
            )
        }
        </div>
    );
};
export default Pagination;
