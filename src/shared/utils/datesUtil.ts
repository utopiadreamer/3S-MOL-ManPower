export class DatesUtil {
  public static FormatDatePickerValue = (
    date: Date | undefined,
    currentLocale?: string
  ): string => {
    const locale =
      currentLocale && currentLocale !== "" ? currentLocale : "en-gb"; // default

    if (locale?.trim().toLocaleLowerCase().startsWith("en")) {
      return date
        ? `${date
            .getDate()
            .toLocaleString(locale, { minimumIntegerDigits: 2 })}/${(
            date.getMonth() + 1
          ).toLocaleString(locale, { minimumIntegerDigits: 2 })}/${date
            .getFullYear()
            .toLocaleString(locale)
            .replace(/,/g, "")}`
        : "";
    }
    return date
      ? `${date.getFullYear().toLocaleString(locale).replace(/٬/g, "")}/${(
          date.getMonth() + 1
        ).toLocaleString(locale, { minimumIntegerDigits: 2 })}/${date
          .getDate()
          .toLocaleString(locale, { minimumIntegerDigits: 2 })}`
      : "";
  };

  public static ParseDatePickerString = (val: string): Date | null => {
    const values = (val || "").trim().split("/");
    const day =
      val.length > 0
        ? Math.max(1, Math.min(31, parseInt(values[0], 10)))
        : null;
    const month =
      val.length > 1
        ? Math.max(1, Math.min(12, parseInt(values[1], 10))) - 1
        : null;
    const year = val.length > 2 ? parseInt(values[2], 10) : null;

    return day && month && year ? new Date(year, month, day) : null;
  };

  public static getLocalizedDateTime = (
    type: string,
    date: Date | undefined,
    locale = "ar",
    toUTC = false,
    hour12 = true,
    showSeconds = false,
    timeZone?: string | undefined
  ) => {
    if (!date) return "";
    const newDate = new Date(`${date}${toUTC ? "Z" : ""}`);

    let localDate = "";
    switch (type) {
      case "Date":
        localDate = newDate?.toLocaleDateString(
          locale?.startsWith("ar") ? "ar-EG" : ["ban", "id"],
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            timeZone,
          }
        );
        break;
      case "DateTime":
        localDate = `${DatesUtil.getLocalizedDateTime(
          "Date",
          date,
          locale,
          toUTC,
          hour12,
          showSeconds,
          timeZone
        )} ${DatesUtil.getLocalizedDateTime(
          "Time",
          date,
          locale,
          toUTC,
          hour12,
          showSeconds,
          timeZone
        )}`;
        break;
      case "Time":
        localDate = newDate?.toLocaleTimeString(
          locale?.startsWith("ar") ? "ar-EG" : "en-US",
          {
            hour: "numeric",
            minute: "numeric",
            second: showSeconds ? "numeric" : undefined,
            hour12,
            timeZone,
          }
        );
        break;
      default:
        localDate = newDate?.toLocaleString();
    }
    return localDate;
  };

  public static getCairoTime(
    datetime: Date,
    languageIso: string,
    cairoLabel: string,
    defaultLocalizedFormate = false,
    showSeconds = false
  ) {
    const newDate = new Date(datetime);

    if (defaultLocalizedFormate)
      return DatesUtil.getLocalizedDateTime("DateTime", newDate, languageIso);

    const lbl = cairoLabel === "" ? "" : `(${cairoLabel})`;
    return `${this.getLocalizedDateTime(
      "DateTime",
      newDate,
      languageIso,
      false,
      true,
      showSeconds,
      "Africa/Cairo"
    )} ${lbl}`;
  }
}
