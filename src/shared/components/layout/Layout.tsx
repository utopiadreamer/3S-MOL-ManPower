/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import * as H from "history";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import "./Layout.scss";
import { LayoutMenuItem } from "./layoutMenu/LayoutMenuItem";
import { LayoutMenu } from "./layoutMenu/LayoutMenu";
import { LayoutContentHeader } from "./layoutContent/LayoutContentHeader";
import MenuItems from "../../constants/menu";
import Header from "./Header";
import { getCurrentUser } from "../../mockups/User";
import { Claim } from "../../constants/auth";

export interface LayoutMenuItemExtended extends LayoutMenuItem {
  isVisible: (claims: Claim[]) => boolean;
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
export const Layout: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const { t } = useTranslation(["menu"]);
  const role = getCurrentUser();
  const [menuItemsState, setMenuItemsState] = useState(MenuItems);
  const [currentMenuItemsState, setCurrentMenuItemsState] = useState<LayoutMenuItem[]>();

  const location = useLocation();
  useEffect(() => {
    const activeMenuItems = MenuItems.filter(
      (m) => m && m?.isVisible(role.Claims ?? [])
    );
    setMenuItemsState(activeMenuItems);
    const currentItems = GetCurrentMenuItemEntry(location, activeMenuItems);
    setCurrentMenuItemsState(currentItems);
  }, [location]);

  const isRtl = true;
  const dir = isRtl ? "rtl" : "ltr";
  return (
    <div dir={dir} className={clsx("layout", isRtl && "rtl")}>
      <div className="layout-container">
        <LayoutMenu className="main-menu" menuItems={menuItemsState} opened>
          {/* {isLoading ? (
                        <div className="layout-container-loading">
                            <Spinner
                                size={SpinnerSize.large}
                                label={t('loading')}
                            />
                        </div>
                    ) : ( */}
          <div className="layout-container-rightPart" data-is-scrollable="true">
            <Header mainTitle={t("mol")} />
            <LayoutContentHeader menuEntry={currentMenuItemsState} />
            <Outlet />
          </div>
          {/* )} */}
        </LayoutMenu>
      </div>
    </div>
  );
};
