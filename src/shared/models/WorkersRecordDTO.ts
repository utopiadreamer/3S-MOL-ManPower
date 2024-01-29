import { WorkerDTO } from "./WorkerDTO";

export class WorkersRecordDTO {
    RecordNo!: string;
    Workers!: WorkerDTO[];
    Notes!: string;
    ContractNo?: string;
    SettlementNo?: string;
}