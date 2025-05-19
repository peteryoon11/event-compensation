export class MemberLoginDto {
  email: string;
  password: string;

  constructor(params?: Partial<MemberLoginDto>) {
    Object.assign(this, params);
  }
}
