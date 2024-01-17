import { ContractType } from "../constants/constants";
import { ContractDTO } from "../models/ContractDTO";
import { getEstablishments } from "./Establishments";

export function getContracts() {
  const establishments = getEstablishments();
  const arr: ContractDTO[] = [
    {
      ID: "1",
      ContractNo: "1",
      Name: "بناء مصنع للاسمنت",
      AssignEstablishment: establishments[0],
      ExecEstablishment: establishments[1],
      ContractEndDate: new Date(),
      ContractStartDate: new Date(),
      RequestNo: "1",
      ContractType: ContractType.Contract,
      TotalAmount: 1000,
      RealAmount: 900,
      TaxRate: 10,
      RequestDate: new Date(),
      ScopeOfWork: "طبيعة الاعمال",
      Description: "الوصف",
      Notes: "ملاحظات",
    },
    {
      ID: "2",
      ContractNo: "2",
      Name: "ترميم مسجد السلطان حسن",
      ReferenceContrctNo: "222",
      AssignEstablishment: establishments[2],
      ExecEstablishment: establishments[3],
      ContractEndDate: new Date(),
      ContractStartDate: new Date(),
      RequestNo: "2",
      ContractType: ContractType.AssignmentOrder,
      TotalAmount: 1000,
      RealAmount: 900,
      TaxRate: 10,
      RequestDate: new Date(),
      ScopeOfWork: "طبيعة الاعمال",
      Description: "الوصف",
      Notes: "ملاحظات",
    },
    {
      ID: "3",
      ContractNo: "3",
      Name: "بناء كوبري علوي",
      ReferenceContrctNo: "333",
      AssignEstablishment: establishments[1],
      ExecEstablishment: establishments[2],
      ContractEndDate: new Date(),
      ContractStartDate: new Date(),
      RequestNo: "3",
      ContractType: ContractType.PurchaseOrder,
      TotalAmount: 2000,
      RealAmount: 1500,
      TaxRate: 25,
      RequestDate: new Date(),
      ScopeOfWork: "طبيعة الاعمال",
      Description: "الوصف",
      Notes: "ملاحظات",
    },
  ];
  return arr;
}
