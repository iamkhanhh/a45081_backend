import { IS_PUBLIC_KEY } from "@/decorators";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    let token;
    if (request.cookies) {
      token = request.cookies.access_token
    }
    
    if (!token) {
      throw new UnauthorizedException("There is not access_token in cookies!");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException("Access token is invalid");
    }
    return true;
  }
}
