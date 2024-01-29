import { Claim } from "../constants/auth";

export class UserDTO {
    ID!: string;
    Name!: string;
    Email!: string;
    Claims!: Claim[]
}