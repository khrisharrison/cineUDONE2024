import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Paymentinfo } from '../modules/paymentinfo/entities/paymentinfo.entity';
import { PagoTransferencia } from '../modules/pagotransferencia/entities/pago-transferencia.entity';
import { PagoMovil } from '../modules/pagomovil/entities/pago-movil.entity';
import { Factura } from '../modules/factura/entities/lista-factura.entity';
import { Banco } from '../modules/banco/entities/banco.entity';

export const typeORMConfig = TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      url: configService.get<string>('DB_URL'),
      entities: [Banco,Paymentinfo,PagoTransferencia,PagoMovil,Factura],
      ssl: true,
      synchronize: true, // Solo para desarrollo, cambiar cuando se lanze a produccion
      autoLoadEntities: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    })
  })