import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GatewayManagerService } from './gateway-manager.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@libs/shared/auth/roles.decorator';
import { RolesGuard } from '@libs/shared/auth/roles.guard';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { MemberRole } from '@libs/shared/constants/member/member-enum';
import { MemberCreateDto } from '@libs/shared/dtos/member.create.dto';
import { AdminMemberCreateDto } from '@libs/shared/dtos/admin.member.create.dto';
import { EventCondition } from '@libs/shared/schemas/event/event.schema';
import { CompensationType } from '@libs/shared/constants/events/events-enum';

@Controller()
export class GatewayManagerController {
  constructor(
    private readonly httpService: HttpService,
    private gatewayService: GatewayManagerService,
  ) {
    this.AUTH_SERVER = 'http://localhost:3010/auth';
    this.EVENT_SERVER = 'http://localhost:3020/event';
  }

  private readonly logger = new Logger(GatewayManagerController.name);

  private readonly AUTH_SERVER;
  private readonly EVENT_SERVER;

  async postTryCatch({ receiveData, URL }: { receiveData: any; URL: string }) {
    try {
      const res$ = this.httpService.post(URL, receiveData).pipe(
        catchError((error) => {
          const msg =
            error?.response?.data?.message || error.message || 'Unknown error';
          const status = error?.response?.status || 500;

          this.logger.error(
            `❌ External API Error: ${msg}`,
            JSON.stringify(error?.response?.data),
          );

          return throwError(() => new HttpException(msg, status));
        }),
      );
      const { data } = await lastValueFrom(res$);
      console.log(`data  ${JSON.stringify(data, null, 2)}`);
      return data;
    } catch (err) {
      // 여기서도 NestJS 예외로 변환 가능
      this.logger.error(`❗ Failed to call external API: ${err.message}`);
      throw err;
    }
  }
  async getTryCatch(URL: string) {
    try {
      const res$ = this.httpService.get(URL).pipe(
        catchError((error) => {
          const msg =
            error?.response?.data?.message || error.message || 'Unknown error';
          const status = error?.response?.status || 500;

          this.logger.error(
            `❌ External API Error: ${msg}`,
            JSON.stringify(error?.response?.data),
          );

          return throwError(() => new HttpException(msg, status));
        }),
      );
      const { data } = await lastValueFrom(res$);
      console.log(`data  ${JSON.stringify(data, null, 2)}`);
      return data;
    } catch (err) {
      // 여기서도 NestJS 예외로 변환 가능
      this.logger.error(`❗ Failed to call external API: ${err.message}`);
      throw err;
    }
  }

  @Post('create/user')
  async createMember(
    // @Body() body: { email: string; password: string; role: MemberRole },
    @Body() body: MemberCreateDto,
  ) {
    const URL = `${this.AUTH_SERVER}/create/user`;
    console.log(`@@@@ gw create/user url ${URL}`);
    console.log(`@@@@ gw create/user body ${JSON.stringify(body)}`);
    return await this.postTryCatch({
      receiveData: {
        email: body.email,
        password: body.password,
        role: MemberRole.USER,
      },
      URL,
    });
  }

  // admin 유저는 admin 만 생성 가능.
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(MemberRole.ADMIN)
  @Post('create/admin/user')
  async createAdminMember(@Body() body: AdminMemberCreateDto) {
    const URL = `${this.AUTH_SERVER}/create/admin/user`;
    console.log(`@@@@ gw url ${URL}`);
    return await this.postTryCatch({
      receiveData: {
        email: body.email,
        password: body.password,
        role: body.role,
      },
      URL,
    });
  }

  @Post('user/login')
  async login(@Body() body: { email: string; password: string }) {
    const URL = `${this.AUTH_SERVER}/login`;
    console.log(`@@@@ url ${URL}`);
    return await this.postTryCatch({
      receiveData: {
        email: body.email,
        password: body.password,
      },
      URL,
    });
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(MemberRole.USER, MemberRole.ADMIN)
  @Get('/profile')
  async getProfile(@Req() req) {
    const URL = `${this.AUTH_SERVER}/profile`;
    console.log(`gw @@@@ url ${URL}`);

    return await this.getTryCatch(URL);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(MemberRole.OPERATOR, MemberRole.ADMIN)
  @Get('/events')
  async getEvent(@Req() req) {
    const URL = `${this.EVENT_SERVER}/list`;
    console.log(`gw @@@@ url ${URL}`);

    return await this.getTryCatch(URL);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(MemberRole.OPERATOR, MemberRole.ADMIN)
  @Post('/events')
  async createEvent(
    @Req() req,
    @Body()
    body: {
      title: string;
      conditions: EventCondition[];
      startDate: string;
      endDate: string;
    },
  ) {
    const URL = `${this.EVENT_SERVER}/event`;
    console.log(`gw @@@@ url ${URL}`);

    return await this.postTryCatch({
      URL,
      receiveData: {
        creatorEmail: req.user.email,
        title: body.title,
        conditions: body.conditions,
        startDate: body.startDate,
        endDate: body.endDate,
      },
    });
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(MemberRole.OPERATOR, MemberRole.ADMIN)
  @Post('/compensation')
  async createCompensation(
    @Req() req,
    @Body()
    body: {
      eventId: string;
      title: string;
      type: CompensationType;
      value: number;
    },
  ) {
    const URL = `${this.EVENT_SERVER}/compensation`;
    console.log(`gw @@@@ url ${URL}`);

    return await this.postTryCatch({
      URL,
      receiveData: {
        creatorEmail: req.user.email,
        eventId: body.eventId,
        title: body.title,
        type: body.type,
        value: body.value,
      },
    });
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(MemberRole.USER)
  @Roles(MemberRole.USER, MemberRole.ADMIN)
  @Post('/request-compensation')
  async requestCompensation(
    @Req() req,
    @Body()
    body: {
      eventId: string;
    },
  ) {
    const URL = `${this.EVENT_SERVER}/request-compensation`;
    console.log(`gw @@@@ url ${URL}`);

    return await this.postTryCatch({
      URL,
      receiveData: {
        requestEmail: req.user.email,
        eventId: body.eventId,
      },
    });
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(MemberRole.USER, MemberRole.ADMIN)
  @Get('/user/request-compensation')
  async getRequestCompensationUser(@Req() req) {
    const URL = `${this.EVENT_SERVER}/user/request-compensation?requestEmail=${req.user.email}`;
    console.log(`gw @@@@ url ${URL}`);

    return await this.getTryCatch(URL);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(MemberRole.ADMIN, MemberRole.AUDITOR, MemberRole.OPERATOR)
  @Get('/request-compensation')
  async getRequestCompensation(@Req() req, @Query('eventId') eventId: string) {
    const URL = `${this.EVENT_SERVER}/request-compensation?eventId=${eventId}`;
    console.log(`gw @@@@ url ${URL}`);

    return await this.getTryCatch(URL);
  }
}
