import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class ChatUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  name: string;

}



/* 
Table ChatUser
int ChatRoomID
int UserID
int LastMessageID Primary Key (ChatRoomID, UserID)

select cr.ChatRoomID AS id,
    cu.LastMessageID AS label
from ChatUsers cu inner join ChatRooms cr ON cu.ChatRoomID = cr.ChatRoomID
where cu.UserID = :user_id and 
exists (select 1 from ChatMessages cm where cm.ChatRoomID = cr.ChatRoomID and cu.LastMessageID < cm.ChatMessageID);
*/