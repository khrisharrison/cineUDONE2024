import { Module } from '@nestjs/common';
import { BancoController } from './controllers/banco.controller';
import { BancoService } from './services/banco.service';
import { Banco } from './entities/banco.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Banco])],
  controllers: [BancoController],
  providers: [BancoService]
})
export class BancoModule {}
