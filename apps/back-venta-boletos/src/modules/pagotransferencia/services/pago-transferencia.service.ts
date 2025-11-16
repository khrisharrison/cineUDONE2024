import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagoTransferencia } from '../entities/pago-transferencia.entity';
import { Repository } from 'typeorm';
import { PagoTransferenciaDto } from '../dto/create-pago-transferencia.dto';

@Injectable()
export class PagoTransferenciaService {
  constructor(
    @InjectRepository(PagoTransferencia) private pagoTransferenciaRepository: Repository<PagoTransferencia>,
  ) {}

  getDatosTransferencia(){
    return this.pagoTransferenciaRepository.find({ relations: ['codigoBanco'] });
  }

  createDatosTransferencia(pagoTransferenciaDto: PagoTransferenciaDto) {
    const newPagoTransferencia = this.pagoTransferenciaRepository.create(pagoTransferenciaDto);
    return this.pagoTransferenciaRepository.save(newPagoTransferencia);
  }

  async deletePagoTransferencia(id: number){
    const existePagoTransferencia = await this.pagoTransferenciaRepository.findOne({ where: {id}});
    if (!existePagoTransferencia) {
        throw new NotFoundException(`Datos de Transferencia con id ${id} no encontrado`);
    }
    return this.pagoTransferenciaRepository.delete({id});
  }

  async updatePagoTransferencia(id: number, transferencia: PagoTransferenciaDto){
    const existePagoTransferencia = await this.pagoTransferenciaRepository.findOne({ where: {id}});
    if (!existePagoTransferencia) {
        throw new NotFoundException(`Datos de Pago Movil con id ${id} no encontrado`);
    }
    const updatePagoTransferencia = Object.assign(existePagoTransferencia,transferencia)
    return this.pagoTransferenciaRepository.save(updatePagoTransferencia)
  }

}
