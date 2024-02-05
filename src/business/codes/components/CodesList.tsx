import { FC, useEffect, useState } from "react";
import { CodesGrid } from "./CodesGrid";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { CodeDTO } from "../../../shared/models/CodeDTO";
import { getCodes } from "../../../shared/mockups/Codes";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { getCodesTypes } from "../../../shared/mockups/CodesTypes";
import { IDropdownOption, PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { SearchBar } from "../../../shared/components/forms/SearchBar";
import { CollapsibleSection } from "../../../shared/components/forms/CollapsibleSection";
import { Section, SectionSize } from "../../../shared/components/forms/Section";

export const CodesList: FC = () => {
  const [codes, setCodes] = useState<CodeDTO[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<CodeDTO>();
  const [codesTypes, setCodesTypes] = useState<IDropdownOption[]>([]);
  const { t } = useTranslation(["codes"]);
  const navigate = useNavigate();

  const getCodesList = (type: string) => {
    const codes = getCodes().filter((i) => i.CodeTypeID.toString() === type);
    setCodes(codes);
  };

  const Search = () => {
    getCodesList(searchCriteria?.CodeTypeID.toString() ?? "");
  };

  const Clear = () => {
    const empty = new CodeDTO();
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

  useEffect(() => {
    const types = getCodesTypes();
    const list = types.map((item) => {
      return {
        key: item.ID.toString(),
        text: item.Name,
      };
    });
    setCodesTypes(list);
  }, []);

  return (
    <LayoutContent>
      <Section
        className="pageHeader"
        iconName="Code"
        title={t("codes")}
        size={SectionSize.h1}
      />
      <CollapsibleSection
        open
        title={t("common:searchFilters")}
        iconName="Search"
      >
        <div className="row g-112">
          <TextField
            label={t("code")}
            value={searchCriteria?.Name}
            onChange={(e, newValue) =>
              setSearchCriteriaField("Name", newValue)
            }
          />
          <Dropdown
            label={t("codeType")}
            options={codesTypes}
            selectedKey={searchCriteria?.CodeTypeID ?? ''}
            onChange={(e, option) =>
              setSearchCriteriaField("CodeTypeID", option?.key.toString())
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
            onClick={() => navigate("/codes/new")}
          >
            {t("addNewCode")}
          </PrimaryButton>
        </div>
        <CodesGrid
          items={codes}
          onChanged={() => {
            return false;
          }}
          onNbItemPerPageChanged={() => {
            return false;
          }}
        />
      </CollapsibleSection>
    </LayoutContent>
  );
};
