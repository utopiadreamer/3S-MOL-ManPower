import { TFunction } from "i18next";
import { InputType } from "../components/forms/CustomTextField";
import { ValidationType } from "../constants/types";

export class ValidationUtil {
  public static checkFormat = (
    val: string | undefined,
    inputType?: InputType
  ) => {
    if (inputType && val) {
      switch (inputType) {
        case InputType.Number:
          return /^[0-9]+$/.test(val);
        case InputType.DecimalNumber:
          return /^[0-9]+\.?[0-9]*$/.test(val);
        case InputType.LetterOnly:
          // eslint-disable-next-line no-useless-escape
          return /^[a-zA-Z ,-@\(\)]+$/.test(val);
        default:
          return true;
      }
    }
    return true;
  };

  public static validate = (
    validation: ValidationType,
    validationVal: string,
    name: string,
    t: TFunction,
    label?: string
  ) => {
    if (validation === ValidationType.Required) {
      return ValidationUtil.isRequired(t, validationVal, name ?? "", label);
    }
    if (validation === ValidationType.Email && validationVal !== "") {
      const isValid = ValidationUtil.isValidEmail(validationVal);
      if (!isValid) return t("validation:invalidEmail", { name });
    }
    if (validation === ValidationType.NationalID) {
      const isValid = ValidationUtil.isValidNationalID(validationVal);
      if (!isValid) return t("validation:invalidNationalID", { name });
    }
    if (validation === ValidationType.MobileNo) {
      const isValid = ValidationUtil.isValidMobileNo(validationVal);
      if (!isValid) return t("validation:invalidMobileNo", { name });
    }
  };

  public static isSelectionRequired(
    t: TFunction,
    value:
      | string
      | Date
      | number
      | string[]
      | Date[]
      | number[]
      | null
      | undefined,
    label?: string
  ): string | undefined {
    if (value && value !== -1) {
      return undefined;
    }
    return t("validation:selectionRequired", { label });
  }

  public static isValidEmail(mail: string | undefined): boolean {
    if (mail) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      }
    }
    return false;
  }

  public static isValidMobileNo(value: string | undefined): boolean {
    if (value) {
      if (/^01[0125][0-9]{8}$/.test(value)) {
        return true;
      }
    }
    return false;
  }

  public static isValidNationalID(value: string | undefined): boolean {
    if (value) {
      if (
        /^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/.test(
          value
        )
      ) {
        return true;
      }
    }
    return false;
  }

  public static isRequired(
    t: TFunction,
    value:
      | string
      | Date
      | number
      | string[]
      | Date[]
      | number[]
      | null
      | undefined,
    fieldName: string,
    label?: string
  ): string | undefined {
    if (value) {
      return undefined;
    }
    return t("validation:isRequired", { Label: label });
  }
}
