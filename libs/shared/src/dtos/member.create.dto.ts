import { MemberRole } from '@libs/shared/constants/member/member-enum';
import { IsEnum, IsString } from 'class-validator';

export class MemberCreateDto {
  @IsString()
  email: string;
  @IsString()
  password: string;

  constructor(params?: Partial<MemberCreateDto>) {
    Object.assign(this, params);
  }
}
