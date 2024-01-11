import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { HeaderUserMenu } from "./HeaderUserMenu";

export interface HeaderProps {
  mainTitle: string;
  subTitle?: string;
  componentEtaLang?: string
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {
    mainTitle,
    subTitle
  } = props;
  
  const { t } = useTranslation(["menu"]);


  return (
    <div className="layout-header">
      <Logo />
      <h1>
        <span className="layout-header-title">{mainTitle}</span>
        {subTitle && <span className="layout-header-subtitle">{subTitle}</span>}
      </h1>

      <div className="layout-header-content ">
        <HeaderUserMenu
          userName={'name' ?? ""}
          actions={[
            {
              key: "Name",
              text:
                // eslint-disable-next-line camelcase
                'preferred_username' ?? "",
              to: "",
              iconName: "User",
            },
            {
              key: "signout",
              text: t("logout"),
              to: "/logout",
              iconName: "SignOut",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Header;

