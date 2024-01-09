export class GeneralUtil {
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
}
