import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import {
  CompensationType,
  Status,
} from '@libs/shared/constants/events/events-enum';

export type CompensationDocument = HydratedDocument<Compensation>;

@Schema({
  _id: true,
  collection: 'compensation',
  minimize: false,
  timestamps: true,
})
export class Compensation {
  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  creatorEmail: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  title: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Prop({
    required: true,
    type: SchemaTypes.String,
    enum: CompensationType,
    default: CompensationType.ITEM,
  })
  type: CompensationType;

  @Prop({
    required: true,
    type: SchemaTypes.Number,
    default: 1,
  })
  value: number;

  @Prop({
    type: SchemaTypes.Mixed,
    _id: false,
    default: {},
  })
  meta?: Record<string, any>;
}

export const CompensationSchema = SchemaFactory.createForClass(Compensation);
