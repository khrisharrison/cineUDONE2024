import { Module } from '@nestjs/common';
import { PaymentinfoController } from './controllers/paymentinfo.controller';
import { PaymentinfoService } from './services/paymentinfo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paymentinfo } from './entities/paymentinfo.entity';
import { CorreoService } from './services/correo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Paymentinfo])],
  controllers: [PaymentinfoController],
  providers: [PaymentinfoService, CorreoService]
})
export class PaymentinfoModule {}
