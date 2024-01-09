import React from 'react';
import {
    IOverflowSetItemProps,
    CommandBarButton,
    IRenderFunction,
} from '@fluentui/react';

export const renderOverflowButton: IRenderFunction<IOverflowSetItemProps[]> = (
    overflowItems: IOverflowSetItemProps[] | undefined
): JSX.Element => {
    return (
        <CommandBarButton
            role="menuitem"
            menuIconProps={{ iconName: 'More' }}
            menuProps={{
                items: overflowItems ?? [],
            }}
        />
    );
};
