
import { comparePasswordHelper } from '@/helpers';
import { UsersService } from '@/modules/users/users.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserStatus } from '@/entities';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null
    }

    if (user.status == UserStatus.PENDING) {
      throw new BadRequestException('Your account is not active!')
    } else if (user.status == UserStatus.DELETED) {
      throw new BadRequestException('Your account is deleted! Please contact to admin')
    } else if (user.status == UserStatus.DISABLED) {
      throw new BadRequestException('Your account is disabled! Please contact to admin')
    }

    const isValidPassword = await comparePasswordHelper(pass, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('The password did not match!')
    }

    return user
  }

  async register(createAuthDto: CreateAuthDto) {
    return await this.usersService.register(createAuthDto);
  }

  async activateAccount(activateDto: any, id: number) {
    return await this.usersService.activateAccount(activateDto.code, id);
  }
}