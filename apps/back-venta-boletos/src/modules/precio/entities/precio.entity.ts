import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'precio'})
export class Precio{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: string;

    @Column()
    precio: number;
}

@Entity({name: 'descuentos'})
export class Descuento{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion: string;
    
    @Column()
    valor: number;
}