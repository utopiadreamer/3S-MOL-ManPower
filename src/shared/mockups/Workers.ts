import { WorkerDTO } from "../models/WorkerDTO";
import { WorkersRecordDTO } from "../models/WorkersRecordDTO";
import { GeneralUtil } from "../utils/generalUtil";

export function getWorkers(
  name?: string,
  nationalID?: string,
  occupation?: string
) {
  let arr: WorkersRecordDTO = {
    RecordNo: "1",
    Notes: "ملاحظات",
    Workers: [
      {
        ID: "1",
        Name: "محمد شوقي احمد",
        NationalID: "25408190101111",
        Occupation: "نجار",
        Address: "شبرا الخيمة",
        PhoneNo: "02-44624212",
      },
      {
        ID: "2",
        Name: "مصطفي سيد علي",
        NationalID: "26408190101112",
        Occupation: "حداد",
        Address: "رمسيس",
        PhoneNo: "02-46614512",
      },
      {
        ID: "3",
        Name: "طارق مصطفي سليمان",
        NationalID: "27408190101176",
        Occupation: "نجار",
        Address: "الوراق",
        PhoneNo: "02-44614712",
      },
      {
        ID: "4",
        Name: "علاء السيد محمد",
        NationalID: "28402190101431",
        Occupation: "سباك",
        Address: "امبابة",
        PhoneNo: "02-44418412",
      },
      {
        ID: "5",
        Name: "خالد محمود عبد الله",
        NationalID: "28401190101221",
        Occupation: "نقاش",
        Address: "الجمالية",
        PhoneNo: "02-44114412",
      },
      {
        ID: "6",
        Name: "منير احمد الجمال",
        NationalID: "28403190101221",
        Occupation: "بناء",
        Address: "شبرا",
        PhoneNo: "02-44314412",
      },
    ],
  };
  let search = arr;
  if (!GeneralUtil.isNothing(name))
    search.Workers = arr.Workers.filter((i) => i.Name === name?.trim());
  if (!GeneralUtil.isNothing(occupation))
    search.Workers = arr.Workers.filter((i) => i.Occupation === occupation?.trim());
  if (!GeneralUtil.isNothing(nationalID))
    search.Workers = arr.Workers.filter((i) => i.NationalID === nationalID?.trim());
  return search;
}
