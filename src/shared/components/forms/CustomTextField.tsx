/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
/* eslint-disable react/display-name */
import React, { FC, useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { TextField, ITextFieldProps, Label } from "@fluentui/react";
import "./CustomTextField.scss";
import { FormFieldWithValidationInterface } from "./FormFieldWithValidationInterface";
import { ValidationUtil } from "../../utils/validationUtil";
import { ValidationType } from "../../constants/types";
import { GeneralUtil } from "../../utils/generalUtil";

export enum InputType {
  None,
  Number,
  DecimalNumber,
  LetterOnly,
}

export interface CustomTextFieldProps extends FormFieldWithValidationInterface {
  arabic?: boolean;
  isManualErrorMessageBlock?: boolean;
  inputType?: InputType;
}
export type ITextField = ITextFieldProps & CustomTextFieldProps;

const CustomTextField: FC<ITextField> = (props: ITextField) => {
  const {
    onValidationChange,
    validations,
    errorMessage: errorMessageFromProps,
    value,
    isManualErrorMessageBlock,
    inputType,
    className,
    readOnly,
    required,
    arabic,
    onChange,
    containerClassName,
    disabled,
    name,
    label,
  } = props;
  const [errorMessage, setErrorMessage] = useState<string | JSX.Element>();
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const [isValidInput, setIsValidInput] = useState<boolean | undefined>(
    undefined
  );
  const { t } = useTranslation("validation");

  const getError = (val?: string) => {
    let newIsValid = true;
    let error: any;
    if (errorMessageFromProps) {
      if (errorMessage !== errorMessageFromProps) {
        setErrorMessage(errorMessageFromProps);
      }
      if (isManualErrorMessageBlock) {
        newIsValid = false;
      }
    } else if ((validations && validations?.length > 0) || required) {
      const validationVal = val?.toString().trim();
      if (required) {
        error = ValidationUtil.validate(
          ValidationType.Required,
          validationVal ?? "",
          name ?? "",
          t,
          label
        );
      }
      validations?.forEach((validationType: ValidationType) => {
        error = ValidationUtil.validate(
          validationType,
          validationVal ?? "",
          name ?? "",
          t
        );
      });
    }
    return { error: error, newIsValid: newIsValid };
  };

  const onTextChange = (val?: string) => {
    const previousError = errorMessage;
    const error = getError(val);
    if (previousError !== error.error) {
      setErrorMessage(error.error);
    }
    if (error.error) {
      error.newIsValid = false;
    }
    if (error?.newIsValid !== isValid) {
      setIsValid(error.newIsValid);
      if (error?.newIsValid) {
        if (previousError) {
          if (!isManualErrorMessageBlock || !errorMessageFromProps) {
            setErrorMessage(undefined);
            setIsValidInput(true);
          }
        } else setIsValidInput(true);
      }
      if (onValidationChange) {
        onValidationChange(name ?? "", error?.newIsValid ?? false);
      }
    }
  };

  const onChangeValue = useCallback(
    (val?: string) => {
      onTextChange(val);
    },
    [
      errorMessageFromProps,
      errorMessage,
      isValid,
      isManualErrorMessageBlock,
      onValidationChange,
    ]
  );

  useEffect(() => {
    if (onValidationChange) {
      if ((validations && validations?.length > 0) || required) {
        const error = getError(value);
        if (error.error === undefined && errorMessage) {
          setErrorMessage(undefined); // when value change by binding remove the previous error message
          setIsValidInput(true);
        }
        onValidationChange(name ?? "", error.error === undefined);
      } else {
        onValidationChange(name ?? "", true);
      }
    }
  }, [value, onValidationChange]);

  const borderClass =
    errorMessage !== undefined
      ? "invalidClass"
      : isValidInput && !GeneralUtil.isNothing(value)
      ? "validClass"
      : undefined;
  const useClassName = clsx(
    "mol-cTextField",
    className,
    readOnly ? "mol-cTextFieldReadOnly" : "",
    arabic ? "rtlTextField" : "",
    borderClass
  );
  return (
    <div className={clsx("vertialFlexDiv", containerClassName)}>
      {label && <Label required={required}>{label}</Label>}
      <div className="textContainer">
        {/* <div className={clsx("textIcon", borderClass)}>
          <Icon
            iconName={
              errorMessage !== undefined
                ? "StatusErrorFull"
                : isValidInput && !GeneralUtil.isNothing(value)
                ? "CompletedSolid"
                : "Edit"
            }
          ></Icon>
        </div> */}
        <TextField
          {...props}
          label={undefined}
          required={undefined}
          className={useClassName}
          placeholder={`${t('insert')} ${label}`}
          errorMessage={
            readOnly || disabled
              ? undefined
              : errorMessageFromProps ?? errorMessage
          }
          value={value ?? ""}
          onChange={(e, v) => {
            if (ValidationUtil.checkFormat(v, inputType)) {
              onChangeValue(v);
              if (onChange) {
                onChange(e, v);
              }
            }
          }}
          iconProps={{
            iconName:
              errorMessage !== undefined
                ? "StatusErrorFull"
                : isValidInput && !GeneralUtil.isNothing(value)
                ? "CompletedSolid"
                : undefined,
          }}
        />
      </div>
    </div>
  );
};
export { CustomTextField as TextField };
