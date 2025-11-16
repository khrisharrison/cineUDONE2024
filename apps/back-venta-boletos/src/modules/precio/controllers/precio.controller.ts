import { Controller, Get, Put, Body } from '@nestjs/common';
import { PrecioService } from '../services/precio.service';
import { PrecioDto } from '../dto/precio.dto';

@Controller('precio')
export class PrecioController {
    constructor(private readonly precioService: PrecioService) {}

    @Get()
    getPrecio() {
        return { precio: this.precioService.getPrecio() };
    }

    @Put()
    updatePrecio(@Body() nuevoPrecio: PrecioDto) {
        const newPrecio = this.precioService.setPrecio(nuevoPrecio);
        return { message: `Precio actualizado correctamente a ${newPrecio}` };
    }
}
