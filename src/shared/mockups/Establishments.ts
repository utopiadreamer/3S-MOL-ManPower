import { EstablishmentType } from "../constants/constants";
import { EstablishmentDTO } from "../models/EstablishmentDTO";

export function getEstablishments(field?: string, value?: string) {
  let arr: EstablishmentDTO[] = [
    {
      ID: "1",
      Type: EstablishmentType.Person,
      Name: "محمد احمد السيد",
      NationalID: "28406120105656",
      InsuranceNumber: "343634634",
      Address: "شبرا",
      PhoneNo: "02-46133012",
      AgentName: "علي سيد مصطفي",
    },
    {
      ID: "2",
      Type: EstablishmentType.Company,
      Name: "الأنظمة الذكية المؤمنة",
      CommRegistrationNo: "123123",
      TaxNumber: "67867433",
      Address: "8 شارع احمد فخري",
      PhoneNo: "02-34431244",
      AgentName: "احمد محمد عبد العزيز",
    },
    {
      ID: "3",
      Type: EstablishmentType.Government,
      Name: "وزارة القوي العاملة",
      InstitutionalCode: "35235232",
      Address: "القاهرة",
      PhoneNo: "02-12342333",
      AgentName: "منير ابراهيم كمال",
    },
    {
      ID: "4",
      Type: EstablishmentType.Person,
      Name: "علاء مصطفي اسماعيل",
      InsuranceNumber: "236767",
      NationalID: "28511220104444",
      Address: "مدينة نصر",
      PhoneNo: "01144562341",
      AgentName: "محمد سلام السيد",
    },
    {
      ID: "5",
      Type: EstablishmentType.Government,
      Name: "هيئة المجتمعات العمرانية",
      InstitutionalCode: "34634633",
      Address: "القاهرة",
      PhoneNo: "02-21312222",
      AgentName: "طارق السيد علي",
    },
    {
      ID: "6",
      Type: EstablishmentType.Company,
      Name: "المقاولون العرب",
      CommRegistrationNo: "43464444",
      TaxNumber: "234565",
      Address: "مصر الجديدة",
      PhoneNo: "02-21312552",
      AgentName: "عثمان احمد عثمان",
    },
    {
      ID: "7",
      Type: EstablishmentType.Government,
      Name: "وزارة الزراعة",
      InstitutionalCode: "6867856",
      Address: "القاهرة",
      PhoneNo: "02-21312111",
      AgentName: "ابراهيم صلاح مصطفي",
    },
    {
      ID: "8",
      Type: EstablishmentType.Person,
      Name: "محمد صلاح السيد",
      InsuranceNumber: "8978978",
      NationalID: "28511220111144",
      Address: "شيراتون",
      PhoneNo: "01144562366",
      AgentName: "محمد صلاح السيد",
    },
  ];
  if(field === "name"){
    return arr.filter(i => i.Name === value);
  }
  if(field === "id"){
    return arr.filter(i => i.ID === value);
  }
  return arr;
}
