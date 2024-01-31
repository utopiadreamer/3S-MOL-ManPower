import { FC, useState } from "react";
import {
  InputType,
  TextField,
} from "../../../shared/components/forms/CustomTextField";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../../../shared/components/forms/CustomDropdown";
import { Dialog } from "../../../shared/components/forms/CustomDialog";
import { ActionButton } from "@fluentui/react";
import { MetadataDTO } from "../../../shared/models/MetadataDTO";

interface AddMetadataProps {
  hidden: boolean;
  onCancel: () => void;
  onConfirm: (metadata?: MetadataDTO) => void;
}

export const AddMetadata: FC<AddMetadataProps> = (props: AddMetadataProps) => {
  const { t } = useTranslation(["codes", "common"]);
  const { hidden, onCancel, onConfirm } = props;
  const [type, setType] = useState<string>("");
  const [data, setData] = useState<MetadataDTO>();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onAddMetadata = () => {
    onConfirm(data);
    onCancel();
  };

  const onSelectType = (value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      Type: value,
    }));
    setType(value);
  };

  const types = [
    {
      key: "text",
      text: t("text"),
    },
    {
      key: "number",
      text: t("number"),
    },
  ];

  return (
    <Dialog
      containerClassName="addClaimDialog"
      hidden={hidden}
      onDismiss={() => onCancel()}
      maxWidth={600}
      title={t("addMetadata")}
      Footer={
        <div className="addClaimFooter">
          <ActionButton
            className="actionButton primeAction"
            onClick={onAddMetadata}
            text={t("common:add")}
          />
          <ActionButton
            className="actionButton subAction"
            onClick={onCancel}
            text={t("common:cancel")}
          />
        </div>
      }
    >
      <div className="row g-3">
        <TextField
          name="Name"
          value={data?.Name}
          onChange={handleInputChange}
          label={t("fieldName")}
        />
        <TextField
          name="Label"
          value={data?.Label}
          onChange={handleInputChange}
          label={t("fieldLabel")}
        />
        <Dropdown
          label={t("fieldType")}
          options={types}
          selectedKey={type}
          onChange={(_, option) => onSelectType(option?.key.toString() ?? "")}
        />
      </div>
      <div className="row g-3">
        <TextField
          name="MaxLength"
          label={t("fieldMaxLength")}
          value={data?.MaxLength?.toString()}
          onChange={handleInputChange}
          inputType={InputType.Number}
        />
        <TextField
          name="MinValue"
          label={t("fieldMinValue")}
          value={data?.MinValue?.toString()}
          onChange={handleInputChange}
          inputType={InputType.Number}
        />
        <TextField
          name="MaxValue"
          label={t("fieldMaxValue")}
          value={data?.MaxValue?.toString()}
          onChange={handleInputChange}
          inputType={InputType.Number}
        />
      </div>
    </Dialog>
  );
};
