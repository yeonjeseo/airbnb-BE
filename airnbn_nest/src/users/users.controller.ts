import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { FindUserByPhoneDto } from './dto/find-user-by-phone.dts';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signUp(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.creatUser(createUserDto);
    return result;
  }

  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.usersService.checkUserExistById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuestDto: UpdateUserDto) {
    return this.usersService.update(+id, updateGuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('/email/:email')
  checkDuplicatedByEmail(@Param() email: FindUserByEmailDto) {
    return '123';
  }

  @Get('/phone/:phone')
  checkDuplicatedByPhone(@Param() phone: FindUserByPhoneDto) {
    return '123';
  }
}
