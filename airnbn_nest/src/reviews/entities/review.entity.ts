import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('reviews', {schema: 'airnbn'})
export class Review {
    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;

    @Column('int', {name: 'guest_id', nullable: false })
    guestId: number;

    @Column('int', {name: 'room_id', nullable: false})
    roomId: number;

    @Column('int', {name: 'rating',nullable: true, default: null})
    rating: number;

    @Column('text', {name:'comment', nullable: false, comment:'리뷰 텍스트'})
    comment: string;

    @Column('datetime', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('datetime', { name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
