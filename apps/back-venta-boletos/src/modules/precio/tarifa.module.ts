import { Module } from '@nestjs/common';
import { TarifaController } from './controllers/tarifa.controller';
import { TarifaService } from './services/tarifa.service';
;

@Module({
  controllers: [TarifaController],
  providers: [TarifaService]
})
export class TarifaModule {}