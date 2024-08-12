export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    type: string;
    companyName?: string;
    companyDocument?: string;
    cep?: string;
    state?: string;
    city?: string;
    address?: string;
    active: boolean;
}