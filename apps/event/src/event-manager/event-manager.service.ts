import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from '@libs/shared/schemas/member/member.schema';
import { Model, Types } from 'mongoose';
import { EventCondition } from '@libs/shared/schemas/event/event.schema';
import { EventConditionType } from '@libs/shared/constants/events/events-enum';
import { Compensation } from '@libs/shared/schemas/event/compensation.schema';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { UserRequestCompensation } from '@libs/shared/schemas/event/user-request-compensation.schema';

@Injectable()
export class EventManagerService {
  constructor(
    @InjectModel(EventCondition.name)
    private readonly eventConditionModel: Model<EventCondition>,

    @InjectModel(Compensation.name)
    private readonly compensationModel: Model<Compensation>,

    @InjectModel(UserRequestCompensation.name)
    private readonly userRequestCompensationModel: Model<UserRequestCompensation>,
  ) {}

  getEventList() {
    return this.eventConditionModel.find();
  }

  createEvent(body: {
    creatorEmail: string;
    title: string;
    conditions: EventCondition[];
    startDate: string;
    endDate: string;
  }) {
    const eventConditionModel = new this.eventConditionModel(body);

    return eventConditionModel.save();
  }

  createCompensation(body: {
    creatorEmail: string;
    eventId: string;
    title: string;
    type: string;
    value: number;
  }) {
    const compensationModel = new this.compensationModel(body);

    return compensationModel.save();
  }

  async requestCompensation(body: { requestEmail: string; eventId: string }) {
    const event = await this.eventConditionModel.find({
      _id: new Types.ObjectId(body.eventId),
    });

    // console.log(`event ${JSON.stringify(event, null, 2)}`);
    console.log(`event ${event}`);
    if (isNil(event)) {
      return 'not exist event';
    }

    const userRequestCompensation = this.userRequestCompensationModel.find({
      requestEmail: body.requestEmail,
      eventId: body.eventId,
    });

    const userRequestCompensationModel = new this.userRequestCompensationModel(
      body,
    );

    return userRequestCompensationModel.save();
  }

  async getRequestCompensation() {
    const event = await this.userRequestCompensationModel.find({
      // _id: new Types.ObjectId(body.eventId),
    });

    // console.log(`event ${JSON.stringify(event, null, 2)}`);
    console.log(`event ${event}`);
    if (isNil(event)) {
      return 'not exist event';
    }

    return event;
  }

  async getRequestCompensationUser(requestEmail: string) {
    const event = await this.userRequestCompensationModel.find({
      // _id: new Types.ObjectId(body.eventId),
      requestEmail,
    });

    // console.log(`event ${JSON.stringify(event, null, 2)}`);
    console.log(`event ${event}`);
    if (isNil(event)) {
      return 'not exist event';
    }

    return event;
  }
}
