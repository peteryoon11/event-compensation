import { Module } from '@nestjs/common';
import { EventManagerService } from './event-manager.service';
import { EventManagerController } from './event-manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EventCondition,
  EventSchema,
} from '@libs/shared/schemas/event/event.schema';
import {
  Compensation,
  CompensationSchema,
} from '@libs/shared/schemas/event/compensation.schema';
import {
  UserRequestCompensation,
  UserRequestCompensationSchema,
} from '@libs/shared/schemas/event/user-request-compensation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EventCondition.name,
        schema: EventSchema,
      },
      {
        name: Compensation.name,
        schema: CompensationSchema,
      },
      {
        name: UserRequestCompensation.name,
        schema: UserRequestCompensationSchema,
      },
    ]),
  ],
  controllers: [EventManagerController],
  providers: [EventManagerService],
})
export class EventManagerModule {}
