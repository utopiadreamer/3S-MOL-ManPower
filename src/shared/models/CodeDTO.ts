
export class CodeDTO {
    ID!: number;
    Code!: string;
    Name!: string;
    CodeTypeID!: number;
    ParentID?: number;
    Metadata?: string;
}