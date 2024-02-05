import { CodeDTO } from "../models/CodeDTO";

export function getCodes() {
  const arr: CodeDTO[] = [
    {
      ID: 1,
      Code: "1",
      Name: "القاهرة",
      CodeTypeID: 1
    },
    {
      ID: 2,
      Code: "2",
      Name: "مدينة نصر",
      CodeTypeID: 2,
      ParentID: 1
    },
    {
      ID: 3,
      Code: "3",
      Name: "الحي السادس",
      CodeTypeID: 3,
      ParentID: 2
    },
    {
      ID: 4,
      Code: "4",
      Name: "المقاولات",
      CodeTypeID: 5
    },
    {
      ID: 5,
      Code: "5",
      Name: "إنشاء مبانى خفيفة",
      CodeTypeID: 6,
      ParentID: 4
    },
    {
      ID: 6,
      Code: "6",
      Name: "أعمال الحفر",
      CodeTypeID: 7,
      ParentID: 5,
      Metadata: '[{"name": "rate", "value": "11"}, {"name": "notes", "value": "notes"}]'
    },
    {
      ID: 7,
      Code: "7",
      Name: "أعمال التشطيب",
      CodeTypeID: 7,
      ParentID: 5
    },
    {
      ID: 8,
      Code: "8",
      Name: "أعمال الخرسانة الجاهزة",
      CodeTypeID: 7,
      ParentID: 5
    },
    {
      ID: 9,
      Code: "9",
      Name: "لاندسكيب",
      CodeTypeID: 6,
      ParentID: 4
    },
    {
      ID: 10,
      Code: "10",
      Name: "نجيلة",
      CodeTypeID: 7,
      ParentID: 9
    },
    {
      ID: 11,
      Code: "12",
      Name: "ممرات",
      CodeTypeID: 7,
      ParentID: 9
    },
    {
      ID: 14,
      Code: "14",
      Name: "حمامات سباحة",
      CodeTypeID: 7,
      ParentID: 9
    },
    {
      ID: 15,
      Code: "15",
      Name: "الاسكندرية",
      CodeTypeID: 1
    },
  ];
  return arr;
}
