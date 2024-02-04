import { FC, useEffect, useState } from "react";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";

import { UsersGrid } from "./UsersGrid";
import { UserDTO } from "../../../shared/models/UserDTO";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../shared/mockups/User";
import { SearchBar } from "../../../shared/components/forms/SearchBar";
import { CollapsibleSection } from "../../../shared/components/forms/CollapsibleSection";

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
        <CollapsibleSection open title={t("common:searchFilters")}>
          <div className="row g-112">
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
          <SearchBar onSearch={() => Search()} onClear={() => {}} />
          </div>
        </CollapsibleSection>
        <CollapsibleSection open title={t("common:searchFilters")}>
          <div className="alignEnd">
            <PrimaryButton
              className="actionButton headerAction"
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
        </CollapsibleSection>
      </div>
    </LayoutContent>
  );
};
