import { LayoutMenuItemExtended } from "../components/layout/Layout";
import { AuthUtil } from "../utils/authUtil";
import { Claim } from "./auth";

const requestsItems = [
  {
    iconName: "Add",
    id: "newRequest",
    title: "newRequest",
    pathname: "/requests/new",
    isVisible: () => {
      return AuthUtil.hasPermission(Claim.AddContract);
    },
  },
  {
    iconName: "CustomListMirrored",
    id: "myRequests",
    title: "myRequests",
    pathname: "/requests/mine",
    isVisible: () => true,
  },
  {
    iconName: "Search",
    id: "searchRequests",
    title: "searchRequests",
    pathname: "/requests/search",
    isVisible: () => true,
  },
];

const activeMenuItems = requestsItems.filter((m) => m.isVisible());
const MenuItems: LayoutMenuItemExtended[] = [
  {
    iconName: "Home",
    title: "home",
    id: "home",
    pathname: "/home",
    isVisible: () => true,
  },
  {
    id: "processSettlement",
    iconName: "ActivateOrders",
    title: "processSettlement",
    pathname: "",
    isVisible: () => true,
    subItems: activeMenuItems,
  },
  {
    id: "contracts",
    iconName: "ActivateOrders",
    title: "contracts",
    pathname: "/contracts",
    isVisible: () => true,
  },
  {
    id: "workers",
    iconName: "FabricUserFolder",
    title: "workers",
    pathname: "/workers",
    isVisible: () => true,
  },
  {
    iconName: "Bank",
    id: "defineEstablishment",
    title: "defineEstablishment",
    pathname: "/establishments",
    isVisible: () => true,
  },
  {
    id: "codes",
    iconName: "Code",
    title: "codesManage",
    pathname: "",
    isVisible: () => true,
    subItems: [
      {
        iconName: "FileCode",
        id: "codesTypes",
        title: "codesTypes",
        pathname: "/codesTypes",
        isVisible: () => true,
      },
      {
        iconName: "Code",
        id: "codes",
        title: "codes",
        pathname: "/codes",
        isVisible: () => true,
      },
    ],
  },
  {
    id: "security",
    iconName: "SecurityGroup",
    title: "security",
    pathname: "/security",
    isVisible: () => true,
  },
  {
    id: "settings",
    iconName: "Settings",
    title: "settings",
    pathname: "/settings",
    isVisible: () => true,
  },
  {
    id: "reports",
    iconName: "MobileReport",
    title: "reports",
    pathname: "/reports",
    isVisible: () => true,
  },
  {
    id: "help",
    iconName: "Help",
    title: "help",
    pathname: "/help",
    isVisible: () => true,
  },
];
export default MenuItems;
