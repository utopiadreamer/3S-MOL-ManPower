import { FC, useRef, useState } from "react";
import "../styles/EmploymentManage.scss";
import { useTranslation } from "react-i18next";
import { EmployeesGrid } from "./EmployeesGrid";
import { TextField } from "../../../shared/components/forms/CustomTextField";
import { Form } from "../../../shared/components/forms/Form";
import { PrimaryButton } from "@fluentui/react";
import { ValidationType } from "../../../shared/constants/constants";

export const EmploymentManage: FC = () => {
  const { t } = useTranslation(["employment", "common"]);
  const [formData, setFormData] = useState<any>({});
  const form = useRef(new Form({}));
  const [isFormValid, setIsFormValid] = useState<boolean>(form.current.isValid);
  form.current.onValidityChanged = (isValid) => setIsFormValid(isValid);

  const SetValidity = (name: string, isValid: boolean) => {
    form.current.SetValidity(name, isValid);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="employmentManage">
      <div>
        <EmployeesGrid
          items={[]}
          onChanged={() => {
            return false;
          }}
          onNbItemPerPageChanged={() => {
            return false;
          }}
        />
      </div>
    </div>
  );
};
