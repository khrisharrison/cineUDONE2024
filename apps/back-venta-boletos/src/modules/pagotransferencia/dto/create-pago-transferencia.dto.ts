import { IsNotEmpty, IsNumberString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PagoTransferenciaDto {

  @ApiProperty({example: '0105', description: 'Nombre de la entidad bancaria'})
  @IsNotEmpty()
  @IsNumberString()
  @Length(4, 4)
  codigoBanco: string;

  @ApiProperty({example: '28567843', description: 'Identificacion Personal (ID)'})
  @IsNotEmpty()
  @IsNumberString()
  @Length(1, 8)
  cedula: string;

  @ApiProperty({example: '01023473290654400007', description: 'Numero de cuenta del Banco'})
  @IsNotEmpty()
  @IsNumberString()
  @Length(20,20)
  nroCuenta: string;
}
