import {
    IOverflowSetItemProps,
    OverflowSet,
} from '@fluentui/react';
import React, { ComponentType, FC, useEffect, useRef, useState } from 'react';

import {
    LayoutCommandButton
} from './LayoutCommandButton';
import{
    renderOverflowButton
}from './LayoutCommandOverflowButton';
import {
    LayoutContentHeaderTitle,
    LayoutContentHeaderTitleProps
} from './LayoutContentHeaderTitle';
import { LayoutMenuItem } from '../layoutMenu/LayoutMenuItem';

export interface LayoutContentHeaderProps {
    menuEntry?: LayoutMenuItem[];
    commandButtons?: IOverflowSetItemProps[];
    commandButtonComponent?: ComponentType<IOverflowSetItemProps>;
    headerTitleComponent?: ComponentType<LayoutContentHeaderTitleProps>;
}

export const LayoutContentHeader: FC<LayoutContentHeaderProps> = (
    props: LayoutContentHeaderProps
) => {
    const { commandButtons, menuEntry, commandButtonComponent, headerTitleComponent } = props;
    const actionDivRef = useRef<HTMLDivElement>(null);
    const [width] = useState<number>(0);
    const [commandActions, setCommandActions] = useState<{
        buttons: IOverflowSetItemProps[];
        overflowButtons: IOverflowSetItemProps[];
    }>({
        buttons: [],
        overflowButtons: [],
    });

    useEffect(() => {
        const visibleButtons = Math.floor(width / 150);

        if (commandButtons && commandButtons.length > 0) {
            setCommandActions({
                buttons: commandButtons.slice(0, visibleButtons),
                overflowButtons: commandButtons
                    .slice(visibleButtons, commandButtons.length)
                    .map((item) => {
                        if (item.menuProps) {
                            return {
                                ...item,
                                subMenuProps: {
                                    items: [...item.menuProps.items],
                                },
                                iconProps: {
                                    iconName: item.icon,
                                },
                            };
                        }
                        return {
                            ...item,
                            iconProps: {
                                iconName: item.icon,
                            },
                        };
                    }),
            });
        } else {
            setCommandActions({
                buttons: [],
                overflowButtons: [],
            });
        }
    }, [width, commandButtons]);

    const CommandButtonComponent = commandButtonComponent ?? LayoutCommandButton;

    return (
        <>
            <div className="mol-layout-content-header">
                {<LayoutContentHeaderTitle menuEntry={menuEntry} />}

                <div
                    className="layout-content-header-action"
                    ref={actionDivRef}
                >
                    <OverflowSet
                        items={commandActions.buttons}
                        overflowItems={commandActions.overflowButtons}
                        onRenderItem={(propsItem) => (
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            <CommandButtonComponent {...propsItem} />
                        )}
                        onRenderOverflowButton={renderOverflowButton}
                    />
                </div>
            </div>
        </>
    );
};
