export enum Claim {
  //Contract
  AddRequest = 'AddRequest',
  EditContract = 'EditContract',
  DeleteContract = 'DeleteContract',

  //Workers
  EditWorker = 'EditWorker',
  DeleteWorker = 'DeleteWorker',

  //Clearances
  ApproveClearance = 'ApproveClearance',
  PrintClearance = 'PrintClearance',

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