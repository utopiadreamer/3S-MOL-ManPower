import React, { FC } from 'react';
import { IOverflowSetItemProps, ActionButton } from '@fluentui/react';

export const LayoutCommandButton: FC<IOverflowSetItemProps> = (
    props: IOverflowSetItemProps
): JSX.Element => {
    const { disabled, icon, onClick, href, menuProps, menuAs, allowDisabledFocus, name } = props;
    return (
        <ActionButton
            disabled={disabled}
            iconProps={{ iconName: icon }}
            role="menuitem"
            onClick={onClick}
            href={href}
            menuProps={menuProps}
            menuAs={menuAs}
            allowDisabledFocus={allowDisabledFocus}
        >
            {name}
        </ActionButton>
    );
};
