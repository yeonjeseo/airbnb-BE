import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('reservations', {schema: 'airnbn'})
export class Reservation {
    @PrimaryGeneratedColumn({type:'int', name: 'id'})
    id: number;

    @Column( 'int', { name: 'booker_id', nullable: false, })
    bookerId: number;

    @Column('int', { name: 'room_id', nullable: false })
    roomId: number;

    @Column('varchar', { name: 'check_in', nullable: false})
    checkIn: string;

    @Column('varchar', { name: 'check_out', nullable: false })
    checkOut: string;

    @Column('int', {name: 'amount_of_guests', nullable: false})
    amountOfGuests: number;

    @Column('datetime', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('datetime', { name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
