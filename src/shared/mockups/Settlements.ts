import { SettlementDocumentType } from "../constants/constants";
import { SettlementDTO } from "../models/SettlementDTO";

export function getSettlements() {
  const arr: SettlementDTO[] = [{
    ID: "1",
    DocumentNumber: "1",
    DocumentType: SettlementDocumentType.Invoice,
    OperationStartDate: new Date(),
    OperationEndDate: new Date(),
    SettlementNo: "1",
    ContractNo: "1",
    Description: "الوصف",
    DocumentDate: new Date(),
    WorkItems: [],
    OperationType: "",
    Notes: "ملاحظات",
  }];
  return arr;
}