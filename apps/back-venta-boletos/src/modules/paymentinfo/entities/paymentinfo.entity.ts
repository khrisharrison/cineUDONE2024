import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Banco } from '../../banco/entities/banco.entity';
import { Factura } from '../../factura/entities/lista-factura.entity';

@Entity({name: 'paymentinfo'})
export class Paymentinfo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    referencia: string;

    @ManyToOne(() => Banco, (codigoBanco) => codigoBanco.paymentinfos)
    codigoBanco: string;

    @Column({
        type: 'enum',
        enum: ['Pago Movil', 'Transferencia']
    })
    metodo: string;

    @Column({type: 'date'})
    fecha: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @Column({
        type: 'enum',
        enum: ['pendiente', 'confirmado', 'rechazado'],
        default: 'pendiente'
    })
    estado: string;

    @Column()
    cantBoletos: number;

    @Column()
    fechaFuncion: string;

    @Column()
    horaFuncion: string;

    @Column()
    correo: string;

    @OneToMany(() => Factura, factura => factura.numFactura)
    facturas: Factura[];
}
