import { FC, useEffect, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";

import { UsersGrid } from "./UsersGrid";
import { UserDTO } from "../../../shared/models/UserDTO";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { getUsers } from "../../../shared/mockups/User";

export const UsersList: FC = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const { t } = useTranslation(["security", "common"]);
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    Search();
  }, []);

  const Search = () => {
    const results = getUsers();
    setUsers(results);
  };

  return (
    <LayoutContent>
      <div className="usersList">
        <div className="section">
          <div className="content">
            <Section
              size={SectionSize.h2}
              iconName="Search"
              title={t("common:searchFilters")}
            />
            <div className="row">
              <TextField
                label={t("userName")}
                value={name}
                onChange={(e, newValue) => setName(newValue)}
              />
              <TextField
                label={t("email")}
                value={email}
                onChange={(e, newValue) => setEmail(newValue)}
              />
            </div>
            <div className="searchBar">
              <PrimaryButton
                className="actionButton primeAction"
                iconProps={{ iconName: "Search" }}
                text={t("common:search")}
                onClick={() => {
                  Search();
                }}
              />
              <PrimaryButton
                className="actionButton subAction"
                iconProps={{ iconName: "Clear" }}
                text={t("common:clearSearch")}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
        <div className="section">
          <div className="content">
            <div className="actionsHeader">
              <Section
                size={SectionSize.h2}
                iconName="SearchAndApps"
                title={t("common:searchResults")}
              />
              <PrimaryButton
                className="actionButton primeAction"
                iconProps={{ iconName: "Add" }}
                onClick={() => navigate("/security/users/new")}
              >
                {t("addNewUser")}
              </PrimaryButton>
            </div>
            <UsersGrid
              items={users}
              onChanged={() => {
                return false;
              }}
              onNbItemPerPageChanged={() => {
                return false;
              }}
            />
          </div>
        </div>
      </div>
    </LayoutContent>
  );
};
