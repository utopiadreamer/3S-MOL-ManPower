import { FC, useEffect, useState } from "react";
import "../styles/CodeDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { getCodes } from "../../../shared/mockups/Codes";
import { CodeDTO } from "../../../shared/models/CodeDTO";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { CommandBar, IDropdownOption } from "@fluentui/react";
import clsx from "clsx";
import { ConfirmAction } from "../../../shared/components/business/ConfirmAction";
import { Action, Mode } from "../../../shared/constants/types";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { getCodesTypes } from "../../../shared/mockups/CodesTypes";

export interface Props {
  mode: Mode;
}

export const CodeDetails: FC<Props> = (props: Props) => {
  const { mode } = props;
  let params = useParams();
  const [details, setDetails] = useState<CodeDTO>();
  const [isEditable, setEditable] = useState<boolean>(mode === Mode.New);
  const [codeType, setCodeType] = useState<string>();
  const [parentCode, setParentCode] = useState<string>();
  const [codesTypes, setCodesTypes] = useState<IDropdownOption[]>([]);
  const [codes, setCodes] = useState<IDropdownOption[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const { t } = useTranslation("codes");
  const navigate = useNavigate();

  useEffect(() => {
    getCodesList(details?.ParentID?.toString() ?? '');
    setParentCode(details?.ParentID?.toString());
  }, [details]);

  const getCodesList = (id: string) => {
    const codes = getCodes().filter(
      (i) => i.ID?.toString() === id
    );
    const list = codes.map((item) => {
      return {
        key: item.ID.toString(),
        text: item.Name,
      };
    });
    setCodes(list);
  };

  useEffect(() => {
    try {
      const list = getCodes().filter((i) => i.ID.toString() === params.id);
      if (list && list.length > 0) {
        const data = list[0];
        setCodeType(data?.CodeTypeID?.toString());
        setDetails(data);
      }
      getTypes();
    } catch {}
  }, [params.id]);

  const getTypes = () => {
    const types = getCodesTypes();
    const list = types.map((item) => {
      return {
        key: item.ID.toString(),
        text: item.Name,
      };
    });
    setCodesTypes(list);
  }

  const getActions = () => {
    const saveAction = {
      key: "save",
      className: clsx("actionButton", "primeAction"),
      text: t("common:save"),
      iconProps: { iconName: "Save" },
      onClick: () => {
        setEditable(false);
      },
    };
    const primeAction = {
      key: "delete",
      className: clsx("actionButton", "primeAction"),
      text: t("common:delete"),
      iconProps: { iconName: "Delete" },
      onClick: () => {
        setShowDeleteDialog(true);
      },
    };
    const arr = [
      {
        key: "edit",
        className: clsx("actionButton", isEditable ? "subAction" : "subAction"),
        text: t(isEditable ? "common:cancel" : "common:edit"),
        iconProps: { iconName: isEditable ? "Cancel" : "Edit" },
        onClick: () => {
          if (isEditable) {
            if (mode === Mode.View) setEditable(false);
            else navigate("/codes");
          } else {
            setEditable(true);
          }
        },
      },
    ];
    if (isEditable) {
      arr.splice(0, 0, saveAction);
    } else arr.push(primeAction);
    return arr;
  };

  return (
    <LayoutContent>
      <div className="codeDetails panel">
        <div className="body">
            <div className="content">
          <div className="section">
            <div className="actionsHeader">
              <Section
                title={t("codeDetails")}
                size={SectionSize.h2}
                iconName="Bank"
              />
              <CommandBar items={[]} farItems={getActions()} />
            </div>
              <div className="row">
                <TextField
                  readOnly
                  label={t("code")}
                  value={details?.Code ?? ""}
                />
                <TextField
                  readOnly={!isEditable}
                  label={t("name")}
                  value={t(details?.Name ?? "")}
                />
                <Dropdown
                  label={t("codeType")}
                  selectedKey={codeType}
                  options={codesTypes}
                  onChange={(_, option) => { setCodeType(option?.key.toString()); getCodesList(option?.key.toString() ?? '')}}
                  disabled={!isEditable}
                />
                <Dropdown
                  label={t("parentID")}
                  selectedKey={parentCode}
                  options={codes}
                  onChange={(_, option) => setParentCode(option?.key.toString())}
                  disabled={!isEditable}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeleteDialog && (
        <ConfirmAction
          action={Action.Delete}
          hidden={!showDeleteDialog}
          onCancel={() => {
            setShowDeleteDialog(false);
          }}
          name={details?.Name}
          type={t("type")}
          onConfirm={() => {
            setShowDeleteDialog(false);
          }}
        />
      )}
    </LayoutContent>
  );
};
