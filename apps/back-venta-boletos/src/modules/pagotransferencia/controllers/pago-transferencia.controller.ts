import { Controller, Post, Body, Get, Delete, Put, Param, ParseIntPipe } from '@nestjs/common';
import { PagoTransferenciaDto } from '../dto/create-pago-transferencia.dto';
import { PagoTransferenciaService } from '../services/pago-transferencia.service';

@Controller('pago-transferencia')
export class PagoTransferenciaController {
  constructor(private readonly pagoTransferenciaService: PagoTransferenciaService) {}

  @Get()
  getTransferencia(){
    return this.pagoTransferenciaService.getDatosTransferencia();
  }
  
  @Post()
  createTransferencia(@Body() newTransferencia: PagoTransferenciaDto) {
    return this.pagoTransferenciaService.createDatosTransferencia(newTransferencia);
  }

  @Delete(":id")
  deletePagoTransferencia(@Param('id', ParseIntPipe) id: number){
    return this.pagoTransferenciaService.deletePagoTransferencia(id);
  }

  @Put(':id')
  updatePagoTransferencia(@Param('id', ParseIntPipe) id: number, @Body() transferencia: PagoTransferenciaDto){
    return this.pagoTransferenciaService.updatePagoTransferencia(id,transferencia);
  }

}
