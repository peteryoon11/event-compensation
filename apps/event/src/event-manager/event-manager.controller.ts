import { Controller, Get, Req, UseGuards } from '@nestjs/common';

@Controller()
export class EventManagerController {
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin')
  // @Get('/profile')
  // getProfile(@Req() req) {
  //   return {
  //     message: `Hello ${req.user.username}, you're an ${req.user.role}`,
  //   };
  // }
}
