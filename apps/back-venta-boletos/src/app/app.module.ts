import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { typeORMConfig } from '../config/typeorm.config';;
import { PaymentinfoModule } from '../modules/paymentinfo/paymentinfo.module';
import { PagoMovilModule } from '../modules/pagomovil/pago-movil.module';
import { PagoTransferenciaModule } from '../modules/pagotransferencia/pago-transferencia.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BancoModule } from '../modules/banco/banco.module';
import { TarifaModule } from '../modules/precio/tarifa.module';
import { FacturaModule } from '../modules/factura/lista-factura.module';
import { PrecioModule } from '../modules/precio/precio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    typeORMConfig,
    EventEmitterModule.forRoot(),
    PaymentinfoModule,PagoTransferenciaModule,PagoMovilModule,BancoModule,TarifaModule,FacturaModule,PrecioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
