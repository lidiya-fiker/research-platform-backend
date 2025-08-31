import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Auth, Repository } from 'typeorm';
import { promises } from 'dns';
import { SignUpDto } from '../dto/auth.dto';

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
}
