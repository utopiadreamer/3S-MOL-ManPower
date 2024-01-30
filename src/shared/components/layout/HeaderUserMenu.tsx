/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC, useRef, useState } from "react";
import { Persona, PersonaSize, Icon, Callout } from "@fluentui/react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import "./Layout.scss";
import { Dropdown } from "../forms/CustomDropdown";
import { Role } from "../../constants/auth";
import { GeneralUtil } from "../../utils/generalUtil";

export interface HeaderMenuActionProps {
  key: string;
  iconName?: string;
  text: string;
  to: string;
  onClick?: Function;
}

export interface HeaderUserMenuProps {
  userName?: string;
  role?: string;
  actions?: HeaderMenuActionProps[];
}

export const HeaderUserMenu: FC<HeaderUserMenuProps> = (
  props: HeaderUserMenuProps
) => {
  const { userName, actions, role } = props;

  const menuCaretRef = useRef<HTMLDivElement>(null);
  const [calloutOpen, setCalloutOpen] = useState<boolean>(false);
  
  const getInitialRole = () => {
    const currentRole = localStorage.getItem("CurrentRole");
    if (GeneralUtil.isNothing(currentRole)) return Role.Researcher.toString();

    return currentRole;
  };
  
  const [currentUser, setCurrentUser] = useState<string>(getInitialRole() ?? '');

  const onActionClicked = (action: HeaderMenuActionProps) => {
    setCalloutOpen(false);
    if (action.onClick) {
      action.onClick();
    }
  };

  const setUser = (key: string) => {
    setCurrentUser(key);
    localStorage.setItem("CurrentRole", key);
    window.location.reload();
  };

  const roles = [    
    {
      key: Role.Admin.toString(),
      text: "مسئول النظام",
    },{
      key: Role.Researcher.toString(),
      text: "باحث",
    },
    {
      key: Role.Reviewer.toString(),
      text: "مراجع",
    },
    {
      key: Role.DirectorateManager.toString(),
      text: "مدير المديرية",
    },
    {
      key: Role.CommitteeMember.toString(),
      text: "عضو لجنة",
    },
    {
      key: Role.ReportViewer.toString(),
      text: "مراجع التقارير",
    },
  ];

  return (
    <>
      <div
        aria-hidden="true"
        className="header-user-menu"
        onClick={() => {
          setCalloutOpen(!calloutOpen);
        }}
      >
        {/* <div>
          <Dropdown
            options={roles}
            selectedKey={currentUser}
            onChange={(_, option) => {
              setUser(option?.key.toString() ?? "");
            }}
          />
        </div> */}
        <Persona
          className="header-user-menu-avatar"
          text={userName}
          secondaryText={role}
          size={PersonaSize.size24}
          showSecondaryText
        />
        <div ref={menuCaretRef}>
          <Icon className="header-user-caret-button" iconName="ChevronDown" />
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
                className={clsx("header-user-menu-callout-item")}
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
