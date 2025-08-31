import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthHelper {
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
  }
}
