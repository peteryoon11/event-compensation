import { Module } from '@nestjs/common';
import { RoleManagerController } from './role-manager.controller';
import { RoleManagerService } from './role-manager.service';
import { JwtModule } from '@nestjs/jwt';
import {
  Member,
  MemberSchema,
} from '@libs/shared/schemas/member/member.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my-secret-key', // .env 사용 권장
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([
      {
        name: Member.name,
        schema: MemberSchema,
      },
    ]),
  ],
  controllers: [RoleManagerController],
  providers: [RoleManagerService],
})
export class RoleManagerModule {}
