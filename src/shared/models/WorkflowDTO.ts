import { WorkflowStepDTO } from "./WorkflowStepDTO";

export class WorkflowDTO {
    ID!: string;
    Name!: string;
    Steps!: WorkflowStepDTO[];
}