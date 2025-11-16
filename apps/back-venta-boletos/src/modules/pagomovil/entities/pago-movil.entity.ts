import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Banco } from '../../banco/entities/banco.entity';

@Entity({name: 'pagomovil'})
export class PagoMovil{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Banco, (codigoBanco) => codigoBanco.pagomoviles)
  codigoBanco: string;

  @Column()
  cedula: string;

  @Column()
  nroTelefono: string;
}

