import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hashPasswordHelper } from '@/helpers';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {name, email, password, phone, address, image} = createUserDto;

    const hashPassword = await hashPasswordHelper(password);

    const isEmailExist = await this.isEMailExist(email);
    if (isEmailExist) {
      throw new BadRequestException(`${email} has been existed! Please use another email`)
    }

    const newUser = await this.userModel.create({
      name, email, password: hashPassword, phone, address, image
    })

    return {
      _id: newUser._id
    };
  }

  async isEMailExist (email: string) {
    const user = await this.userModel.exists({email});
    return user ? true : false;
  }

  async findAll(query: string, current: number, pageSize: number) {
    const {filter, sort} = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const offset = (current - 1) * pageSize;

    const results = await this.userModel
    .find(filter)
    .limit(pageSize)
    .skip(offset)
    .sort(sort as any)

    return {
      results,
      totalPages
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({email});
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({_id: updateUserDto._id}, {...updateUserDto});
  }

  async remove(_id: string) {
    if (mongoose.isValidObjectId(_id)) {
      return await this.userModel.deleteOne({_id});
    }
    throw new BadRequestException('id format is not valid')
  }

  async register(createAuthDto: CreateAuthDto) {
    const {name, email, password} = createAuthDto;

    const hashPassword = await hashPasswordHelper(password);

    const isEmailExist = await this.isEMailExist(email);
    if (isEmailExist) {
      throw new BadRequestException(`${email} has been existed! Please use another email`)
    }

    const codeId = uuidv4();
    const newUser = await this.userModel.create({
      name, email, password: hashPassword, isActive: false, codeId: codeId, codeExpired: dayjs().add(30, 'minutes')
    })

    // send email
    this.mailerService
    .sendMail({
      to: newUser.email,
      subject: 'Activate your account',
      template: "register",
      context: {
        name: newUser?.name ?? newUser.email,
        activationCode: codeId
      }
    })

    // response
    return {
      _id: newUser._id
    };
  }
}
