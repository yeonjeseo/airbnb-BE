import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReservationsModule } from './reservations/reservations.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Reservation} from "./reservations/entities/reservation.entity";
import {Room} from "./rooms/entities/rooms.entity";
import { GuestsModule } from './guests/guests.module';
import {Guest} from "./guests/entities/guest.entity";
import {Review} from "./reviews/entities/review.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'airnbn',
    entities: [Reservation, Room, Guest, Review],
    synchronize: true,
    charset: 'utf8_general_ci'
  }), RoomsModule, ReviewsModule, ReservationsModule, GuestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
