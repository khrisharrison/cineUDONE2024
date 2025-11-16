import { IsNotEmpty, IsNumberString, IsString, IsUrl, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateBancoDto{

    @ApiProperty({example: '0105', description: 'Codigo de la entidad bancaria'})
    @IsNotEmpty()
    @IsNumberString()
    @Length(4, 4)
    codigo: string;

    @ApiProperty({example: 'Banco Mercantil', description: 'Nombre del Banco'})
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty({example: 'https://drive.google.com/file/d/1Uy5JbKQhLsx5lRoPy8Wmvjo_WeK5MmAf/view?usp=sharing', description: 'Url del Logo del Banco'})
    @IsNotEmpty()
    @IsUrl()
    logo: string;

}
