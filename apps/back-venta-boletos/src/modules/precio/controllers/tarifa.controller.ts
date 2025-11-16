import { Controller, Post, Body } from '@nestjs/common';
import { TarifaService } from '../services/tarifa.service';

@Controller('tarifas')
export class TarifaController {
  constructor(private readonly tarifaService: TarifaService) {}

  @Post('calcular-precio')
  calcularPrecio(@Body() data: { preciobase: number; tipo: string; dia: string }) {
    return { precioFinal: this.tarifaService.calcularprecio(data.preciobase, data.tipo, data.dia) };
  }
}
