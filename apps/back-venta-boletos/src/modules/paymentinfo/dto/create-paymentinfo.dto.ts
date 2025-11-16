import { IsAlpha, IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString, Length } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePaymentinfoDto{
    @ApiProperty({example: '1234567890', description: 'Referencia de la transaccion bancaria'})
    @IsNotEmpty()
    @IsNumberString()
    @Length(4, 20)
    referencia: string;

    @ApiProperty({example: '0105', description: 'Codigo de la entidad bancaria'})
    @IsNotEmpty()
    @IsNumberString()
    @Length(4, 4)
    codigoBanco: string;

    @ApiProperty({example: 'Pago Movil', description: 'Tipo de Método de Pago'})
    @IsNotEmpty()
    @IsString()
    @IsEnum(['Pago Movil', 'Transferencia'])
    metodo: string;

    @ApiProperty({example: '2024-11-07', description: 'Fecha de la realización del Pago'})
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    fecha: Date;

    @ApiProperty({example: '3.99', description: 'Monto pagado'})
    @IsNotEmpty()
    @IsNumber()
    monto: number;

    @ApiProperty({example: 'pendiente', description: 'Estado del pago (pendiente, confirmado, rechazado'})
    @IsNotEmpty()
    @IsAlpha()
    @IsEnum(['pendiente', 'confirmado', 'rechazado'])
    estado: string = 'pendiente';

    @ApiProperty({example: '4', description: 'Cantidad de Boletos Comprados'})
    @IsNotEmpty()
    @IsInt()
    cantBoletos: number;

    @ApiProperty({example: '06 Mar', description: 'Fecha de la función'})
    @IsNotEmpty()
    @IsString()
    fechaFuncion: string;

    @ApiProperty({example: '16:00', description: 'Hora de la función'})
    @IsNotEmpty()
    @IsString()
    horaFuncion: string;

    @ApiProperty({example: 'khristianhfs06@gmail.com', description: 'Email del usuario para enviar el correo una vez confirmado o rechazado el pago'})
    @IsNotEmpty()
    @IsEmail()
    correo: string;
}
