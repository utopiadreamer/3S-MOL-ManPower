/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
  useState,
  PropsWithChildren,
  useCallback,
  ComponentType,
  Fragment,
} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import clsx from "clsx";
import * as H from "history";
import { useTranslation } from "react-i18next";

import { LayoutMenuItem } from "./LayoutMenuItem";
import { LayoutMenuHeader, LayoutMenuHeaderProps } from "./LayoutMenuHeader";

import "./LayoutMenu.scss";
import { RootState } from "../../../../redux/store/store";
import { LayoutMenuIcon } from "./LayoutMenuIcon";
import { LayoutNavLinkGroup } from "./LayoutNavLinkGroup";
import { changeBreadcrumb } from "../../../../redux/layout/layoutHeaderSlice";

export interface LayoutMenuProps {
  menuItems: LayoutMenuItem[];
  opened?: boolean;
  className?: string;
  closeMenuOnClick?: boolean;
  menuOverflow?: boolean;
  disabled?: boolean;
  headerComponent?: ComponentType<LayoutMenuHeaderProps>;
  historyOperation?: HistoryOperation;
}

export enum HistoryOperation {
  PushState = "PushState",
  ReplaceState = "ReplaceState",
}

export interface CurrentMenuEntry {
  breadcrumbTitle: string[];
  iconName: string;
}
export function GetCurrentMenuItemEntry(
  location: H.Location,
  menu: LayoutMenuItem[]
): LayoutMenuItem[] | undefined {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of menu) {
    if (
      item.pathname !== "" &&
      location.pathname.indexOf(item.pathname) !== -1
    ) {
      return [item];
    }
    if (item.subItems) {
      const subarea = GetCurrentMenuItemEntry(location, item.subItems);
      if (subarea) {
        return [item, ...subarea];
      }
    }
  }
}

const mapDispatchToProps = {
  dispatchChangeBreadcrumb: changeBreadcrumb,
};

const mapStateToProps = (state: RootState) => {
  return {
    pageBreadCrumbItems: state.layoutHeader.pageBreadcrumbItems,
  };
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
const LayoutMenuComponent: FC<
  PropsWithChildren<LayoutMenuProps & PropsFromRedux>
> = (props: PropsWithChildren<LayoutMenuProps & PropsFromRedux>) => {
  const {
    opened,
    headerComponent,
    children,
    dispatchChangeBreadcrumb,
    historyOperation,
  } = props;
  const { menuItems, menuOverflow, className, closeMenuOnClick, disabled } =
    props;
  const [isOpen, setIsOpen] = useState<boolean>(!!opened);
  const location = useLocation();
  const { t } = useTranslation(["menu"]);
  const menuClassName = clsx(
    "mol-layout-menu",
    className,
    isOpen && "opened",
    menuOverflow && "overflow"
  );
  const contentClassName = clsx(
    "mol-layout-menu-content",
    menuOverflow && "overflow"
  );

  // const isLinkActive = (path: string): boolean => {
  //   if (path === "/") {
  //     return location && location.pathname === path;
  //   }
  //   return location && location.pathname.indexOf(path) !== -1;
  // };
  const isOpened = (subItems: LayoutMenuItem[]): boolean => {
    if (location) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of subItems) {
        if (item.subItems) {
          if (isOpened(item.subItems)) {
            return true;
          }
        }
        if (location.pathname.indexOf(item.pathname) !== -1) {
          return true;
        }
      }
    }
    return false;
  };
  const onNavLinkClicked = useCallback(() => {
    dispatchChangeBreadcrumb([]); // erase the breadcrumbState when click on menu

    if (closeMenuOnClick && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen, closeMenuOnClick]);

  const history = useNavigate();

  const renderItem = (item: LayoutMenuItem): JSX.Element => {
    return (
      <Fragment key={`${item.id}_fragment`}>
        {!item.subItems && (
          <NavLink
            key={item.id}
            id={item.id}
            title={t(item.title)}
            to={{ pathname: item.pathname }}
            className={({ isActive }) =>
              clsx(
                "layout-menu-nav-item",
                disabled && "layout-menu-nav-item--disabled",
                isActive ? "layout-menu-nav-item--active" : ""
              )
            }
            onClick={(ev) => {
              if (disabled) {
                ev.preventDefault();
              } else {
                if (item.queryString && historyOperation) {
                  ev.preventDefault();
                  switch (historyOperation) {
                    case HistoryOperation.PushState:
                      history(item.queryString);
                      break;
                    case HistoryOperation.ReplaceState:
                      history(item.queryString);
                      break;
                    default:
                      break;
                  }
                }

                onNavLinkClicked();
              }
            }}
            // isActive={() => isLinkActive(item.pathname)}
          >
            <LayoutMenuIcon
              className="layout-menu-nav-item-icon"
              iconName={item.iconName}
              showBadge={item.showBadge}
            />

            <div className="layout-menu-nav-item-label">{t(item.title)}</div>
          </NavLink>
        )}
        {item.subItems && (
          <LayoutNavLinkGroup
            key={`${item.id}_group`}
            item={item}
            mainMenuExpend={isOpen}
            opened={isOpened(item.subItems)}
          >
            {item.subItems.map((subItem: any) => renderItem(subItem))}
          </LayoutNavLinkGroup>
        )}
      </Fragment>
    );
  };
  const HeaderComponent = headerComponent ?? LayoutMenuHeader;

  return (
    <>
      <div className={menuClassName}>
        <HeaderComponent opened={isOpen} onToggled={() => setIsOpen(!isOpen)} />

        {menuItems.map((item) => renderItem(item))}
      </div>
      <div className={contentClassName}>{children}</div>
    </>
  );
};

export const LayoutMenu = connector(LayoutMenuComponent);
