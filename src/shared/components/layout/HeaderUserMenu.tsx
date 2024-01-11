import React, { FC, useRef, useState } from 'react';
import { Persona, PersonaSize, Icon, Callout } from '@fluentui/react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import './Layout.scss';

export interface HeaderMenuActionProps {
    key: string;
    iconName?: string;
    text: string;
    to: string;
    onClick?: Function;
}

export interface HeaderUserMenuProps {
    userName?: string;
    actions?: HeaderMenuActionProps[];
}

export const HeaderUserMenu: FC<HeaderUserMenuProps> = (
    props: HeaderUserMenuProps
) => {
    const { userName, actions } = props;

    const menuCaretRef = useRef<HTMLDivElement>(null);
    const [calloutOpen, setCalloutOpen] = useState<boolean>(false);

    const onActionClicked = (action: HeaderMenuActionProps) => {
        setCalloutOpen(false);
        if (action.onClick){
            action.onClick();
        }
    };

    return (
        <>
            <div
                aria-hidden="true"
                className="header-user-menu"
                onClick={() => {
                    setCalloutOpen(!calloutOpen);
                }}
            >
                <Persona
                    className="header-user-menu-avatar"
                    text={userName}
                    size={PersonaSize.size24}
                />
                <div ref={menuCaretRef}>
                    <Icon
                        className="header-user-caret-button"
                        iconName="ChevronDown"
                    />
                </div>
            </div>
            {calloutOpen && (
                <Callout
                    className="header-user-menu-callout"
                    target={menuCaretRef}
                    beakWidth={12}
                    onDismiss={() => setCalloutOpen(false)}
                >
                    {actions &&
                        actions.map((action) => (
                            <NavLink
                                key={action.key}
                                className={clsx(
                                    'header-user-menu-callout-item'
                                )}
                                to={{ pathname: action.to }}
                                onClick={() => onActionClicked(action)}
                            >
                                <Icon
                                    className="header-user-menu-callout-item-icon"
                                    iconName={action.iconName}
                                />

                                <div className="header-user-menu-callout-item-label">
                                    {action.text}
                                </div>
                            </NavLink>
                        ))}
                </Callout>
            )}
        </>
    );
};
