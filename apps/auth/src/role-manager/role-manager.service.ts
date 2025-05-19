import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Member } from '@libs/shared/schemas/member/member.schema';
import { InjectModel } from '@nestjs/mongoose';
import { MemberRole } from '@libs/shared/constants/member/member-enum';
import { MemberCreateDto } from '@libs/shared/dtos/member.create.dto';
// import { MemberCreateDto } from './dtos/member.create.dto';

@Injectable()
export class RoleManagerService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Member.name)
    private readonly memberModel: Model<Member>,
  ) {}

  async test() {
    // return this.memberModel.findOne({ email: 'admin@example.com' });
    return this.memberModel.find({}).exec();
  }

  memberFindOne(email: string) {
    return this.memberModel.findOne({ email });
  }

  async createMember(user: MemberCreateDto) {
    const memberModel = new this.memberModel({
      email: user.email,
      password: user.password,
      role: user.role,
    });

    return memberModel.save();
  }

  async login(user: MemberCreateDto) {
    const payload = {
      email: user.email,
      role: user.role,
    };
    console.log(`paylodad ${JSON.stringify(payload, null, 2)}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
