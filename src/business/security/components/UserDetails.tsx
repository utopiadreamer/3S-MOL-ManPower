import { FC, useEffect, useState } from "react";
import "../styles/UserDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { UserDTO } from "../../../shared/models/UserDTO";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { CommandBar, PrimaryButton } from "@fluentui/react";
import clsx from "clsx";
import { ConfirmAction } from "../../../shared/components/business/ConfirmAction";
import { Action, Mode } from "../../../shared/constants/types";
import { getUsers } from "../../../shared/mockups/User";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { Claim, Role } from "../../../shared/constants/auth";
import { ClaimsGrid } from "./ClaimsGrid";
import { AddClaim } from "./AddClaim";

export interface Props {
  mode: Mode;
}

export const UserDetails: FC<Props> = (props: Props) => {
  const { mode } = props;
  let params = useParams();
  const [details, setDetails] = useState<UserDTO>();
  const [claims, setClaims] = useState<Claim[]>();
  const [selectedRole, setRole] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [isEditable, setEditable] = useState<boolean>(mode === Mode.New);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showAddClaim, setShowAddClaim] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const { t } = useTranslation(["security", "common"]);
  const navigate = useNavigate();

  const roles = [
    {
      key: Role.Admin.toString(),
      text: t(Role.Admin),
    },
    {
      key: Role.Researcher.toString(),
      text: t(Role.Researcher),
    },
    {
      key: Role.Reviewer.toString(),
      text: t(Role.Reviewer),
    },
    {
      key: Role.DirectorateManager.toString(),
      text: t(Role.DirectorateManager),
    },
    {
      key: Role.CommitteeMember.toString(),
      text: t(Role.CommitteeMember),
    },
    {
      key: Role.ReportViewer.toString(),
      text: t(Role.ReportViewer),
    },
  ];

  useEffect(() => {
    try {
      const list = getUsers().filter((i) => i.ID === params.id);
      if (list && list.length > 0) {
        const data = list[0];
        setRole(data.Role);
        setClaims(data.Claims ?? []);
        setDetails(data);
      }
    } catch {}
  }, [params.id]);

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
            else navigate("/security/users");
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

  const addClaim = (claim: string) => {
    const list = claims;
    var item: Claim = claim as Claim;
    const index = list?.findIndex((i) => i.toString() === claim);
    if (index === -1) list?.push(item);
    setClaims(list);
    setReload(true);
  };

  const onDeleteClaim = () => {
    setReload(true);
  };

  return (
    <LayoutContent>
      <div className="userDetails">
        <div className="body">
          <div className="section">
            <div className="content">
              <div className="actionsHeader">
                <Section
                  title={t("userDetails")}
                  size={SectionSize.h2}
                  iconName="UserOptional"
                />
                <CommandBar items={[]} farItems={getActions()} />
              </div>
              <div className="row">
                {mode === Mode.New ? (
                  <Dropdown
                    label={t("userName")}
                    options={[]}
                    selectedKey={user}
                    onChange={(_, option) =>
                      setUser(option?.key.toString() ?? "")
                    }
                  />
                ) : (
                  <TextField
                    readOnly={!isEditable}
                    label={t("userName")}
                    value={t(details?.UserName ?? "")}
                  />
                )}
                <TextField
                  readOnly={!isEditable}
                  label={t("name")}
                  value={details?.Name ?? ""}
                />
                <TextField
                  readOnly={!isEditable}
                  label={t("email")}
                  value={details?.Email ?? ""}
                />
                <Dropdown
                  label={t("role")}
                  options={roles}
                  selectedKey={selectedRole}
                  onChange={(_, option) =>
                    setRole(option?.key.toString() ?? "")
                  }
                  disabled={!isEditable}
                ></Dropdown>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="content">
              <div className="actionsHeader">
                <Section
                  title={t("claims")}
                  size={SectionSize.h2}
                  iconName="AccountManagement"
                />
                {isEditable && (
                  <PrimaryButton
                    className="actionButton primeAction"
                    iconProps={{ iconName: "Add" }}
                    onClick={() => setShowAddClaim(true)}
                  >
                    {t("addClaim")}
                  </PrimaryButton>
                )}
              </div>
              <ClaimsGrid
                mode={!isEditable ? Mode.View : Mode.Edit}
                reload={reload}
                onRealod={() => setReload(false)}
                onDelete={onDeleteClaim}
                claims={claims ?? []}
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
      {showAddClaim && (
        <AddClaim
          hidden={!showAddClaim}
          onCancel={() => {
            setShowAddClaim(false);
          }}
          onConfirm={(claim: string) => {
            addClaim(claim);
            setShowAddClaim(false);
          }}
        />
      )}
    </LayoutContent>
  );
};
