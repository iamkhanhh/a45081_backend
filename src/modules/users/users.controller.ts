import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { DeleteMultipleUsersDto } from './dto/delete-multiple-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Request() req
  ) {
    return this.usersService.create(createUserDto, req.user.id);
  }

  @Post('load-users')
  findAll(
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Query('pageSize', ParseIntPipe, new DefaultValuePipe(10)) pageSize: number,
    @Body() filterUsersDto: FilterUsersDto
  ) {
    return this.usersService.findAll(page, pageSize, filterUsersDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete('multiple-user')
  removeMultipleUsers(
    @Body() deleteMultipleUsersDto: DeleteMultipleUsersDto
  ) {
    return this.usersService.removeMultipleUsers(deleteMultipleUsersDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
