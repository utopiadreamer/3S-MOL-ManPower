import { MetadataDTO } from "./MetadataDTO";

export class CodeTypeDTO {
    ID!: number;
    Code!: string;
    Name!: string;
    ParentID?: number;
    Metadata?: MetadataDTO[];
}