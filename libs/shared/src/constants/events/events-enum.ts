import { Compensation } from '@libs/shared/schemas/event/compensation.schema';

export enum EventConditionType {
  LOGIN_DAYS = 'LOGIN_DAYS',
  INVITE_FRIENDS = 'INVITE_FRIENDS',
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export enum RequestStatus {
  SUCCESS = 'SUCCESS',
  PRECESSING = 'PRECESSING',
  FAIL = 'FAIL',
}

export enum CompensationType {
  ITEM = 'ITEM',
  POINT = 'POINT',
  COUPON = 'COUPON',
}
