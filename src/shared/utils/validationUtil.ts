import { TFunction } from 'i18next';
import { InputType } from '../components/forms/CustomTextField';
import { ValidationType } from '../constants/constants';

export class ValidationUtil {

  public static checkFormat = (val: string | undefined, inputType?: InputType) => {
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

  public static validate = (validation: ValidationType, validationVal: string, name: string, t: TFunction, label?: string) => {
    if (validation === ValidationType.Required) {
      return ValidationUtil.isRequired(t, validationVal, name ?? '', label);
    } 
    if (validation === ValidationType.Email && validationVal !== '') {
      return ValidationUtil.isValidEmail(t, validationVal, name ?? '');
    } 
    if (validation === ValidationType.NationalID) {
      return ValidationUtil.isValidNationalID(t, validationVal, name ?? '');
    } 
    if (validation === ValidationType.MobileNo) {
      return ValidationUtil.isValidMobileNo(t, validationVal, name ?? '');
    } 
  }

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
    return t('validation:selectionRequired', { label });
  }

  public static isValidEmail(
    t: TFunction,
    mail: string | undefined,
    fieldName: string
  ): string | undefined {
    if (mail) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return undefined;
      }
    }
    return t('validation:invalidEmail', { fieldName });
  }
  
  
  public static isValidMobileNo(
    t: TFunction,
    value: string | undefined,
    fieldName: string
  ): string | undefined {
    if (value) {
      if (/^01[0125][0-9]{8}$/.test(value)) {
        return undefined;
      }
    }
    return t('validation:invalidMobileNo', { fieldName });
  }

  public static isValidNationalID(
    t: TFunction,
    value: string | undefined,
    fieldName: string
  ): string | undefined {
    if (value) {
      if (/^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/.test(value)) {
        return undefined;
      }
    }
    return t('validation:invalidNationalID', { fieldName });
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
    return t('validation:isRequired', { Label: label });
  }
}
