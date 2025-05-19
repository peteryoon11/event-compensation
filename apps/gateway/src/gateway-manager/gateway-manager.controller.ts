import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GatewayManagerService } from './gateway-manager.service';
import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '@libs/shared/auth/roles.decorator';
import { RolesGuard } from '@libs/shared/auth/roles.guard';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { MemberRole } from '@libs/shared/constants/member/member-enum';
import { MemberCreateDto } from '@libs/shared/dtos/member.create.dto';
// import { Roles } from '../auth/roles.decorator';
// import { Roles } from '../auth/roles.decorator';

@Controller()
export class GatewayManagerController {
  constructor(
    private readonly httpService: HttpService,
    private gatewayService: GatewayManagerService,
  ) {
    this.AUTH_SERVER = 'http://localhost:3010';
    this.EVENT_SERVER = 'http://localhost:3020';
  }

  private readonly logger = new Logger(GatewayManagerController.name);

  private readonly AUTH_SERVER;
  private readonly EVENT_SERVER;

  @Post('create/user')
  async createMember(
    // @Body() body: { email: string; password: string; role: MemberRole },
    @Body() body: MemberCreateDto,
  ) {
    const URL = `${this.AUTH_SERVER}/auth/create/user`;
    console.log(`@@@@ gw url ${URL}`);

    try {
      const res$ = this.httpService
        .post(URL, {
          email: body.email,
          password: body.password,
          role: body.role,
        })
        .pipe(
          catchError((error) => {
            const msg =
              error?.response?.data?.message ||
              error.message ||
              'Unknown error';
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

  @Post('user/login')
  async login(@Body() body: { email: string; password: string }) {
    const URL = `${this.AUTH_SERVER}/auth/login`;
    console.log(`@@@@ url ${URL}`);

    try {
      const res$ = this.httpService
        .post(URL, {
          email: body.email,
          password: body.password,
        })
        .pipe(
          catchError((error) => {
            const msg =
              error?.response?.data?.message ||
              error.message ||
              'Unknown error';
            const status = error?.response?.status || 500;

            this.logger.error(
              `❌ External API Error: ${msg}`,
              JSON.stringify(error?.response?.data),
            );

            return throwError(() => new HttpException(msg, status));
          }),
        );
      const { data } = await lastValueFrom(res$);
      return data;
    } catch (err) {
      // 여기서도 NestJS 예외로 변환 가능
      this.logger.error(`❗ Failed to call external API: ${err.message}`);
      throw err;
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(MemberRole.ADMIN)
  @Roles(MemberRole.USER)
  // @Roles('admin')
  @Get('/profile')
  async getProfile(@Req() req) {
    const URL = `${this.AUTH_SERVER}/auth/profile`;
    console.log(`gw @@@@ url ${URL}`);
    const res$ = this.httpService.get(URL);
    const { data } = await lastValueFrom(res$);
    console.log(`data ${JSON.stringify(data, null, 2)}`);
    return data;
    // return {
    //   message: `Hello ${req.user.username}, you're an ${req.user.role}`,
    // };
  }
}
