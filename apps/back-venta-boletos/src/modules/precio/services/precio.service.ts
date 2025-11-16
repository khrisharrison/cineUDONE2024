import { Injectable } from '@nestjs/common';
import { PrecioDto } from '../dto/precio.dto';

@Injectable()
export class PrecioService {
    private precioGeneral = 3.99; // Valor inicial

    getPrecio(): number {
        return this.precioGeneral;
    }

    setPrecio(nuevoPrecio: PrecioDto) {
        return this.precioGeneral = nuevoPrecio.precio;
    }
}
