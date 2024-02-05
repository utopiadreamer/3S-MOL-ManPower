import React, { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import {
  IDatePickerProps,
  DatePicker,
  IDatePickerStrings,
  Label,
  IDateFormatting,
} from "@fluentui/react";
import { FormFieldInterface } from "./FormFieldInterface";
import "./CustomDatePicker.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { DatesUtil } from "../../utils/datesUtil";
import { GeneralUtil } from "../../utils/generalUtil";

const CustomDatePicker: FC<IDatePickerProps & FormFieldInterface> = (
  props: IDatePickerProps & FormFieldInterface
) => {
  const currentLang = useSelector(
    (state: RootState) => state.reduxLanguage.language
  );
  const { className, readOnly, containerClassName, isRequired } = props;
  const useClassName = clsx(
    className,
    readOnly ? "mol-cDatePickerReadOnly" : "",
    currentLang.isRtl ? "rtlFlag" : "ltrFlag"
  );
  const { label } = props;
  const { t } = useTranslation(["calendar", "validation"]);

  const getdateformatting = (locale: string): IDateFormatting => {
    return {
      formatYear: (d) => d.toLocaleString(locale, { year: "numeric" }),
      formatDay: (d) => d.toLocaleString(locale, { day: "numeric" }),
      formatMonth: (d) => d.toLocaleString(locale, { month: "numeric" }),
      formatMonthDayYear: (d) =>
        d.toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      formatMonthYear: (d) =>
        d.toLocaleString(locale, { year: "numeric", month: "long" }),
    };
  };

  const overrideDayPickerStrings: IDatePickerStrings = {
    months: [
      t("calendar:janFull"),
      t("calendar:febFull"),
      t("calendar:marFull"),
      t("calendar:aprFull"),
      t("calendar:mayFull"),
      t("calendar:juneFull"),
      t("calendar:julFull"),
      t("calendar:augFull"),
      t("calendar:sepFull"),
      t("calendar:octFull"),
      t("calendar:novFull"),
      t("calendar:decFull"),
    ],
    shortMonths: [
      t("calendar:janShort"),
      t("calendar:febShort"),
      t("calendar:marShort"),
      t("calendar:aprShort"),
      t("calendar:mayShort"),
      t("calendar:juneShort"),
      t("calendar:julShort"),
      t("calendar:augShort"),
      t("calendar:sepShort"),
      t("calendar:octShort"),
      t("calendar:novShort"),
      t("calendar:decShort"),
    ],

    days: [
      t("calendar:sunFull"),
      t("calendar:monFull"),
      t("calendar:tuesFull"),
      t("calendar:wedFull"),
      t("calendar:thurFull"),
      t("calendar:friFull"),
      t("calendar:satFull"),
    ],

    shortDays: [
      t("calendar:sunShort"),
      t("calendar:monShort"),
      t("calendar:tuesShort"),
      t("calendar:wedShort"),
      t("calendar:thurShort"),
      t("calendar:friShort"),
      t("calendar:satShort"),
    ],

    goToToday: t("calendar:goToToday"),
    prevMonthAriaLabel: t("calendar:prevMonth"),
    nextMonthAriaLabel: t("calendar:nextMonth"),
    prevYearAriaLabel: t("calendar:prevYear"),
    nextYearAriaLabel: t("calendar:nextYear"),
    closeButtonAriaLabel: t("calendar:closeButton"),
  };

  const stringsOverride =
    currentLang.lang === "ar" ? overrideDayPickerStrings : undefined;
  const dateTimeFormatterOverride =
    currentLang.lang === "ar"
      ? getdateformatting(currentLang.langIso4)
      : undefined;
  return (
    <div className={clsx("vertialFlexDiv", containerClassName)}>
      {label && <Label required={isRequired}>{label}</Label>}
      <DatePicker
        {...props}
        isRequired={undefined}
        placeholder={GeneralUtil.isNothing(label) || readOnly ? "" : `${t('validation:select')} ${label}`}
        className={useClassName}
        label={undefined}
        strings={stringsOverride}
        dateTimeFormatter={dateTimeFormatterOverride}
        formatDate={(date) => {
          return DatesUtil.FormatDatePickerValue(date, "ar-EG");
        }}
        parseDateFromString={DatesUtil.ParseDatePickerString}
      />
    </div>
  );
};
export { CustomDatePicker as DatePicker };
