import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FastqGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService, // Assuming you might need this for future use
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    try {
      const [type, token] = authHeader.split(' ');
      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid authorization format');;
      }

      if (token !== this.configService.get<string>('FASTQ_TOKEN')) {
        throw new UnauthorizedException('Invalid vep token');;
      }

    } catch (error) {
      throw new UnauthorizedException(error.message || 'Unauthorized');
    }
    return true;
  }
}
