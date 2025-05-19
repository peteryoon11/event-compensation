import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { RoleManagerService } from './role-manager.service';

import { MemberCreateDto } from '@libs/shared/dtos/member.create.dto';
import * as bcrypt from 'bcrypt';
import { MemberRole } from '@libs/shared/constants/member/member-enum';
import { AdminMemberCreateDto } from '@libs/shared/dtos/admin.member.create.dto';

@Controller('auth')
export class RoleManagerController {
  constructor(private roleManagerService: RoleManagerService) {}

  // TODO 롤 점검은 gateway 에서 할 예정
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin')
  @Get('/profile')
  async getProfile(@Req() req) {
    const test = await this.roleManagerService.test();

    return {
      message: `Hello `,
      test,
    };
  }

  // 일반 유저 생성
  @Post('/create/user')
  async createMember(@Body() body: AdminMemberCreateDto): Promise<any> {
    console.log(`@@@@ auth body ${JSON.stringify(body, null, 2)}`);
    const exists = await this.roleManagerService.memberFindOne(body.email);
    if (exists) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(body.password, 10);

    return await this.roleManagerService.createMember({
      email: body.email,
      password: hashedPassword,
      role: MemberRole.USER,
    });
  }
  // 특수 유저 생성
  @Post('/create/admin/user')
  async createAdminMember(@Body() body: AdminMemberCreateDto): Promise<any> {
    console.log(`@@@@ auth body ${JSON.stringify(body, null, 2)}`);
    const exists = await this.roleManagerService.memberFindOne(body.email);
    if (exists) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(body.password, 10);

    return await this.roleManagerService.createMember({
      email: body.email,
      password: hashedPassword,
      role: MemberRole.USER,
    });
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    console.log(`RoleManagerController body ${JSON.stringify(body, null, 2)}`);

    const user = await this.roleManagerService.memberFindOne(body.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    console.log(`user ${JSON.stringify(user, null, 2)}`);
    const isMatch: boolean = await bcrypt.compare(
      body.password,
      user.password || '',
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password ..');
    }

    return this.roleManagerService.login({
      email: user.email,
      role: user.role,
    });
  }
}
