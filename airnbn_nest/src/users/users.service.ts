import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async creatUser(createUserDto: CreateUserDto) {
    const result = await this.usersRepository.createUser(createUserDto);
    console.log(result);
    return result;
  }

  findAllUsers(): Promise<User[]> {
    return this.usersRepository.findAllUsers();
  }

  checkUserExistById(id: number): Promise<User> {
    return this.usersRepository.findUserById(id);
  }

  checkUserExistByEmail(email): Promise<User> {
    return this.usersRepository.findUserByEmail(email);
  }

  update(id: number, update: UpdateUserDto) {
    return `This action updates a #${id} guest`;
  }

  remove(id: number) {
    return `This action removes a #${id} guest`;
  }
}
