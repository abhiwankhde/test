import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { };

  async login(createAuthDto: CreateAuthDto) {
    const isExist = await this.prisma.user.findUnique({
      where: {
        email: createAuthDto.email
      }
    })
    if (!isExist)
      new HttpException("User Not found", HttpStatus.NOT_FOUND)
    
      const passCorret = bcrypt.compareAsync(isExist.email, createAuthDto.password)
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
