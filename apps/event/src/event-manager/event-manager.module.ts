import { Module } from '@nestjs/common';
import { EventManagerService } from './event-manager.service';
import { EventManagerController } from './event-manager.controller';

@Module({
  imports: [],
  controllers: [EventManagerController],
  providers: [EventManagerService],
})
export class EventManagerModule {}
