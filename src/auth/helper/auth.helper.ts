import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthHelper {
  constructor(private readonly jwtService: JwtService) {}
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
  }
  public comparePassword(password: string, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  public generateAccessToken(payload: any) {
    return this.jwtService.signAsync(
      { payload },
      {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
      },
    );
  }

  public generateRefreshToken(payload: any) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
    });
  }
}
