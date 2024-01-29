import { Breadcrumb, Icon, IBreadcrumbItem } from "@fluentui/react";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../../../redux/store/store";
import { LayoutMenuItem } from "../layoutMenu/LayoutMenuItem";
import { changeBreadcrumb } from "../../../../redux/layout/layoutHeaderSlice";

export interface LayoutContentHeaderTitleProps {
  menuEntry?: LayoutMenuItem[];
}
const mapDispatchToProps = {
  dispatchChangeBreadcrumb: changeBreadcrumb,
};

const mapStateToProps = (state: RootState) => {
  return {
    pageBreadCrumbItems: state.layoutHeader.pageBreadcrumbItems,
    maxDisplayedItems: state.layoutHeader.maxDisplayedItems,
    overflowIndex: state.layoutHeader.overflowIndex,
  };
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
const LayoutContentHeaderTitleComponent: FC<
  LayoutContentHeaderTitleProps & PropsFromRedux
> = (props: LayoutContentHeaderTitleProps & PropsFromRedux) => {
  const { t } = useTranslation(["menu"]);
  const history = useNavigate();
  const location = useLocation();
  const {
    menuEntry,
    pageBreadCrumbItems,
    dispatchChangeBreadcrumb,
    maxDisplayedItems,
    overflowIndex,
  } = props;
  
  const renderMultipleTitle = (titleParts: LayoutMenuItem[]) => {
    const items = titleParts.map<IBreadcrumbItem>((itemTitle, index) => ({
      key: `title-part-${index}`,
      text: t(itemTitle.title),
      onClick:
        itemTitle.pathname !== "" &&
        ((location.search ?? "") !== "" ||
          location.pathname !== itemTitle.pathname)
          ? () => {
              history(itemTitle.pathname);
              dispatchChangeBreadcrumb([]);
            }
          : undefined,
    }));
    const iconName =
      titleParts.length > 0 ? titleParts[titleParts.length - 1].iconName : "";
    return (
      <>
        {iconName && <Icon iconName={iconName} />}
        <Breadcrumb
          onReduceData={() => undefined}
          items={[...items, ...(pageBreadCrumbItems ?? [])]}
          maxDisplayedItems={maxDisplayedItems}
          overflowIndex={overflowIndex}
        />
      </>
    );
  };

  return (
    <div className="layout-content-header-title">
      {renderMultipleTitle(menuEntry ?? [])}
    </div>
  );
};

export const LayoutContentHeaderTitle = connector(
  LayoutContentHeaderTitleComponent
);
