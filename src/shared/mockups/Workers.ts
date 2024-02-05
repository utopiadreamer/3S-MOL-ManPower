import { WorkerDTO } from "../models/WorkerDTO";
import { GeneralUtil } from "../utils/generalUtil";

export function getWorkers(
  searchCriteria?: WorkerDTO,
  recordNo?: string
) {
  let arr: WorkerDTO[] = [
    {
      ID: "1",
      Name: "محمد شوقي احمد",
      NationalID: "25408190101111",
      Occupation: "نجار",
      Address: "شبرا الخيمة",
      PhoneNo: "02-44624212",
      WorkersRecordNo: "1",
    },
    {
      ID: "2",
      Name: "مصطفي سيد علي",
      NationalID: "26408190101112",
      Occupation: "حداد",
      Address: "رمسيس",
      PhoneNo: "02-46614512",
      WorkersRecordNo: "1",
    },
    {
      ID: "3",
      Name: "طارق مصطفي سليمان",
      NationalID: "27408190101176",
      Occupation: "نجار",
      Address: "الوراق",
      PhoneNo: "02-44614712",
      WorkersRecordNo: "1",
    },
    {
      ID: "4",
      Name: "علاء السيد محمد",
      NationalID: "28402190101431",
      Occupation: "سباك",
      Address: "امبابة",
      PhoneNo: "02-44418412",
      WorkersRecordNo: "1",
    },
    {
      ID: "5",
      Name: "خالد محمود عبد الله",
      NationalID: "28401190101221",
      Occupation: "نقاش",
      Address: "الجمالية",
      PhoneNo: "02-44114412",
      WorkersRecordNo: "1",
    },
    {
      ID: "6",
      Name: "منير احمد الجمال",
      NationalID: "28403190101221",
      Occupation: "بناء",
      Address: "شبرا",
      PhoneNo: "02-44314412",
      WorkersRecordNo: "1",
    },
    {
      ID: "7",
      Name: "محمد جمال احمد",
      NationalID: "25408190101111",
      Occupation: "نجار",
      Address: "شبرا الخيمة",
      PhoneNo: "02-44624212",
      WorkersRecordNo: "2",
    },
    {
      ID: "8",
      Name: "طارق سيد علي",
      NationalID: "26408190101112",
      Occupation: "حداد",
      Address: "رمسيس",
      PhoneNo: "02-46614512",
      WorkersRecordNo: "2",
    },
    {
      ID: "9",
      Name: "منير مصطفي السيد",
      NationalID: "27408190101176",
      Occupation: "نجار",
      Address: "الوراق",
      PhoneNo: "02-44614712",
      WorkersRecordNo: "2",
    },
    {
      ID: "10",
      Name: "صلاح السيد عارف",
      NationalID: "28402190101431",
      Occupation: "سباك",
      Address: "امبابة",
      PhoneNo: "02-44418412",
      WorkersRecordNo: "2",
    },
    {
      ID: "11",
      Name: "مصطفي جمال عبد الله",
      NationalID: "28401190101221",
      Occupation: "نقاش",
      Address: "الجمالية",
      PhoneNo: "02-44114412",
      WorkersRecordNo: "2",
    },
  ];

  let search = arr;
  const name = searchCriteria?.Name;
  const occupation = searchCriteria?.Occupation;
  const nationalID = searchCriteria?.NationalID;
  if (!GeneralUtil.isNothing(name))
    search = arr.filter((i) => i.Name === name?.trim());
  if (!GeneralUtil.isNothing(occupation))
    search = arr.filter((i) => i.Occupation === occupation?.trim());
  if (!GeneralUtil.isNothing(nationalID))
    search = arr.filter((i) => i.NationalID === nationalID?.trim());
  if (!GeneralUtil.isNothing(recordNo))
    search = arr.filter((i) => i.WorkersRecordNo === recordNo?.trim());
  return search;
}
