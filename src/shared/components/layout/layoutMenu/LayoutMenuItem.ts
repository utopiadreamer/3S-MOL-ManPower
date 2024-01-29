import { LayoutMenuItemExtended } from "../Layout";

export interface LayoutMenuItem {
  id: string;
  title: string;
  iconName: string;
  pathname: string;
  queryString?: string;
  roles?: number[] | string[];
  showBadge?: boolean;
  subItems?: LayoutMenuItemExtended[];
}
