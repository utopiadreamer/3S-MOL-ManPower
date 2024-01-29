import { Claim } from "../constants/auth";


export class RoleDTO {
    ID!: string;
    Name!: string;
    Claims!: Claim[]
}