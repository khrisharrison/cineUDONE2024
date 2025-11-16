import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Banco } from '../../banco/entities/banco.entity';

@Entity({ name: 'pago-transferencia' })
export class PagoTransferencia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Banco, (bancoCodigo) => bancoCodigo.transferencias)
  codigoBanco: string;

  @Column()
  cedula: string;

  @Column()
  nroCuenta: string;
}
