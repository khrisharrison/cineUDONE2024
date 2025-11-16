import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from '../entities/lista-factura.entity';
import { Paymentinfo } from '../../paymentinfo/entities/paymentinfo.entity';
import { FacturaDto } from '../dto/lista-factura.dto';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(Paymentinfo)
    private readonly paymentinfoRepository: Repository<Paymentinfo>,
  ) {}

  async crearFactura(facturaData: FacturaDto){

    const paymentinfo = await this.paymentinfoRepository.findOne({
      where: { id: facturaData.paymentinfoId },
    });

    if (!paymentinfo) {
      throw new NotFoundException(
        `No se encontró un registro de Paymentinfo con el id ${facturaData.paymentinfoId}`,
      );
    }

    const newFactura = this.facturaRepository.create(facturaData);
    return await this.facturaRepository.save(newFactura);
  }

  async listarFacturas(): Promise<Factura[]> {
    return this.facturaRepository.find();
  }

  async modificarFactura(numFactura: number, factura: FacturaDto){
    const existeFactura = await this.facturaRepository.findOne( {where: { numFactura } });

    if (!existeFactura)
      throw new NotFoundException(`Factura con ID ${numFactura} no encontrado`);

    const updateFactura = Object.assign(existeFactura,factura);
    return this.facturaRepository.save(updateFactura);
  }
}
