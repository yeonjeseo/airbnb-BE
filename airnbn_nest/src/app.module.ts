import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReservationsModule } from './reservations/reservations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservations/entities/reservation.entity';
import { Room } from './rooms/entities/rooms.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';
import { Review } from './reviews/entities/review.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'airnbn',
      entities: [Reservation, Room, User, Review],
      synchronize: true,
      charset: 'utf8_general_ci',
      logging: true,
    }),
    RoomsModule,
    ReviewsModule,
    ReservationsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
