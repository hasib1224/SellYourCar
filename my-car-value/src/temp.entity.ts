import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Temp{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
}