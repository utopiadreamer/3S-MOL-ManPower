import { ActionButton } from "@fluentui/react";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ConfirmAction.scss";
import { Dialog } from "../forms/CustomDialog";
import { Action } from "../../constants/types";

interface ConfirmActionProps {
  action: Action;
  type: string;
  name?: string;
  hidden: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmAction: FC<ConfirmActionProps> = (
  props: ConfirmActionProps
) => {
  const { hidden, onCancel, onConfirm, type, name, action } = props;
  const { t } = useTranslation(["common"]);
  const [hiddenDialog, setHiddenDialog] = useState<boolean>(hidden);

  const onDialogClosed = () => {
    onCancel();
    setHiddenDialog(true);
  };

  const onDialogCancel = async () => {
    onCancel();
    setHiddenDialog(true);
  };

  const onConfirmAction = async () => {
    onConfirm();
    setHiddenDialog(true);
  };

  return (
    <Dialog
      containerClassName="confirmActionDialog"
      hidden={hiddenDialog}
      onDismiss={() => onDialogClosed()}
      maxWidth={600}
      title={t("common:confirmActionTitle", {Action: t(`common:${action.toLowerCase()}`)})}
      Footer={
        <div className="confirmFooter">
          <ActionButton
            className="actionButton primeAction"
            onClick={onConfirmAction}
            text={t(action.toLowerCase())}
          />
          <ActionButton
            className="actionButton subAction"
            onClick={onDialogCancel}
            text={t("common:keep")}
          />
        </div>
      }
    >
      <div className="actionText">
        <span>{`${t("common:primeAction", {Type: type, Action: t(action.toLowerCase())})} {${name}}`}</span>
        <br/>
      </div>
    </Dialog>
  );
};
