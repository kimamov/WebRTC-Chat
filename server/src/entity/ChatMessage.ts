import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  name: string;

}


/* 
    Table ChatMessage
    int Primary Key ChatMessageID
    int UserID
    int ChatRoomID
    varchar(2000) message
    datetime date
*/