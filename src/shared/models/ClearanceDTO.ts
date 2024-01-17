import { RequestStatus } from "../constants/types";

export class ClearanceDTO {
    ID!: string;
    RequestNo!: string;
    RequestDate!: Date;
    RecordNo!: string;
    RecordType!: string;
    ContractNo!: string;
    ContractOperationType!: string;
    OperationStartDate!: Date;
    OperationEndDate!: Date;
    TotalAmount!: number;
    RealAmount!: number;
    TaxRate!: number;
    SettelmentNo!: string;
    SettelmentTotalAmount!: number;
    ContractDescription!: string;
    DocumentStartDate!: Date;
    DocumentEndDate!: Date;
    ExtractionDate!: Date;
    WorkersRecordNo!: string;
    Description!: string;
    Notes!: string;
    Status!: RequestStatus;
}