import { Controller, Get, Put, Query, Body } from '@nestjs/common';
import { PrecioService } from '../services/precio.service';
import { PrecioDto } from '../dto/precio.dto';

@Controller('precio')
export class PrecioController {
    constructor(private readonly precioService: PrecioService) {}

    @Get()
    getPrecio (
        @Query('dia') dia: string,
    ): Record<string, number> {
        const precioFinal = this.precioService.getPrecio(dia);
        return precioFinal;
    }

    @Put()
    updatePrecio(@Body() nuevoPrecio: PrecioDto) {
        const newPrecio = this.precioService.setPrecio(nuevoPrecio);
        return { message: `Precio actualizado correctamente a ${newPrecio}` };
    }
}
