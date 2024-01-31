import { ActionButton } from "@fluentui/react";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/UserDetails.scss";
import { Dialog } from "../../../shared/components/forms/CustomDialog";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { Claim } from "../../../shared/constants/auth";

interface AddClaimProps {
  hidden: boolean;
  onCancel: () => void;
  onConfirm: (claim: string) => void;
}

export const AddClaim: FC<AddClaimProps> = (props: AddClaimProps) => {
  const { hidden, onCancel, onConfirm } = props;
  const { t } = useTranslation(["security", "common"]);
  const [hiddenDialog, setHiddenDialog] = useState<boolean>(hidden);
  const [claim, setClaim] = useState<string>("");

  const onDialogClosed = () => {
    onCancel();
    setHiddenDialog(true);
  };

  const onDialogCancel = async () => {
    onCancel();
    setHiddenDialog(true);
  };

  const onAddClaim = async () => {
    onConfirm(claim);
    setHiddenDialog(true);
  };

  const claims = [
    {
      key: Claim.AddRequest,
      text: t(Claim.AddRequest),
    },
    {
      key: Claim.EditContract,
      text: t(Claim.EditContract),
    },
    {
      key: Claim.DeleteContract,
      text: t(Claim.DeleteContract),
    },
    {
      key: Claim.AddCode,
      text: t(Claim.AddCode),
    },
    {
      key: Claim.EditCode,
      text: t(Claim.EditCode),
    },
    {
      key: Claim.DeleteCode,
      text: t(Claim.DeleteCode),
    },
    {
      key: Claim.EditEstablishment,
      text: t(Claim.EditEstablishment),
    },
    {
      key: Claim.EditWorker,
      text: t(Claim.EditWorker),
    },
    {
      key: Claim.DeleteWorker,
      text: t(Claim.DeleteWorker),
    },
  ];

  return (
    <Dialog
      containerClassName="addClaimDialog"
      hidden={hiddenDialog}
      onDismiss={() => onDialogClosed()}
      maxWidth={600}
      title={t("addClaim")}
      Footer={
        <div className="addClaimFooter">
          <ActionButton
            className="actionButton primeAction"
            onClick={onAddClaim}
            text={t("common:add")}
          />
          <ActionButton
            className="actionButton subAction"
            onClick={onDialogCancel}
            text={t("common:cancel")}
          />
        </div>
      }
    >
      <div className="actionText">
        <Dropdown
          label={t("claimName")}
          selectedKey={claim}
          options={claims}
          onChange={(_, option) => setClaim(option?.key.toString() ?? "")}
        />
        <br />
      </div>
    </Dialog>
  );
};
