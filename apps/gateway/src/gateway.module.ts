import { Module } from '@nestjs/common';
// import { JwtStrategy } from './auth/jwt.strategy';
// import { HttpModule } from '@nestjs/axios';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';

import { GatewayManagerModule } from './gateway-manager/gateway-manager.module';

@Module({
  imports: [GatewayManagerModule],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
