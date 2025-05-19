import { MemberRole } from '@libs/shared/constants/member/member-enum';
import { IsEnum, IsString } from 'class-validator';

export class AdminMemberCreateDto {
  @IsString()
  email: string;
  @IsString()
  password: string;

  @IsEnum(MemberRole)
  role: MemberRole;

  constructor(params?: Partial<AdminMemberCreateDto>) {
    Object.assign(this, params);
  }
}
