/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import "../styles/CodeDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  InputType,
  TextField,
} from "../../../shared/components/forms/CustomTextField";
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
import { MetadataDTO } from "../../../shared/models/MetadataDTO";

export interface Props {
  mode: Mode;
}

export const CodeDetails: FC<Props> = (props: Props) => {
  const { mode } = props;
  let params = useParams();
  const [details, setDetails] = useState<CodeDTO>();
  const [metadata, setMetadata] = useState<MetadataDTO[]>([]);
  const [isEditable, setEditable] = useState<boolean>(mode === Mode.New);
  const [codeType, setCodeType] = useState<string>();
  const [parentCode, setParentCode] = useState<string>();
  const [codesTypes, setCodesTypes] = useState<IDropdownOption[]>([]);
  const [codes, setCodes] = useState<IDropdownOption[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const { t } = useTranslation("codes");
  const navigate = useNavigate();

  useEffect(() => {
    getCodesList(details?.ParentID?.toString() ?? "");
    setParentCode(details?.ParentID?.toString());
  }, [details]);

  const getCodesList = (id: string) => {
    const codes = getCodes().filter((i) => i.ID?.toString() === id);
    const list = codes.map((item) => {
      return {
        key: item.ID.toString(),
        text: item.Name,
      };
    });
    setCodes(list);
  };

  const getMetadata = (id: string, metadata: string) => {
    const type = getTypesList(id);
    const data = type[0].Metadata;
    if (type && metadata) {
      const json = JSON.parse(metadata);
      data?.forEach((item) => {
        item.Value = json.find(
          (el: { name: string }) => el.name === item.Name
        ).value;
      });
    }
    setMetadata(data ?? []);
  };

  useEffect(() => {
    try {
      const list = getCodes().filter((i) => i.ID.toString() === params.id);
      if (list && list.length > 0) {
        const data = list[0];
        setCodeType(data?.CodeTypeID?.toString());
        getMetadata(data.CodeTypeID.toString(), data?.Metadata ?? "");
        setDetails(data);
      }
      getTypes();
    } catch {}
  }, [params.id]);

  const getTypesList = (id?: string) => {
    let types = getCodesTypes();
    if (id) {
      const arr = [];
      const type = types.find((i) => i.ID.toString() === id);
      if (type) arr.push(type);
      return arr;
    }
    return types;
  };

  const getTypes = () => {
    const types = getTypesList();
    const list = types.map((item) => {
      return {
        key: item.ID.toString(),
        text: item.Name,
      };
    });
    setCodesTypes(list);
  };

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
      <div className="codeDetails">
        <div className="body">
          <div className="section">
            <div className="content">
              <div className="actionsHeader">
                <Section
                  title={t("codeDetails")}
                  size={SectionSize.h2}
                  iconName="Code"
                />
                <CommandBar items={[]} farItems={getActions()} />
              </div>
              <div className="row">
                {mode !== Mode.New && (
                  <TextField
                    readOnly
                    label={t("code")}
                    value={details?.Code ?? ""}
                  />
                )}
                <TextField
                  readOnly={!isEditable}
                  label={t("name")}
                  value={t(details?.Name ?? "")}
                />
                <Dropdown
                  label={t("codeType")}
                  selectedKey={codeType}
                  options={codesTypes}
                  onChange={(_, option) => {
                    const key = option?.key.toString() ?? "";
                    getMetadata(key, "");
                    setCodeType(key);
                    getCodesList(key);
                  }}
                  disabled={!isEditable}
                />
                <Dropdown
                  label={t("parentID")}
                  selectedKey={parentCode}
                  options={codes}
                  onChange={(_, option) =>
                    setParentCode(option?.key.toString())
                  }
                  disabled={!isEditable}
                />
              </div>
            </div>
          </div>
          {metadata.length > 0 && (
            <div className="section">
              <div className="content">
                <Section
                  title={t("metadata")}
                  size={SectionSize.h2}
                  iconName="EditNote"
                />
                <div className="row">
                  {metadata.map((item) => {
                    return (
                      <TextField
                        key={item.Name}
                        value={item.Value}
                        label={item.Label}
                        name={item.Name}
                        maxLength={item.MaxLength}
                        inputType={
                          item.Type === "number"
                            ? InputType.Number
                            : InputType.None
                        }
                        readOnly={!isEditable}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
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
