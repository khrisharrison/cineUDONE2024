import { Injectable } from "@nestjs/common";

@Injectable()
export class TarifaService {
  calcularprecio(preciobase: number, tipo: string, dia: string) {
    const descuentosPorDia: Record<string, number> = {
      lunes: 20,
      martes: 15,
      miercoles: 15,
      jueves: 10,
      viernes: 10,
      sabado: 10,
      domingo: 10
    };

    const descuentosPorTipo: Record<string, number> = {
      general: 0, // No tiene descuento adicional
      niño: 30,    // 30% de descuento para niños
      anciano: 25  // 25% de descuento para ancianos
    };

    // Normalizar las entradas
    const diaLower = dia.toLowerCase();
    const tipoLower = tipo.toLowerCase();

    // Obtener descuentos (si no existe el tipo, se asume 0%)
    const descuentoDia = descuentosPorDia[diaLower] || 0;
    const descuentoTipo = descuentosPorTipo[tipoLower] || 0;

    // Aplicar descuentos acumulativos
    const descuentoTotal = descuentoDia + descuentoTipo;
    const precioFinal = preciobase * (1 - descuentoTotal / 100);

    return parseFloat(precioFinal.toFixed(2));
  }
}

