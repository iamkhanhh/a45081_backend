import { Controller, Get, Request, Body, Patch, Param, Put } from '@nestjs/common';
import { AccountService } from './account.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('account-statistics')
  getAccountStatistics(
    @Request() req,
  ) {
    return this.accountService.getAccountStatistics(req.user.id);
  }

  @Get()
  getAccount(
    @Request() req,
  ) {
    return this.accountService.getAccount(req.user.id);
  }

  @Patch('update-password')
  updatePassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.accountService.updatePassword(req.user.id, updatePasswordDto);
  }

  @Put()
  update(
    @Request() req,
    @Body() UpdateAccountDto: UpdateAccountDto
  ) {
    return this.accountService.update(req.user.id, UpdateAccountDto);
  }
}
