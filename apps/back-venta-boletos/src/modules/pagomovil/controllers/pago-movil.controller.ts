import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { PagoMovilDto } from '../dto/create-pago-movil.dto';
import { PagoMovilService } from '../services/pago-movil.service';

@Controller('pago-movil')
export class PagoMovilController{
  constructor (private pagoMovilService: PagoMovilService){}

  @Get()
  getPagoMovil(){
    return this.pagoMovilService.getDatosPagoMovil();
  }

  @Post()
  createPagoMovil(@Body() newPagoMovil: PagoMovilDto){
    return this.pagoMovilService.createPagoMovil(newPagoMovil);
  }

  @Delete(":id")
  deletePagoMovil(@Param('id', ParseIntPipe) id: number){
    return this.pagoMovilService.deletePagoMovil(id);
  }

  @Put(':id')
  updatePagoMovil(@Param('id', ParseIntPipe) id: number, @Body() pagomovil: PagoMovilDto){
    return this.pagoMovilService.updatePagoMovil(id,pagomovil);
  }

}
