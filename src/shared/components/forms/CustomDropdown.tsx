/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */

import React, { FC, useCallback, useState, useEffect } from "react";
import clsx from "clsx";
import {
  Dropdown,
  getId,
  Icon,
  IDropdown,
  IDropdownOption,
  IDropdownProps,
  ISelectableDroppableTextProps,
  ISelectableOption,
  Label,
} from "@fluentui/react";
import { useSelector } from "react-redux";
import { FormFieldWithValidationInterface } from "./FormFieldWithValidationInterface";
import "./Forms.scss";
import "./CustomDropdown.scss";
import { RootState } from "../../../redux/store/store";
import { ValidationUtil } from "../../utils/validationUtil";
import { useTranslation } from "react-i18next";

interface ICustomDropdownProps {
  // eslint-disable-next-line react/require-default-props
  callOutWidth?: "ContentFit" | "Fixed";
  name?: string;
}
const CustomDropdown: FC<
  ICustomDropdownProps & IDropdownProps & FormFieldWithValidationInterface
> = (
  props: ICustomDropdownProps &
    IDropdownProps &
    FormFieldWithValidationInterface
) => {
  const currentLang = useSelector(
    (state: RootState) => state.reduxLanguage.language
  );
  const {
    className,
    readOnly,
    containerClassName,
    required,
    callOutWidth,
    name,
  } = props;
  const useClassName = clsx(
    className,
    readOnly ? "mol-cDropDownReadOnly" : "",
    currentLang.isRtl ? "rtlFlag" : "ltrFlag"
  );
  const { label } = props;
  const {
    validationFunc,
    onValidationChange,
    errorMessage: errorMessageFromProps,
    selectedKey,
    id,
    onRenderContainer,
  } = props;
  const [fieldId] = useState(id ?? getId("dd_"));
  const { t } = useTranslation("validation");

  const [errorMessage, setErrorMessage] = useState<string>();
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

  const onChangeKey = useCallback(
    (key?: string | number | string[] | number[] | null) => {
      let newIsValid = true;
      const previousError = errorMessage;

      if (errorMessageFromProps) {
        if (previousError !== errorMessageFromProps) {
          setErrorMessage(errorMessageFromProps);
        }
        //   newIsValid = false;
      } else if (required) {
        const error = ValidationUtil.isSelectionRequired(t, key, label);
        if (previousError !== error) {
          setErrorMessage(error);
        }
        if (error) {
          newIsValid = false;
        }
      }
      if (newIsValid !== isValid) {
        setIsValid(newIsValid);
        if (newIsValid) {
          if (previousError && !errorMessageFromProps) {
            setErrorMessage(undefined);
          }
        }
        if (onValidationChange) {
          onValidationChange(name ?? "", newIsValid);
        }
      }
    },
    [
      errorMessageFromProps,
      errorMessage,
      isValid,
      onValidationChange,
      validationFunc,
      label,
    ]
  );

  useEffect(() => {
    if (onValidationChange) {
      if (required) {
        const error = ValidationUtil.isSelectionRequired(t, selectedKey, label);
        onValidationChange(name ?? "", error === undefined);
      } else {
        onValidationChange(name ?? "", true);
      }
    }
  }, [selectedKey, onValidationChange, validationFunc]);

  const onRenderOption = (props?: ISelectableOption<any> | undefined, defaultRender?: ((props?: ISelectableOption<any> | undefined) => JSX.Element | null) | undefined): JSX.Element => {
    return (
      <div className="optionCont">
        {props?.data && props?.data.icon && (
          <Icon className="optionIcon" iconName={props?.data.icon} aria-hidden="true" title={props?.data.icon} />
        )}
        <span>{props?.text}</span>
      </div>
    );
  };
  

  return (
    <div className={clsx("mol-vertialFlexDiv", containerClassName)}>
      {label && <Label required={required}>{label}</Label>}
      <Dropdown
        {...props}
        onRenderOption={onRenderOption}
        id={fieldId}
        calloutProps={{
          className: callOutWidth !== "Fixed" ? "applyContentFit" : "",
        }}
        className={useClassName}
        errorMessage={
          readOnly ? undefined : errorMessageFromProps ?? errorMessage
        }
        onRenderContainer={(
          p:
            | ISelectableDroppableTextProps<IDropdown, HTMLDivElement>
            | undefined,
          df?: (
            dfp:
              | ISelectableDroppableTextProps<IDropdown, HTMLDivElement>
              | undefined
          ) => JSX.Element | null
        ) => {
          if (callOutWidth !== "Fixed") {
            const dd = document.getElementById(fieldId);
            document.body.style.setProperty(
              "--currentMolDropDownMinSize",
              `${dd?.clientWidth.toString()}px`
            );
          }
          if (onRenderContainer) {
            return onRenderContainer(p, df);
          }
          if (df) {
            return df(p);
          }
          return null;
        }}
        required={undefined}
        label={undefined}
        onChange={(e, key) => {
          onChangeKey(key?.key);
          if (props.onChange) {
            props.onChange(e, key);
          }
        }}
      />
    </div>
  );
};
export { CustomDropdown as Dropdown };
