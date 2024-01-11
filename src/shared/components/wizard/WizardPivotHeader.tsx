import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
    Icon,
    IPivotItemProps,
    Pivot,
    PivotItem
} from '@fluentui/react';
import './WizardPivot.scss';
import { WizardContext } from './Wizard';

export type TabState = 'none' | 'completed' | 'error';
export interface WizardTab {
    itemKey: string;
    label: string;
    itemState?: TabState;
    disabled?: boolean;
    notClickable?: boolean;
    hidden?: boolean;
}
export interface WizardPivotHeaderProps {
    onSelectedTab?: (tabkey?: string) => void;
}
function getNumber(tabs: WizardTab[], index: number) {
    let counter = 0;
    for (let i = 0; i < index; i += 1) {
        if (!tabs[i].hidden) {
            counter += 1;
        }
    }
    return counter;
}

export const WizardPivotHeader: FC<WizardPivotHeaderProps> = (
    props: WizardPivotHeaderProps
) => {
    const { onSelectedTab } = props;

    const { state, selectTab } = useContext(WizardContext);
    const getTabId = (id: string) => {
        return `${state.wizardName ?? 'wizard'}_${id}`;
    };

    const renderTabHeader = (
        itemProps: IPivotItemProps | undefined,
        headerIndex: number,
        selected: boolean,
        disabled: boolean,
        notClickable: boolean,
        itemState: TabState
    ) => {
        return (
            <div
                className={clsx(
                    'wizardHeader',
                    selected ? 'selected' : '',
                    disabled ||
                        (notClickable &&
                            !selected &&
                            (!itemState || itemState === 'none'))
                        ? 'disabled'
                        : '',
                    `state_${itemState}`
                )}
            >
                <div className="circle">
                    {itemState === 'none' && <p>{headerIndex}</p>}
                    {itemState === 'completed' && <Icon iconName="Accept" />}
                    {itemState === 'error' && <Icon iconName="Cancel" />}
                </div>
                <div>{itemProps?.headerText ?? ''}</div>
            </div>
        );
    };

    const { t } = useTranslation(state.translationNamespace);

    return (
        <Pivot
            className="WizardPivot"
            linkFormat={'tabs'}
            selectedKey={state.selectedTabKey}
            headersOnly
            getTabId={getTabId}
            onLinkClick={(item) => {
                if (item?.props.itemKey) {
                    selectTab(item?.props.itemKey);
                    if (onSelectedTab) {
                        onSelectedTab(item?.props.itemKey);
                    }
                }
            }}
        >
            {state.tabs.map((item, index) => {
                const { itemKey, label, itemState, disabled, notClickable } = item;
                const number = getNumber(state.tabs, index + 1);
                return (
                    !item.hidden && (
                        <PivotItem
                            key={itemKey}
                            itemKey={itemKey}
                            headerButtonProps={{
                                disabled: item.disabled || item.notClickable,
                            }}
                            headerText={t(label)}
                            onRenderItemLink={(p) =>
                                renderTabHeader(
                                    p,
                                    number,
                                    state.selectedTabKey === itemKey,
                                    disabled ?? false,
                                    notClickable ?? false,
                                    itemState && state.showTabState
                                        ? itemState
                                        : 'none'
                                )
                            }
                        />
                    )
                );
            })}
        </Pivot>
    );
};
