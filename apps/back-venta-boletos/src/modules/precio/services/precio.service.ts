import { Injectable } from '@nestjs/common';
import { PrecioDto } from '../dto/precio.dto';

@Injectable()
export class PrecioService {
    private precioGeneral = 4.00; // Valor inicial
    private descuentosPorDia: Record<string, number> = {
        lunes: 0.5,
        martes: 0,
        miercoles: 0.2,
        jueves: 0,
        viernes: 0,
        sabado: 0,
        domingo: 0
    };
    private descuentosPorTipo: Record<string, number> = {
        general: 0, // No tiene descuento adicional
        niño: 0.5,    // 50% de descuento para niños
        adultoMayor: 0.5  // 50% de descuento para adultoMayor
    };

    getPrecio(dia: string): Record<string, number> {
        //const precioBase = await obtenerPrecioBase(tipoEntrada);
        const precioFinal = this.calcularprecio(this.precioGeneral,dia);
        return precioFinal;
    }

    calcularprecio(preciobase: number, dia: string) {
        if(dia === "lunes"){
            const descuentosPorDia: Record<string, number> = {
                general: preciobase*(1-this.descuentosPorDia.lunes),
                niño: preciobase*(1-this.descuentosPorTipo.niño),
                adultoMayor: preciobase*(1-this.descuentosPorTipo.adultoMayor)
            };
            return descuentosPorDia;
        }else if(dia === "miercoles"){
            const descuentosPorDia: Record<string, number> = {
                general: preciobase*(1-this.descuentosPorDia.miercoles),
                niño: preciobase*(1-this.descuentosPorTipo.niño),
                adultoMayor: preciobase*(1-this.descuentosPorTipo.adultoMayor)
            };
            return descuentosPorDia;
        }else{
            const descuentosPorDia: Record<string, number> = {
                general: preciobase,
                niño: preciobase*(1-this.descuentosPorTipo.niño),
                adultoMayor: preciobase*(1-this.descuentosPorTipo.adultoMayor)
            };
            return descuentosPorDia;
        }
    }

    setPrecio(nuevoPrecio: PrecioDto) {
        return this.precioGeneral = nuevoPrecio.precio;
    }
}
