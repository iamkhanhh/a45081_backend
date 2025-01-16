import { Controller, Post, UseGuards, Request, Get, Body, Param, Res, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public } from '@/decorators';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Res({passthrough: true}) res: Response,
    @Request() req
  ) {
    const {access_token} = await this.authService.login(req.user);
    res.cookie('access_token', access_token, {
      maxAge: 365 * 24 * 60 * 60 * 100,
      sameSite: 'strict',
      httpOnly: true,
    }); 
    return {
      status: "success",
      message: "Logged in successfully !",
    }
  }

  @Public()
  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Public()
  @Post('google-authentication')
  googleAuthentication(@Body() body: any) {
    console.log(body);
    return true
  }

  @Public()
  @Post('activate-account/:id')
  activateAccount(
    @Body() activateDto: any,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.authService.activateAccount(activateDto, id);
  }

  @Public()
  @Post('forgot-password')
  forgotPassword(
    @Request() req,
    @Body() forgotPasswordDto: any
  ) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Get('me')
  getProfile(@Request() req) {
    return {
      status: 'success',
      data: req.user
    };
  }

  @Post('logout')
  logout(@Res() res) {
		res.clearCookie('access_token', {
      maxAge: 365 * 24 * 60 * 60 * 100,
      sameSite: 'strict',
      httpOnly: true,
    });
		return res.json({status: 'success', message: 'Logged out successfully!'});
  }
}
