import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

enum CategoryEnum {
    pool = '멋진 수영장',
    farm= '농장',
    island='섬',
    beachside= '해변',
    rv = '캠핑카'
}

@Entity('rooms', {schema: 'airnbn'})
export class Room {
    @PrimaryGeneratedColumn({type:'int', name: 'id'})
    id: number;

    @Column('int', {name: 'host_id', nullable: false})
    hostId: number;

    @Column('varchar', {name: 'title',nullable: false})
    title: string;

    @Column('enum', {name: 'category', enum:CategoryEnum})
    category: CategoryEnum;

    @Column('text', {name: 'description', nullable: true })
    description: string;

    @Column('int', {name: 'price', nullable: false, default: 0})
    price: number;

    @Column('int', {name: 'capacity', nullable: false})
    capacity: number;

    @Column('float', {name: "average_rating", nullable: false, default: 0})
    averageRating: number;

    @Column('float', {name: 'latitude', nullable: false, default: 0})
    latitude: number;

    @Column('float', {name: 'longitude', nullable: false, default: 0})
    longitude: number;

    @Column('boolean', {name: 'english', nullable: false, default: false})
    english: boolean;

    @Column('boolean', {name: 'korean', nullable: false, default: false})
    korean: boolean;

    @Column('boolean', {name: 'allow_pet', nullable: false, default: false})
    allowPet: boolean;

    @Column('boolean', {name: 'allow_smoking', nullable:false, default:false})
    allowSmoking: boolean;

    @Column('varchar', {name: 'province'})
    province: string;

    @Column('boolean', {name: 'available', nullable: false, default: true})
    available: boolean;
}
