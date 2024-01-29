import { RequestStatus, RequestType } from "../constants/types";

export class RequestDTO {
    ID!: string;
    Code!: string;
    Type!: RequestType;
    Date!: Date;
    Status!: RequestStatus;
    Metadata!: string;
}