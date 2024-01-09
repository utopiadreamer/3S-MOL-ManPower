import React, { FC, useState, useCallback, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import './LayoutMenu.scss';
import './LayoutNavLinkGroup.scss';
import { LayoutMenuIcon } from './LayoutMenuIcon';
import { LayoutMenuItem } from './LayoutMenuItem';

export interface LayoutNavLinkGroupProps {
  opened?: boolean;
  disabled?: boolean;
  mainMenuExpend: boolean;
  item: LayoutMenuItem;
}

export const LayoutNavLinkGroup: FC<PropsWithChildren<
  LayoutNavLinkGroupProps
>> = (props: PropsWithChildren<LayoutNavLinkGroupProps>) => {
  const { t } = useTranslation(['menu']);
  const { opened, mainMenuExpend, children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(!!opened);
  const { item } = props;
  const { disabled } = props;

  const onNavLinkClicked = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const directionClass = i18n.language === 'ar' ? 'closedRtl' : 'closed';
  return (
    <div className="mol-NavLinkGroup">
      <NavLink
        key={item.id}
        id={item.id}
        title={t(item.title)}
        to={{ pathname: item.pathname }}
        className={clsx(
          'layout-menu-nav-item',
          disabled && 'layout-menu-nav-item--disabled'
        )}
        // activeClassName="layout-menu-nav-item--active"
        onClick={(ev: any) => (disabled ? ev.preventDefault() : onNavLinkClicked())}
        // isActive={() => false}
      >
        <LayoutMenuIcon
          className={clsx(
            'layout-menu-nav-item-icon',
            isOpen ? 'open' : directionClass
          )}
          iconName="ChevronDown"
          showBadge={false}
        />
        <div className="layout-menu-nav-item-label">{t(item.title)}</div>
      </NavLink>
      {isOpen && (
        <div
          className={
            mainMenuExpend ? 'childPlacholder' : 'childPlacholderCollapsed'
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};
