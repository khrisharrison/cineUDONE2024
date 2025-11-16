import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/lista-factura.entity'; // Importa la entidad Factura
import { Paymentinfo } from '../paymentinfo/entities/paymentinfo.entity'; // Importa la entidad Paymentinfo
import { FacturaService } from './services/lista-factura.service'; // Importa el servicio FacturaService
import { FacturaController } from './controllers/lista-factura.controller'; // Importa el controlador FacturaController

@Module({
  imports: [
    TypeOrmModule.forFeature([Factura, Paymentinfo]), // Registra Factura y Paymentinfo
  ],
  controllers: [FacturaController], // Registra el controlador
  providers: [FacturaService], // Registra el servicio
})
export class FacturaModule {}
