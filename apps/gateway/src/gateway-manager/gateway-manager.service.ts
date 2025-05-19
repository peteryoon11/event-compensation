import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GatewayManagerService {
  constructor(private jwtService: JwtService) {}
}
