import { Module } from '@nestjs/common';
import { GatewayManagerController } from './gateway-manager.controller';
import { GatewayManagerService } from './gateway-manager.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from '@libs/shared/auth/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'my-secret-key', // .env 사용 권장
      signOptions: { expiresIn: '1h' },
    }),
    HttpModule,
  ],
  controllers: [GatewayManagerController],
  providers: [GatewayManagerService, JwtStrategy],
})
export class GatewayManagerModule {}
