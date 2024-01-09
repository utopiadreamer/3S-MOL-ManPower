
import { ValidationType } from '../../constants/constants';
import { FormFieldInterface } from './FormFieldInterface';

export interface FormFieldWithValidationInterface extends FormFieldInterface {
  validations?: ValidationType[];
  onValidationChange?: (name: string, isValid: boolean) => void;
  validationFunc?: (
    value:
      | string
      | Date
      | number
      | string[]
      | Date[]
      | number[]
      | null
      | undefined
  ) => string | undefined;
}
