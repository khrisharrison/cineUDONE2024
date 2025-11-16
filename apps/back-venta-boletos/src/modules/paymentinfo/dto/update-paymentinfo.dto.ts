import { IsAlpha, IsEnum, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePaymentinfoDto{
    
    @ApiProperty({example: 'confirmado', description: 'Estado del pago (pendiente, confirmado, rechazado'})
    @IsNotEmpty()
    @IsAlpha()
    @IsEnum(['confirmado', 'rechazado'])
    estado: string;
}