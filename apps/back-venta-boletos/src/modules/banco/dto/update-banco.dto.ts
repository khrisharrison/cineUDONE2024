import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateBancoDto{

    @ApiProperty({example: 'Mercantil', description: 'Nombre del Banco'})
    @IsOptional()
    @IsString()
    @Length(3, 60)
    nombre?: string;

    @ApiProperty({example: 'https://drive.google.com/file/d/1Uy5JbKQhLsx5lRoPy8Wmvjo_WeK5MmAf/view?usp=sharing', description: 'Url del Logo del Banco'})
    @IsNotEmpty()
    @IsUrl()
    logo?: string;

}