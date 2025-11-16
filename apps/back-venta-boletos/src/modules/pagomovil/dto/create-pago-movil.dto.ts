import { IsNotEmpty, IsNumberString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PagoMovilDto{

  @ApiProperty({example: '0102', description: 'Codigo de Banco'})
  @IsNotEmpty()
  @IsNumberString()
  @Length(4, 4)
  codigoBanco: string;

  @ApiProperty({example: '28567843', description: 'Identificacion Personal (ID)'})
  @IsNotEmpty()
  @IsNumberString()
  @Length(1, 8)
  cedula: string;

  @ApiProperty({example: '04123528885', description: 'Numero de telefono'})
  @IsNotEmpty()
  @IsNumberString()
  @Length(11, 11)
  nroTelefono: string;
}
