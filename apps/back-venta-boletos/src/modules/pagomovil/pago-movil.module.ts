import { Module } from '@nestjs/common';
import { PagoMovilController } from './controllers/pago-movil.controller';
import { PagoMovilService } from './services/pago-movil.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoMovil } from './entities/pago-movil.entity';

//Estamos declarando en el modulo todas las que estamos usando.
@Module({
  imports: [TypeOrmModule.forFeature([PagoMovil])],
  controllers: [PagoMovilController],
  providers: [PagoMovilService]


})
export class PagoMovilModule{}
