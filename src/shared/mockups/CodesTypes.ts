import { CodeTypeDTO } from "../models/CodeTypeDTO";

export function getCodesTypes() {
  const arr: CodeTypeDTO[] = [
    {
      ID: 1,
      Code: "1",
      Name: "محافظة",
      ReadOnly: true
    },
    {
      ID: 2,
      Code: "2",
      Name: "مدينة",
      ParentID: 1,
      ReadOnly: true
    },
    {
      ID: 3,
      Code: "3",
      Name: "منطقة",
      ParentID: 2,
      ReadOnly: true
    },
    {
      ID: 4,
      Code: "4",
      Name: "مديرية",
      ParentID: 1,
      ReadOnly: true
    },
    {
      ID: 5,
      Code: "5",
      Name: "طبيعة الأعمال",
      ReadOnly: true
    },
    {
      ID: 6,
      Code: "6",
      Name: "العمل الرئيسي",
      ParentID: 5,
      ReadOnly: true,
    },
    {
      ID: 7,
      Code: "7",
      Name: "العمل الفرعي",
      ParentID: 6,
      Metadata: [{
        ID: 1,
        Name: "rate",
        Label: "نسبة الخصم",
        Type: "number",
        MaxLength: 2,
        MinValue: 0,
        MaxValue: 100,
        ReadOnly: true
      },{
        ID: 2,
        Name: "notes",
        Label: "ملاحظات",
        Type: "text",
        MaxLength: 100
      }]
    },
    {
      ID: 8,
      Code: "8",
      Name: "نوع كود"
    },
  ];
  return arr;
}
