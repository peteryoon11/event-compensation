import { Module } from '@nestjs/common';
// import { JwtStrategy } from './auth/jwt.strategy';
// import { HttpModule } from '@nestjs/axios';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
import { RoleManagerModule } from './role-manager/role-manager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RoleManagerModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        // uri: 'mongodb://root:1q2w3e4r@localhost:27017/myapp?authSource=admin',
        uri: 'mongodb://eventAdmin:qwer1234@localhost:27017/myapp?authSource=admin',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      // inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
