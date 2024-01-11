/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PageInfo {
  paginationSetting: PaginationSetting;
  currentPage: number;
  totalPage: number;
}
export interface PaginationSetting {
  nbItemPerPage: number;
  nbPageShown: number;
  initialPage?: number;
  // if specified pagination is managed externally
  currentPage?: number;
  // if specified pagination is managed externally
  totalPage?: number;
}
export type FilterFunction<T> = (v: T, index: number, array: T[]) => boolean;

export function BuildPagination<T>(
  currentPage: number,
  items?: T[],
  paginationSetting?: PaginationSetting
): PageInfo | undefined {
  if (paginationSetting?.nbItemPerPage) {
    if (
      paginationSetting?.currentPage != null &&
      paginationSetting?.totalPage != null
    ) {
      return undefined;
    }
    const totalPage = items
      ? Math.ceil(items.length / paginationSetting?.nbItemPerPage)
      : 0;
    return {
      totalPage,
      currentPage: currentPage < totalPage ? currentPage : 0,
      paginationSetting,
    };
  }
}
export function pagination<T>(
  items?: T[],
  pageInfo?: PageInfo
): T[] | undefined {
  if (items && pageInfo) {
    const startIndex =
      pageInfo.paginationSetting.nbItemPerPage * pageInfo.currentPage;
    const endIndex = startIndex + pageInfo.paginationSetting.nbItemPerPage;
    const view = items.slice(
      startIndex,
      endIndex < items.length ? endIndex : items.length
    );
    return view;
  }

  return items;
}
export function copyAndSortItems<T>(
  items: T[],
  filter: FilterFunction<T> | null,
  objAccessor: (root: T) => any,
  columnKey?: string,
  isSortedDescending?: boolean
): T[] {
  const key = columnKey as keyof T;

  let arrayObject = items.slice(0);
  if (filter) {
    arrayObject = arrayObject.filter(filter);
  }
  if (columnKey) {
    return arrayObject.sort((a: T, b: T) => {
      const mul = isSortedDescending ? -1 : 1;
      const objA = objAccessor(a);
      const objB = objAccessor(b);
      if (objA[key] !== null && (objB[key] === null || objB[key] === undefined)) {
        return -1 * mul;
      }
      if ((objA[key] === null || objA[key] === undefined) && objB[key] !== null) {
        return 1 * mul;
      }
      if (objA[key] !== null && objB[key] !== null) {
        if (objA[key] === objB[key]) {
          return 0;
        }
        if (objA[key] < objB[key]) {
          return -1 * mul;
        } 

        return 1 * mul;
      }
     
      return 0;
    });
  }
  return arrayObject;
}
