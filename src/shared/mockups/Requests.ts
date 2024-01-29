import { RequestStatus, RequestType } from "../constants/types";
import { RequestDTO } from "../models/RequestDTO";

export function getRequests() {
    const arr: RequestDTO[] = [{
        ID: "1",
        Code: "1",
        Date: new Date(),
        Type: RequestType.ClearanceRequest,
        Status: RequestStatus.New,
        Metadata: ""
    },{
        ID: "2",
        Code: "2",
        Date: new Date(),
        Type: RequestType.ClearanceRequest,
        Status: RequestStatus.Completed,
        Metadata: ""
    },{
        ID: "3",
        Code: "3",
        Date: new Date(),
        Type: RequestType.ClearanceRequest,
        Status: RequestStatus.InProgress,
        Metadata: ""
    },{
        ID: "4",
        Code: "4",
        Date: new Date(),
        Type: RequestType.ClearanceRequest,
        Status: RequestStatus.UnderReview,
        Metadata: ""
    },];
    return arr;
  }