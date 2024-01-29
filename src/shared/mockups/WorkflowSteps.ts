import { WorkflowStepDTO } from "../models/WorkflowStepDTO";

export function getWorkflowSteps() {
  const arr: WorkflowStepDTO[] = [
    {
      ID: "1",
      Name: "AddContract",
    },
    {
      ID: "2",
      Name: "AddSettlement",
    },
    {
      ID: "3",
      Name: "AddWorkersRecord",
    },
    {
      ID: "4",
      Name: "AddClearance",
    },
    {
      ID: "5",
      Name: "Review",
    },
    {
      ID: "6",
      Name: "AddDiscount",
    },
    {
      ID: "7",
      Name: "ApproveRequest",
    },
    {
      ID: "8",
      Name: "PrintClearance",
    },
  ];
  return arr;
}
