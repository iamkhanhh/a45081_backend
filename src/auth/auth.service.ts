import { UsersService } from '@/modules/users/users.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Users } from '@/entities';
import { UserStatus } from '@/enums';
import { HashingPasswordProvider } from '@/common/providers/hashing-password.provider';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashingPasswordProvider: HashingPasswordProvider
  ) {}

  async login(user: any) {
    const payload = { email: user.email, id: user.id , role: Users.getUserRole(user.role), first_name: user.first_name, last_name: user.last_name};
    return {
      access_token: await this.jwtService.sign(payload),
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

    const isValidPassword = await this.hashingPasswordProvider.comparePasswordHelper(pass, user.password);

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

  async forgotPassword(email: string) {
    return await this.usersService.forgotPassword(email);
  }

  async validateOrCreateGoogleUser(profile: any): Promise<any> {
    const email = profile.emails?.[0]?.value || profile.email;
    const firstName = profile.name?.givenName || profile.first_name || '';
    const lastName = profile.name?.familyName || profile.last_name || '';
    const googleId = profile.id;

    let user = await this.usersService.findByEmail(email);
    
    if (!user) {
      user = await this.usersService.CreateGoogleUser({
        email,
        first_name: firstName,
        last_name: lastName,
        googleId,
      });
    } else {
      if (!user.googleId) {
        await this.usersService.updateGoogleId(user.id, googleId);
        user.googleId = googleId;
      }
    }
    
    return user;
  }


}