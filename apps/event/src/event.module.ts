import { Module } from '@nestjs/common';
import { EventManagerModule } from './event-manager/event-manager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EventManagerModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        // uri: 'mongodb://root:1q2w3e4r@localhost:27017/myapp?authSource=admin',
        uri: 'mongodb://eventAdmin:qwer1234@localhost:27017/myapp?authSource=admin',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      // inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class EventModule {}
