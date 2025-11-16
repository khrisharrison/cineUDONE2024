import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagoMovil } from '../entities/pago-movil.entity';
import { Repository } from 'typeorm';
import { PagoMovilDto } from '../dto/create-pago-movil.dto';

@Injectable()
export class PagoMovilService {
  constructor (@InjectRepository(PagoMovil) private pagoMovilRepository: Repository<PagoMovil>){}

  getDatosPagoMovil(){
    return this.pagoMovilRepository.find({ relations: ['codigoBanco'] });
  }
  
  createPagoMovil(createpagomovil: PagoMovilDto){
    const newPagoMovil = this.pagoMovilRepository.create(createpagomovil)
    return this.pagoMovilRepository.save(newPagoMovil)
  }

  async deletePagoMovil(id: number){
    const existePagoMovil = await this.pagoMovilRepository.findOne({ where: {id}});
    if (!existePagoMovil) {
        throw new NotFoundException(`Datos de Pago Movil con id ${id} no encontrado`);
    }
    return this.pagoMovilRepository.delete({id});
  }

  async updatePagoMovil(id: number, pagomovil: PagoMovilDto){
    const existePagoMovil = await this.pagoMovilRepository.findOne({ where: {id}});
    if (!existePagoMovil) {
        throw new NotFoundException(`Datos de Pago Movil con id ${id} no encontrado`);
    }
    const updatePagoMovil = Object.assign(existePagoMovil,pagomovil)
    return this.pagoMovilRepository.save(updatePagoMovil)
  }
}

