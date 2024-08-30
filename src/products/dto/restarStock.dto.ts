import { IsNumber, IsPort, IsPositive } from "class-validator";


export class RestarStockDto {
    @IsNumber()
    @IsPositive()
    cantidad: number;
}