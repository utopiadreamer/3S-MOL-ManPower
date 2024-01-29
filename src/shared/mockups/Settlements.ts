import { SettlementDocumentType } from "../constants/constants";
import { SettlementDTO } from "../models/SettlementDTO";

export function getSettlements() {
  const arr: SettlementDTO[] = [
    {
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
      AssignEstablishment: "الأنظمة الذكية المؤمنة",
      ExecEstablishment: "وزارة القوي العاملة"
    },
    {
      ID: "2",
      DocumentNumber: "2",
      DocumentType: SettlementDocumentType.Clearance,
      OperationStartDate: new Date(),
      OperationEndDate: new Date(),
      SettlementNo: "2",
      ContractNo: "1",
      Description: "الوصف",
      DocumentDate: new Date(),
      WorkItems: [],
      OperationType: "",
      Notes: "ملاحظات",
      AssignEstablishment: "هيئة المجتمعات العمرانية",
      ExecEstablishment: "الأنظمة الذكية المؤمنة"
    },
    {
      ID: "3",
      DocumentNumber: "3",
      DocumentType: SettlementDocumentType.Invoice,
      OperationStartDate: new Date(),
      OperationEndDate: new Date(),
      SettlementNo: "3",
      ContractNo: "2",
      Description: "الوصف",
      DocumentDate: new Date(),
      WorkItems: [],
      OperationType: "",
      Notes: "ملاحظات",
      AssignEstablishment: "المقاولون العرب",
      ExecEstablishment: "وزارة القوي العاملة"
    },
    {
      ID: "4",
      DocumentNumber: "4",
      DocumentType: SettlementDocumentType.Invoice,
      OperationStartDate: new Date(),
      OperationEndDate: new Date(),
      SettlementNo: "4",
      ContractNo: "3",
      Description: "الوصف",
      DocumentDate: new Date(),
      WorkItems: [],
      OperationType: "",
      Notes: "ملاحظات",
      AssignEstablishment: "وزارة القوي العاملة",
      ExecEstablishment: "الأنظمة الذكية المؤمنة"
    },
  ];
  return arr;
}
