import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RoleManagerService } from '../../../auth/src/role-manager/role-manager.service';
import { EventManagerService } from './event-manager.service';
import { EventCondition } from '@libs/shared/schemas/event/event.schema';

@Controller('event')
export class EventManagerController {
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin')
  // @Get('/profile')
  // getProfile(@Req() req) {
  //   return {
  //     message: `Hello ${req.user.username}, you're an ${req.user.role}`,
  //   };
  // }

  constructor(private eventManagerService: EventManagerService) {}

  @Get('/list')
  async getEventList(@Req() req) {
    // const test = await this.eventManagerService.getEventList();

    return this.eventManagerService.getEventList();
  }

  @Post('/event')
  async createEvent(
    @Req() req,
    @Body()
    body: {
      creatorEmail: string;
      title: string;
      conditions: EventCondition[];
      startDate: string;
      endDate: string;
    },
  ) {
    // const test = await this.eventManagerService.getEventList();

    return this.eventManagerService.createEvent(body);
  }

  @Post('/compensation')
  async createCompensation(
    @Req() req,
    @Body()
    body: {
      creatorEmail: string;
      eventId: string;
      title: string;
      type: string;
      value: number;
    },
  ) {
    // const test = await this.eventManagerService.getEventList();

    return this.eventManagerService.createCompensation(body);
  }

  @Post('/request-compensation')
  async requestCompensation(
    @Req() req,
    @Body()
    body: {
      requestEmail: string;
      eventId: string;
    },
  ) {
    return this.eventManagerService.requestCompensation(body);
  }

  @Get('/user/request-compensation')
  async getRequestCompensationUser(
    @Req() req,
    @Query('requestEmail') requestEmail,
  ) {
    return this.eventManagerService.getRequestCompensationUser(requestEmail);
  }

  @Get('/request-compensation')
  async getRequestCompensation(@Req() req) {
    return this.eventManagerService.getRequestCompensation();
  }
}
