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
import { Section, SectionSize } from "../../../shared/components/forms/Section";

export const UsersList: FC = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<UserDTO>();
  const { t } = useTranslation(["security", "common"]);
  const navigate = useNavigate();

  useEffect(() => {
    Search();
  }, []);

  const Search = () => {
    const results = getUsers();
    setUsers(results);
  };

  const Clear = () => {
    const empty = new UserDTO();
    setSearchCriteria(empty);
  };

  const setSearchCriteriaField = (
    name: string,
    value?: string
  ) => {
    setSearchCriteria((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <LayoutContent>
      <div className="usersList">
        <Section
          className="pageHeader"
          iconName="SecurityGroup"
          title={t("security")}
          size={SectionSize.h1}
        />
        <CollapsibleSection
          open
          title={t("common:searchFilters")}
          iconName="Search"
        >
          <div className="row g-112">
            <TextField
              label={t("userName")}
              value={searchCriteria?.Name}
              onChange={(e, newValue) =>
                setSearchCriteriaField("Name", newValue)
              }
            />
            <TextField
              label={t("email")}
              value={searchCriteria?.Email}
              onChange={(e, newValue) =>
                setSearchCriteriaField("Email", newValue)
              }
            />
            <SearchBar onSearch={() => Search()} onClear={() => Clear()} />
          </div>
        </CollapsibleSection>
        <CollapsibleSection
          open
          title={t("common:searchResults")}
          iconName="SearchAndApps"
        >
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
