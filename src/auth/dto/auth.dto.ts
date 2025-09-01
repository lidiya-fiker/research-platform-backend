import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'password must be at least 6 character',
  })
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginResponseDto {
  public access_token: string;
  public refresh_token: string;
}
