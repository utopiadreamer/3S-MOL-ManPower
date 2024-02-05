/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/UserDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { Section, SectionSize } from "../../../shared/components/forms/Section";
import { UserDTO } from "../../../shared/models/UserDTO";
import { LayoutContent } from "../../../shared/components/layout/layoutContent/LayoutContent";
import { CommandBar, IDropdownOption, PrimaryButton } from "@fluentui/react";
import clsx from "clsx";
import { ConfirmAction } from "../../../shared/components/business/ConfirmAction";
import { Action, Mode } from "../../../shared/constants/types";
import { getUsers } from "../../../shared/mockups/User";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { Claim, Role } from "../../../shared/constants/auth";
import { ClaimsGrid } from "./ClaimsGrid";
import { AddClaim } from "./AddClaim";
import { GeneralUtil } from "../../../shared/utils/generalUtil";
import { CollapsibleSection } from "../../../shared/components/forms/CollapsibleSection";
import { Form } from "../../../shared/components/forms/Form";

export interface Props {
  mode: Mode;
}

export const UserDetails: FC<Props> = (props: Props) => {
  const { mode } = props;
  let params = useParams();
  const [details, setDetails] = useState<UserDTO>();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [isEditable, setEditable] = useState<boolean>(mode === Mode.New);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showAddClaim, setShowAddClaim] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [searchUserName, setSearchUserName] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const { t } = useTranslation(["security", "common"]);

  const navigate = useNavigate();


  const form = useRef(new Form({}));
  const [isFormValid, setIsFormValid] = useState<boolean>(form.current.isValid);
  form.current.onValidityChanged = (isValid) => setIsFormValid(isValid);

  const SetValidity = (name: string, isValid: boolean) => {
    form.current.SetValidity(name, isValid);
  };

  useEffect(() => {
    if (mode === Mode.New) {
      const data = new UserDTO();
      setDetails(data);
    }
  }, [mode]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDetails((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Save = () => {
    if (form.current.isValid) {
    }
  };

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

  const loadDetails = () => {
    try {
      const list = getUsers().filter((i) => i.ID === params.id);
      if (list && list.length > 0) {
        const data = list[0];
        setSelectedRoles(data.Roles);
        setClaims(data.Claims ?? []);
        setDetails(data);
      }
    } catch {}

  };

  useEffect(() => {
    loadDetails();
  }, [params.id]);

  const getActions = () => {
    const saveAction = {
      key: "save",
      className: clsx("actionButton", "primeAction"),
      text: t("common:save"),
      iconProps: { iconName: "Save" },
      disabled: !isFormValid,
      onClick: () => {
        Save();
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
            if (mode === Mode.View) { 
              loadDetails();
              setEditable(false); }
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

  const Search = () => {
    const user = getUsers().find(
      (i) => i.Email === searchEmail || i.UserName === searchUserName
    );
    if (user) setDetails(user);
    else GeneralUtil.notify();
  };

  const onSelectRoles = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    if (item) {
      setSelectedRoles(
        item.selected
          ? [...selectedRoles, item.key as string]
          : selectedRoles.filter((key) => key !== item.key)
      );
    }
  };

  return (
    <LayoutContent>
      <div className="userDetails">
        <div className="body">
          {mode === Mode.New && (
            <div className="section">
              <div className="content">
                <div className="actionsHeader">
                  <Section
                    title={t("userSearch")}
                    size={SectionSize.h2}
                    iconName="UserOptional"
                  />
                </div>
                <div className="row">
                  <TextField
                    label={t("userName")}
                    value={searchUserName}
                    onChange={(_, v) => setSearchUserName(v ?? "")}
                  />
                  <TextField
                    label={t("email")}
                    value={searchEmail ?? ""}
                    onChange={(_, v) => setSearchEmail(v ?? "")}
                  />
                  <div />
                  <div className="alignEnd">
                    <PrimaryButton
                      className="actionButton primeAction"
                      iconProps={{ iconName: "Search" }}
                      text={t("common:search")}
                      onClick={() => {
                        Search();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {!GeneralUtil.isUndefined(details) && (
            <div>
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
                    <TextField
                      readOnly
                      label={t("userName")}
                      value={details?.UserName}
                    />
                    <TextField
                      readOnly={!isEditable}
                      name="Name"
                      label={t("name")}
                      value={details?.Name ?? ""}
                      onChange={handleInputChange}
                      onValidationChange={SetValidity}
                      required
                    />
                    <TextField
                      readOnly
                      label={t("email")}
                      value={details?.Email ?? ""}
                    />
                    <Dropdown
                      label={t("role")}
                      name="Roles"
                      options={roles}
                      selectedKeys={selectedRoles}
                      onChange={(_, option) => onSelectRoles(_, option)}
                      readOnly={!isEditable}
                      multiSelect
                      onValidationChange={SetValidity}
                      required
                    />
                  </div>
                </div>
              </div>
              <CollapsibleSection
                open
                title={t("claims")}
                iconName="AccountManagement"
              >
                <div className="alignEnd">
                  {isEditable && (
                    <PrimaryButton
                      className="actionButton headerAction"
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
              </CollapsibleSection>
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
      <ToastContainer />
    </LayoutContent>
  );
};
