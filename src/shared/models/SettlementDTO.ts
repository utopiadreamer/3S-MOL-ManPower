import { WorkItemDTO } from "./WorkItemDTO";

export class SettlementDTO {
    ID!: string;
    ContractNo?: string;
    DocumentType!: string;
    SettlementNo!: string;
    OperationType!: string;
    OperationStartDate!: Date;
    OperationEndDate!: Date;
    Notes!: string;
    DocumentNumber!: string;
    DocumentDate!: Date;    
    WorkItems!: WorkItemDTO[];
    Description?: string;
}