export class LoginForm {
  public constructor(init?: Partial<LoginForm>) {
    Object.assign(this, init);
  }
  user: string;
  pass: string;
}

export class UserForm {
  public constructor(init?: Partial<UserForm>) {
    Object.assign(this, init);
  }
  name: string;
  age: string;
  mail: string;
}
