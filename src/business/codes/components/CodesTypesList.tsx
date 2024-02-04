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

export const CodesTypesList: FC = () => {
  const [codesTypes, setCodesTypes] = useState<CodeTypeDTO[]>([]);
  const [codesTypesList, setCodesTypesList] = useState<IDropdownOption[]>([]);
  const [codeType, setCodeType] = useState<string>("");
  const [codeTypeName, setCodeTypeName] = useState<string>();
  const { t } = useTranslation(["codes"]);
  const navigate = useNavigate();

  const getCodeTypes = () => {
    const types = getCodesTypes();
    return types;
  };

  const Search = () => {
    let types = getCodeTypes();
    if (codeType === "0") {
      types = types.filter((i) => GeneralUtil.isNothing(i.ParentID));
    } else {
      types = types.filter((i) => i.ParentID?.toString() === codeType);
    }

    setCodesTypes(types);
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
      <CollapsibleSection open title={t("common:searchFilters")}>
        <div className="row g-112">
          <TextField
            label={t("codeType")}
            value={t(codeTypeName ?? "")}
            onChange={(e, value) => setCodeTypeName(value ?? "")}
          />
          <Dropdown
            label={t("parentType")}
            options={codesTypesList}
            selectedKey={codeType ?? ""}
            onChange={(_, option) => {
              setCodeType(option?.key.toString() ?? "");
            }}
          />
        <SearchBar onSearch={() => Search()} onClear={() => {}} />
        </div>
      </CollapsibleSection>
      <CollapsibleSection title={t("common:searchResults")} open>
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
