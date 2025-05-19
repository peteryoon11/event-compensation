import { Module } from '@nestjs/common';
import { EventManagerModule } from './event-manager/event-manager.module';

@Module({
  imports: [EventManagerModule],
  controllers: [],
  providers: [],
})
export class EventModule {}
