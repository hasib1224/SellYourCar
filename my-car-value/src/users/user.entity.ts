import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { Exclude } from "class-transformer";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;
    userId: any;

    @AfterInsert()
    insertLog(){
        console.log("The data is inserted",this.id);
    }

    @AfterUpdate()
    updateLog(){
        console.log("Data is updated",this.id);
    }

    @AfterRemove()
    removeLog(){
        console.log("Data is removed",this.id);
    }
    
}