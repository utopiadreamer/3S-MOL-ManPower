
export const Languages = {
    En: 'En',
    Ar: 'Ar',
    en: 'en',
    ar: 'ar',
};

export const Directions = {
    RTL: 'rtl',
    LTR: 'ltr',
};

export enum ValidationType {
    Email = 'Email',
    Required = 'Required',
    NationalID = 'NationalID',
    CommercialRegistrationNo = 'CommercialRegistrationNo',
    MobileNo = 'MobileNo'
  }

export const Roles = {
    Reviewer: 'Reviewer',
    Researcher: 'Researcher'
};

export const EstablishmentType = {
    Person: 'Person',
    Company: 'Company',
    Government: 'Government'
}

export const RequestType = {
    Create: 'Create',
    Edit: 'Edit',
    Delete: 'Delete'
}

export const RecordType = {
    Current: 'Current',
    Final: 'Final'
} 

export const ContractType = {
    Contract: 'Contract',
    Tender: 'Tender',
    AssignmentOrder: 'AssignmentOrder',
    AttributionOrder: 'AttributionOrder',
    SupplyOrder: 'SupplyOrder',
    RepairOrder: 'RepairOrder',
    PurchaseOrder: 'PurchaseOrder',
    License: 'License',
    Other: 'Other'

} 

export const SettlementDocumentType = {
    Invoice: 'Invoice',
    Extract: 'Extract'
}

export const SettlementWizardKey = {
    Contract: 'contract',
    AssignEstablishment: 'assignEstablishment',
    ExecEstablishment: 'execEstablishment',
    WorkItems: 'workItems',
    Employment: 'employment',
    Extract: 'extract'
}