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
                iconName: 'CityNext2',
                id: 'companies',
                title: 'companies',
                pathname: '/establishments/companies',
            },
            {
                iconName: 'CityNext',
                id: 'governments',
                title: 'governments',
                pathname: '/establishments/governments',
            },
        ]
        
    },
    {
        id: 'contracts',
        iconName: 'ActivateOrders',
        title: 'contracts',
        pathname: '/contracts',
    },
    {
        id: 'processSettlement',
        iconName: 'ActivateOrders',
        title: 'processSettlement',
        pathname: '',
        subItems: [{
            iconName: 'Add',
            id: 'newSettle',
            title: 'newSettlement',
            pathname: '/settlements/new',
        },
        {
            iconName: 'Search',
            id: 'searchSettlements',
            title: 'searchSettlements',
            pathname: '/settlements/search',
        },]
    },
    {
        id: 'workers',
        iconName: 'FabricUserFolder',
        title: 'workers',
        pathname: '/workers',
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
