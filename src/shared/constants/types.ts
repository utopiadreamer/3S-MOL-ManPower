export enum Mode {
  New = "new",
  Edit = "edit",
  View = "view",
}

export enum Action {
  Add = "Add",
  Edit = "Edit",
  Update = "Update",
  Cancel = "Cancel",
  Delete = "Delete",
  Return = "Return",
  Reject = "Reject"
}

export enum RequestType {
  ClearanceRequest = "ClearanceRequest",
}

export enum RequestStatus {
  New = "New",
  UnderReview = "UnderReview",
  InProgress = "InProgress",
  Completed = "Completed",
}

export enum ValidationType {
  Email = 'Email',
  Required = 'Required',
  NationalID = 'NationalID',
  CommercialRegistrationNo = 'CommercialRegistrationNo',
  MobileNo = 'MobileNo'
}