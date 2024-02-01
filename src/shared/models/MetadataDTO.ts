
export class MetadataDTO {
    ID!: number;
    Name!: string;
    Label!: string;
    Type!: string;
    MaxLength?: number;
    MinValue?: number;
    MaxValue?: number;
    Value?: string;
    ReadOnly?: boolean;
    Required?: boolean;
}