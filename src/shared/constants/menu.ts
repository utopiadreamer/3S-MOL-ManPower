import { LayoutMenuItem } from "../components/layout/layoutMenu/LayoutMenuItem";


const MenuItems: LayoutMenuItem[] = [
    {
        iconName: 'Home',
        title: 'home',
        id: 'home',
        pathname: '/home',
    },
    {
        iconName: 'Bank',
        id: 'defineEstablishment',
        title: 'defineEstablishment',
        pathname: '/establishments'
    },
    {
        id: 'requestContract',
        iconName: 'EntitlementRedemption',
        title: 'requestContract',
        pathname: '/requestContract',
    },
    {
        id: 'processSettlement',
        iconName: 'ProcessMetaTask',
        title: 'processSettlement',
        pathname: '/processSettlement',
    },
    {
        id: 'registeringEmploymentData',
        title: 'registeringEmploymentData',
        iconName: 'UserSync',
        pathname: '/registeringEmploymentData'
    },
    {
        id: 'extractingSecuredExtracts',
        iconName: 'LaptopSecure',
        title: 'extractingSecuredExtracts',
        pathname: '/extractingSecuredExtracts'
    },
    {
        id: 'discountRequest',
        iconName: 'Money',
        title: 'discountRequest',
        pathname: '/discountRequest'
    },
    {
        id: 'exemptionRequest',
        iconName: 'RemoveFromShoppingList',
        title: 'exemptionRequest',
        pathname: '/exemptionRequest',
    }
];
export default MenuItems;
