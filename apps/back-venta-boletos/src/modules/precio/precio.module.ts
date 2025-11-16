import { Module } from '@nestjs/common';
import { PrecioService } from './services/precio.service';
import { PrecioController } from './controllers/precio.controller';

@Module({
    providers: [PrecioService],
    controllers: [PrecioController],
})
export class PrecioModule {}

