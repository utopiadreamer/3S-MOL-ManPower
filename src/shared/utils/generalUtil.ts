export class GeneralUtil {
  public static isUndefined = (obj: any) => {
    return obj === null || obj === undefined;
  };

  public static isEmpty = (obj?: string) => {
    if (typeof obj === 'string') {
      return obj.trim() === '';
    }
    return obj === '';
  };

  public static isNothing = (obj: any) => {
    return this.isEmpty(obj?.toString() ?? '') || this.isUndefined(obj);
  };
  public static normalizeString(value: string | undefined): string {
    return value?.trim() || '';
  }
  public static normalizeMobileString(
    value: string | undefined,
  ): string | undefined {
    const text = value?.trim();
    return text ? (text[0] === '0' ? text : `0${text}`) : undefined;
  }

  public static mapJsonDataToObj<T>(
    arrayOfJson: any[],
    mapping: { [key: string]: string },
  ): T[] {
    return arrayOfJson.map((item) => {
      let result: any = {};
      for (let key in mapping) {
        result[key] = item[mapping[key]];
      }
      return result as T;
    });
  }
}
