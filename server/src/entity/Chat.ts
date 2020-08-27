import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  name: string;

}
