import { IsString } from "class-validator";

export class CreateClientDto {
    @IsString()
    name: string;

    @IsString()
    ci: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;
}
