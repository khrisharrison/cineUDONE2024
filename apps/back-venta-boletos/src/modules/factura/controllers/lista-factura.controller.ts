import { Controller, Post, Get, Body, Put, Param, ParseIntPipe } from '@nestjs/common';
import { FacturaService } from '../services/lista-factura.service';
import { Factura } from '../entities/lista-factura.entity';
import { FacturaDto } from '../dto/lista-factura.dto';

@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  async crearFactura(@Body() facturaData: FacturaDto){
    return this.facturaService.crearFactura(facturaData);
  }

  @Get()
  async listarFacturas(): Promise<Factura[]> {
    return this.facturaService.listarFacturas();
  }

  @Put(':id')
  modificarFactura(@Param('id', ParseIntPipe) id: number, @Body() factura: FacturaDto){
    return this.facturaService.modificarFactura(id,factura);
  }
}
