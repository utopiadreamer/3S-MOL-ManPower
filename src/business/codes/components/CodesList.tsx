import { FC, useEffect, useState } from "react";
import { CodesGrid } from "./CodesGrid";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { CodeDTO } from "../../../shared/models/CodeDTO";
import { getCodes } from "../../../shared/mockups/Codes";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { getCodesTypes } from "../../../shared/mockups/CodesTypes";
import { IDropdownOption, PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../../shared/components/forms/CustomTextField";

export const CodesList: FC = () => {
  const [codes, setCodes] = useState<CodeDTO[]>([]);
  const [codesTypes, setCodesTypes] = useState<IDropdownOption[]>([]);
  const [codeType, setCodeType] = useState<string>();
  const [code, setCode] = useState<string>();
  const { t } = useTranslation(["codes"]);
  const navigate = useNavigate();

  const getCodesList = (type: string) => {
    const codes = getCodes().filter((i) => i.CodeTypeID.toString() === type);
    setCodes(codes);
  };

  const Search = () => {
    getCodesList(codeType ?? "");
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
      <div className="section">
        <div className="content">
          <Section
            size={SectionSize.h2}
            iconName="Search"
            title={t("common:searchFilters")}
          />
          <div className="row">
            <TextField
              label={t("code")}
              value={t(code ?? "")}
              onChange={(e, value) => setCode(value ?? "")}
            />
            <Dropdown
              label={t("codeType")}
              options={codesTypes}
              selectedKey={codeType ?? ""}
              onChange={(_, option) => {
                setCodeType(option?.key.toString() ?? "");
              }}
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
            <Section size={SectionSize.h2} iconName="Code" title={t("codes")} />
            <PrimaryButton
              className="actionButton primeAction"
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
        </div>
      </div>
    </LayoutContent>
  );
};
