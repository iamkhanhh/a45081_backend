import { Controller, Get, Request, Body, Patch, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('account-statistics')
  @ApiOperation({ summary: 'Get account statistics' })
  @ApiResponse({ status: 200, description: 'Account statistics retrieved successfully' })
  getAccountStatistics(
    @Request() req,
  ) {
    return this.accountService.getAccountStatistics(req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get current account information' })
  @ApiResponse({ status: 200, description: 'Account information retrieved successfully' })
  getAccount(
    @Request() req,
  ) {
    return this.accountService.getAccount(req.user.id);
  }

  @Patch('update-password')
  @ApiOperation({ summary: 'Update account password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  updatePassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.accountService.updatePassword(req.user.id, updatePasswordDto);
  }

  @Put()
  @ApiOperation({ summary: 'Update account information' })
  @ApiResponse({ status: 200, description: 'Account updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(
    @Request() req,
    @Body() UpdateAccountDto: UpdateAccountDto
  ) {
    return this.accountService.update(req.user.id, UpdateAccountDto);
  }
}
