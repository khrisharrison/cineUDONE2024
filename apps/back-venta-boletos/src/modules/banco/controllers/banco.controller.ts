import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BancoService } from '../services/banco.service';
import { CreateBancoDto } from '../dto/create-banco.dto';
import { UpdateBancoDto } from '../dto/update-banco.dto';

@Controller('banco')
export class BancoController {
    constructor(private bancoService: BancoService){}
    
        @Post()
        createBanco(@Body() newBanco: CreateBancoDto){
            return this.bancoService.createBanco(newBanco);
        }
    
        @Get()
        getBanco(){
            return this.bancoService.getBanco();
        }

        @Delete(":id")
        deleteBanco(@Param('id') id: string){
            return this.bancoService.deleteBanco(id);
        }

        @Put(':id')
        updateBanco(@Param('id') id: string, @Body() banco: UpdateBancoDto){
            return this.bancoService.updateBanco(id,banco);
        }

}
