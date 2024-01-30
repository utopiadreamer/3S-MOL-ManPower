export enum Claim {
  //Contract
  AddContract = 'AddContract',
  EditContract = 'EditContract',
  DeleteContract = 'DeleteContract',

  //Settlement
  AddSettlement = 'AddSettlement',
  EditSettlement = 'EditSettlement',
  DeleteSettlement = 'DeleteSettlement',

  //Workers
  AddWorkersRecord = 'AddWorkersRecord',
  EditWorkersRecord = 'EditWorkersRecord',
  DeleteWorkersRecord = 'DeleteWorkersRecord',
  EditWorker = 'EditWorker',
  DeleteWorker = 'DeleteWorker',

  //Clearances
  AddClearance = 'AddClearance',
  EditClearance = 'EditClearance',
  DeleteClearance = 'DeleteClearance',
  ApproveDiscount = 'ApproveDiscount',
  PrintClearance = 'PrintClearance',
  ReprintClearance = 'ReprintClearance',
  PrintPayment = 'PrintPayment',
  ApproveClearance = 'ApproveClearance',

  //FinancialData
  AddFinancialData = 'AddFinancialData',
  EditFinancialData = 'EditFinancialData',

  //Establishments
  EditEstablishment = 'EditEstablishment',

  //Codes
  AddCode = 'AddCode',
  EditCode = 'EditCode',
  DeleteCode = 'DeleteCode',
}

export enum Role {
  Admin= 'Admin',
  CommitteeMember= 'CommitteeMember',
  DirectorateManager= 'DirectorateManager',
  ReportViewer= 'ReportViewer',
  Reviewer= 'Reviewer',
  Researcher= 'Researcher'
};