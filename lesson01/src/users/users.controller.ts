/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post() // POST /users
  create(@Body() user: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: {name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    return this.usersService.update(parseInt(id), userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
