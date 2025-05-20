import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import {
  CompensationType,
  RequestStatus,
  Status,
} from '@libs/shared/constants/events/events-enum';
import { Compensation } from '@libs/shared/schemas/event/compensation.schema';

export type UserRequestCompensationDocument =
  HydratedDocument<UserRequestCompensation>;

@Schema({
  _id: true,
  collection: 'user-request-compensation',
  minimize: false,
  timestamps: true,
})
export class UserRequestCompensation {
  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  requestEmail: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  eventId: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
    enum: RequestStatus,
    default: RequestStatus.PRECESSING,
  })
  status: RequestStatus;

  @Prop({
    type: SchemaTypes.Mixed,
    _id: false,
    default: {},
  })
  meta?: Record<string, any>;
}

export const UserRequestCompensationSchema = SchemaFactory.createForClass(
  UserRequestCompensation,
);
