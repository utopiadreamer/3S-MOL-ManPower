/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import { CodesTypesGrid } from "./CodesTypesGrid";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { getCodesTypes } from "../../../shared/mockups/CodesTypes";
import { useTranslation } from "react-i18next";
import { CodeTypeDTO } from "../../../shared/models/CodeTypeDTO";
import { IDropdownOption, PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { GeneralUtil } from "../../../shared/utils/generalUtil";
import { SearchBar } from "../../../shared/components/forms/SearchBar";
import { CollapsibleSection } from "../../../shared/components/forms/CollapsibleSection";
import { Section, SectionSize } from "../../../shared/components/forms/Section";

export const CodesTypesList: FC = () => {
  const [codesTypes, setCodesTypes] = useState<CodeTypeDTO[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<CodeTypeDTO>();
  const [codesTypesList, setCodesTypesList] = useState<IDropdownOption[]>([]);
  const { t } = useTranslation(["codes"]);
  const navigate = useNavigate();

  const getCodeTypes = () => {
    const types = getCodesTypes();
    return types;
  };

  const Search = () => {
    const codeType = searchCriteria?.ParentID?.toString();
    if (GeneralUtil.isUndefined(codeType)) return;
    let types = getCodeTypes();
    if (codeType === "0") {
      types = types.filter((i) => GeneralUtil.isNothing(i.ParentID));
    } else {
      types = types.filter((i) => i.ParentID?.toString() === codeType);
    }

    setCodesTypes(types);
  };

  const Clear = () => {
    const empty = new CodeTypeDTO();
    setSearchCriteria(empty);
  };

  const setSearchCriteriaField = (name: string, value?: string) => {
    setSearchCriteria((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const types = getCodeTypes();
    const list = types.map((item) => {
      return {
        key: item.ID.toString(),
        text: item.Name,
      };
    });
    list.unshift({ key: "0", text: t("withoutParent") });
    setCodesTypesList(list);
  }, []);

  return (
    <LayoutContent>
      <Section
        className="pageHeader"
        iconName="FileCode"
        title={t("codesTypes")}
        size={SectionSize.h1}
      />
      <CollapsibleSection
        open
        title={t("common:searchFilters")}
        iconName="Search"
      >
        <div className="row g-112">
          <TextField
            label={t("codeType")}
            value={searchCriteria?.Name}
            onChange={(e, newValue) => setSearchCriteriaField("Name", newValue)}
          />
          <Dropdown
            label={t("parentType")}
            options={codesTypesList}
            selectedKey={searchCriteria?.ParentID ?? ""}
            onChange={(e, option) =>
              setSearchCriteriaField("ParentID", option?.key.toString())
            }
          />
          <SearchBar onSearch={() => Search()} onClear={() => Clear()} />
        </div>
      </CollapsibleSection>
      <CollapsibleSection
        title={t("common:searchResults")}
        open
        iconName="SearchAndApps"
      >
        <div className="alignEnd">
          <PrimaryButton
            className="actionButton headerAction"
            iconProps={{ iconName: "Add" }}
            onClick={() => navigate("/codesTypes/new")}
          >
            {t("addNewCodeType")}
          </PrimaryButton>
        </div>
        <CodesTypesGrid
          items={codesTypes}
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
