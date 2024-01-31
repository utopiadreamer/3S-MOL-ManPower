import { Claim, Role } from "../constants/auth";

export class UserDTO {
    ID!: string;
    Name!: string;
    UserName!: string;
    Email!: string;
    Claims?: Claim[];
    Role!: Role;
}