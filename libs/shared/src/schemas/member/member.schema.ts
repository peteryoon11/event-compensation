import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaTypes } from 'mongoose';
import { MemberRole } from '@libs/shared/constants/member/member-enum';
export type MemberDocument = HydratedDocument<Member>;

@Schema({
  _id: true,
  collection: 'members',
  minimize: false,
  timestamps: true,
})
export class Member {
  @Prop({
    required: true,
    type: SchemaTypes.String,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  password?: string;

  @Prop({
    type: [SchemaTypes.String],
    enum: MemberRole,
    // default: [MemberRole.USER],
    default: MemberRole.USER,
    required: true,
  })
  role: MemberRole;

  @Prop({
    type: SchemaTypes.Mixed,
    _id: false,
    default: {},
  })
  meta?: {
    operatorInfo?: {
      managedEventIds: number[];
    };
    auditorInfo?: {
      accessibleReportIds: number[];
    };
  };
}

export const MemberSchema = SchemaFactory.createForClass(Member);

MemberSchema.index({
  email: 1,
});
MemberSchema.index({
  roles: 1,
});
