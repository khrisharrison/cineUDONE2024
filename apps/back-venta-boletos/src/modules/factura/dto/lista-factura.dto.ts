import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class FacturaDto {

  @ApiProperty({example: 'Pago Movil', description: 'Tipo de Método de Pago'})
  @IsNotEmpty()
  @IsString()
  @IsEnum(['Pago Movil', 'Transferencia'])
  metodoPago: string;

  @ApiProperty({example:'3.99', description: 'monto total'})
  @IsNotEmpty()
  @IsNumber()
  totalMonto: number;

  @ApiProperty({example:'1', description: 'ID de Paymentinfo'})
  @IsNotEmpty()
  @IsNumber()
  paymentinfoId: number;
}
