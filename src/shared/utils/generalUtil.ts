import { Bounce, ToastPosition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class GeneralUtil {

  public static setSearchCriteriaField = (
    searchCriteria: any,
    name: string,
    value?: string | Date | null,
    type?: "Date"
  ) => {
    let val = value;
    if (type === "Date") val = new Date(val ?? "");
    const criteria = searchCriteria;
    criteria[name] = val;
    return criteria;
  };

  public static isUndefined = (obj: any) => {
    return obj === null || obj === undefined;
  };

  public static isEmpty = (obj?: string) => {
    if (typeof obj === "string") {
      return obj.trim() === "";
    }
    return obj === "";
  };

  public static isNothing = (obj: any) => {
    return this.isEmpty(obj?.toString() ?? "") || this.isUndefined(obj);
  };
  public static normalizeString(value: string | undefined): string {
    return value?.trim() || "";
  }
  public static normalizeMobileString(
    value: string | undefined
  ): string | undefined {
    const text = value?.trim();
    return text ? (text[0] === "0" ? text : `0${text}`) : undefined;
  }

  public static mapJsonDataToObj<T>(
    arrayOfJson: any[],
    mapping: { [key: string]: string }
  ): T[] {
    return arrayOfJson.map((item) => {
      let result: any = {};
      for (let key in mapping) {
        result[key] = item[mapping[key]];
      }
      return result as T;
    });
  }

  public static notify = (text?: string, autoClose?: number, position?: ToastPosition) =>
    toast.error("المستخدم غير موجود", {
      position: "top-center",
      autoClose: 5000,
      rtl: true,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
}
