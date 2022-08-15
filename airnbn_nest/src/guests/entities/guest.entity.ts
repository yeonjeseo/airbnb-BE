import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('guests', {schema: 'airnbn'})
export class Guest {
    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;

    @Column('varchar', {name: 'first_name', nullable: false})
    firstName: string;

    @Column('varchar', {name: 'last_name', nullable: false})
    lastName: string;

    @Column('varchar', {name: 'email',nullable: false})
    email: string;

    @Column('varchar', {name:'phone_number', nullable: false, comment:'하이픈(-) 없는 11자리 문자열 숫자'})
    phoneNumber: string;

    @Column('varchar', {name: 'pin_number', nullable: false, comment: '비밀번호 필드'})
    pinNumber: string;

    @Column('datetime', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('datetime', { name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
