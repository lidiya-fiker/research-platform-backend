import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, LoginResponseDto, SignUpDto } from '../dto/auth.dto';

import { AuthHelper } from '../helper/auth.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly helper: AuthHelper,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { password, email } = signUpDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    const hashedPassword = this.helper.encodePassword(password);

    const newUser = this.userRepository.create({
      ...signUpDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (
      !user ||
      !(await this.helper.comparePassword(password, user.password))
    ) {
      throw new BadRequestException(' Invalid email or password');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token: LoginResponseDto = {
      access_token: await this.helper.generateAccessToken(payload),
      refresh_token: await this.helper.generateAccessToken(payload),
    };

    return token;
  }
}
