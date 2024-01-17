import { EstablishmentDTO } from "./EstablishmentDTO";

export class ContractDTO {
    ID!: string;
    Name!: string;
    RequestNo!: string;
    RequestDate!: Date;
    AssignEstablishment!: EstablishmentDTO;
    ExecEstablishment!: EstablishmentDTO;
    ContractType!: string;
    ContractNo!: string;
    ReferenceContrctNo?: string;
    ScopeOfWork!: string;
    ContractStartDate!: Date;
    ContractEndDate!: Date;
    TotalAmount!: number;
    RealAmount!: number;
    TaxRate!: number;
    Description!: string;
    Notes!: string;
}