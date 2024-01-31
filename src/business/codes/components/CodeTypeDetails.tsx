/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import "../styles/CodeDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { CommandBar, IDropdownOption, PrimaryButton } from "@fluentui/react";
import clsx from "clsx";
import { ConfirmAction } from "../../../shared/components/business/ConfirmAction";
import { Action, Mode } from "../../../shared/constants/types";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { getCodesTypes } from "../../../shared/mockups/CodesTypes";
import { CodeTypeDTO } from "../../../shared/models/CodeTypeDTO";
import { AddMetadata } from "./MetadataManage";
import { MetadataDTO } from "../../../shared/models/MetadataDTO";
import { MetadatasGrid } from "./MetadataGrid";

export interface Props {
  mode: Mode;
}

export const CodeTypeDetails: FC<Props> = (props: Props) => {
  const { mode } = props;
  let params = useParams();
  const [details, setDetails] = useState<CodeTypeDTO>();
  const [metadata, setMetadata] = useState<MetadataDTO[]>([]);
  const [isEditable, setEditable] = useState<boolean>(mode === Mode.New);
  const [codeType, setCodeType] = useState<string>();
  const [codesTypes, setCodesTypes] = useState<IDropdownOption[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [showAddMetadataDialog, setShowAddMetadataDialog] =
    useState<boolean>(false);
  const { t } = useTranslation("codes");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const list = getCodesTypes().filter((i) => i.ID.toString() === params.id);
      if (list && list.length > 0) {
        const data = list[0];
        setCodeType(data?.ParentID?.toString());
        setMetadata(data.Metadata ?? []);
        setDetails(data);
      }
      getTypes();
    } catch {}
  }, [params.id]);

  const getTypes = () => {
    const types = getCodesTypes().filter((i) => i.ID.toString() !== params.id);
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
            else navigate("/codesTypes");
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

  const onDeleteMetadata = () => {
    setReload(true);
  };

  const addMetadata = (item?: MetadataDTO) => {
    const list = metadata;
    if (item) list?.push(item);
    setMetadata(list);
    setReload(true);
  };

  return (
    <LayoutContent>
      <div className="codeDetails">
        <div className="body">
          <div className="section">
            <div className="content">
              <div className="actionsHeader">
                <Section
                  title={t("codeTypeDetails")}
                  size={SectionSize.h2}
                  iconName="FileCode"
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
                  label={t("parentType")}
                  selectedKey={codeType}
                  options={codesTypes}
                  onChange={(_, option) => setCodeType(option?.key.toString())}
                  disabled={!isEditable}
                />
              </div>
            </div>
          </div>

          <div className="section">
            <div className="content">
              <div className="actionsHeader">
                <Section
                  title={t("metadata")}
                  size={SectionSize.h2}
                  iconName="EditNote"
                />
                {isEditable && (
                  <PrimaryButton
                    className="actionButton primeAction"
                    iconProps={{ iconName: "Add" }}
                    onClick={() => setShowAddMetadataDialog(true)}
                  >
                    {t("addMetadata")}
                  </PrimaryButton>
                )}
              </div>
              <MetadatasGrid
                mode={!isEditable ? Mode.View : Mode.Edit}
                reload={reload}
                onRealod={() => setReload(false)}
                onDelete={onDeleteMetadata}
                metadata={metadata ?? []}
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
      {showAddMetadataDialog && (
        <AddMetadata
          hidden={!showAddMetadataDialog}
          onCancel={() => {
            setShowAddMetadataDialog(false);
          }}
          onConfirm={(metadata?: MetadataDTO) => {
            addMetadata(metadata);
          }}
        />
      )}
    </LayoutContent>
  );
};
