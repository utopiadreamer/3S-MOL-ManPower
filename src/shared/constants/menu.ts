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
        pathname: '',
        subItems: [
            {
                iconName: 'ReminderPerson',
                id: 'persons',
                title: 'persons',
                pathname: '/establishments/persons',
            },
            {
                iconName: 'Bank',
                id: 'companies',
                title: 'companies',
                pathname: '/establishments/companies',
            },
            {
                iconName: 'Bank',
                id: 'governments',
                title: 'governments',
                pathname: '/establishments/governments',
            },
        ]
        
    },
    {
        id: 'processSettlement',
        iconName: 'ActivateOrders',
        title: 'processSettlement',
        pathname: '/settlements',
    },
    {
        id: 'employment',
        iconName: 'FabricUserFolder',
        title: 'employment',
        pathname: '/employment',
    },
    {
        id: 'codes',
        iconName: 'Code',
        title: 'codes',
        pathname: '/codes',
    },
    {
        id: 'security',
        iconName: 'SecurityGroup',
        title: 'security',
        pathname: '/security',
    },
    {
        id: 'audit',
        iconName: 'ComplianceAudit',
        title: 'audit',
        pathname: '/audit',
    },
    {
        id: 'reports',
        iconName: 'MobileReport',
        title: 'reports',
        pathname: '/reports',
    },
    {
        id: 'regulations',
        iconName: 'DietPlanNotebook',
        title: 'regulations',
        pathname: '/regulations',
    },
    {
        id: 'help',
        iconName: 'Help',
        title: 'help',
        pathname: '/help',
    }
];
export default MenuItems;
