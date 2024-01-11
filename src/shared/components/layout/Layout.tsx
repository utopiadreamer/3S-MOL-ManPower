/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import * as H from "history";
import React, { FC, PropsWithChildren } from "react";
import "./Layout.scss";
import { LayoutMenuItem } from "./layoutMenu/LayoutMenuItem";
import { LayoutMenu } from "./layoutMenu/LayoutMenu";
import { LayoutContentHeader } from "./layoutContent/LayoutContentHeader";
import MenuItems from "../../constants/menu";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import Header from "./Header";

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
  const { children } = props;
  const currentLang = useSelector(
    (state: RootState) => state.reduxLanguage.language
  );
  const currentMenuEntry = GetCurrentMenuItemEntry(useLocation(), MenuItems);

  const { isRtl, lang } = currentLang;
  const dir = isRtl ? "rtl" : "ltr";
  return (
    <div dir={dir} className={clsx("layout", isRtl && "rtl")}>
      <div className="layout-container">
        <LayoutMenu className="main-menu" menuItems={MenuItems} opened>
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
            <LayoutContentHeader menuEntry={currentMenuEntry} />
        <Outlet />
          </div>
          {/* )} */}
        </LayoutMenu>
      </div>
    </div>
  );
};
