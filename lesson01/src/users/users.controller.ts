/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users') // /users
export class UsersController {
  /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
  */

  constructor(private usersService: UsersService) {}
  
  @Get() // GET /users or /users?role=value&name=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get('interns') // GET /users/interns
  findAllInterns() {
    return [];
  }
  // The order of the route decorators is important!
  // if the route interns comes after the route :id, the interns route will never be reached.
  // The application will think the interns route is an id parameter.

  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post() // POST /users
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id', ParseIntPipe) id: string, @Body() userUpdate: UpdateUserDto) {
    return this.usersService.update(parseInt(id), userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
