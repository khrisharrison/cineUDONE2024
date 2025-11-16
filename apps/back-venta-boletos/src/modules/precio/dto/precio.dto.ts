import { IsDecimal, IsNumber, IsPositive } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PrecioDto{
    
    @ApiProperty({example: 3.99, description: "Nuevo Precio Entrada General"})
    @IsNumber({maxDecimalPlaces: 2})
    @IsPositive()
    precio: number;
    
}