import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import {
  EventConditionType,
  EventStatus,
} from '@libs/shared/constants/events/events-enum';

export type EventConditionDocument = HydratedDocument<EventCondition>;

// 조건 타입 정의
export class EventCondition {
  @Prop({
    required: true,
    type: SchemaTypes.String,
    enum: EventConditionType,
  })
  type: EventConditionType;

  @Prop({
    required: true,
    type: SchemaTypes.Number,
  })
  value: number;
}

@Schema({
  _id: true,
  collection: 'events',
  minimize: false,
  timestamps: true,
})
export class Events {
  @Prop({
    required: true,
    type: SchemaTypes.String,
    unique: true,
  })
  creatorEmail: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  title: string;

  @Prop({
    type: [EventCondition],
    default: [],
    _id: false,
  })
  conditions: EventCondition[];

  @Prop({
    required: true,
    type: SchemaTypes.String,
    enum: EventStatus,
    default: EventStatus.ACTIVE,
  })
  status: EventStatus;

  @Prop({
    type: SchemaTypes.Date,
    required: true,
  })
  startDate: Date;

  @Prop({
    type: SchemaTypes.Date,
    required: true,
  })
  endDate: Date;

  @Prop({
    type: SchemaTypes.Mixed,
    _id: false,
    default: {},
  })
  meta?: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Events);

EventSchema.index({
  creatorEmail: 1,
});
EventSchema.index({
  status: 1,
});
