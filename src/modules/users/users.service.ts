import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import aqp from 'api-query-params';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';
import { Users } from '@/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole, UserStatus } from '@/enums';
import { HashingPasswordProvider } from '@/common/providers/hashing-password.provider';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly mailerService: MailerService,
    private readonly hashingPasswordProvider: HashingPasswordProvider
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {name, email, password, phone, address, image} = createUserDto;

    const hashPassword = await this.hashingPasswordProvider.hashPasswordHelper(password);

    const isEmailExist = await this.isEMailExist(email);
    if (isEmailExist) {
      throw new BadRequestException(`${email} has been existed! Please use another email`)
    }

    const newUser = new Users();
    newUser.email = email;
    newUser.password = hashPassword;
    const savedUser = await this.usersRepository.save(newUser);

    return {
      id: savedUser.id
    };
  }

  async isEMailExist (email: string) {
    const user = await this.usersRepository.exists({ where: { email: email } });
    return user ? true : false;
  }

  async findAll(query: string, current: number, pageSize: number) {
    const {filter, sort} = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.usersRepository.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const offset = (current - 1) * pageSize;

    const results = await this.usersRepository
    .find(filter)
    // .limit(pageSize)
    // .skip(offset)
    // .sort(sort as any)

    return {
      results,
      totalPages
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async getUserById(id : number) {
    return await this.usersRepository.findOne({where: { id }});
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({where: { email }});
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update({id: updateUserDto.id}, {...updateUserDto});
  }

  async remove(id: number) {
    // if (mongoose.isValidObjectId(id)) {
    //   return await this.usersRepository.deleteOne({id});
    // }
    throw new BadRequestException('id format is not valid')
  }

  async register(createAuthDto: CreateAuthDto) {
    const {email, password, first_name, last_name, phone_number} = createAuthDto;

    const isEmailExist = await this.isEMailExist(email);
    if (isEmailExist) {
      throw new BadRequestException(`${email} has been existed! Please use another email!`)
    }

    const hashPassword = await this.hashingPasswordProvider.hashPasswordHelper(password);
    const codeId = uuidv4();
    const newUser = new Users();
    newUser.email = email;
    newUser.password = hashPassword;
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.phone_number = phone_number;
    newUser.role = UserRole.USER;
    newUser.status = UserStatus.PENDING;
    newUser.codeId = codeId;
    newUser.codeExpired = dayjs().add(30, 'minutes').toDate();
    const savedUser = await this.usersRepository.save(newUser);

    this.mailerService
    .sendMail({
      to: savedUser.email,
      subject: 'Activate your account',
      template: "register",
      context: {
        name: savedUser.first_name && savedUser.last_name ? `${savedUser.first_name} ${savedUser.last_name}` : savedUser.email,
        activationCode: codeId
      }
    })

    return {
      status: 'success',
      message: 'Created an account successfully!',
      data: {
        id: savedUser.id
      }
    };
  }

  async activateAccount(code: string, id: number) {
    const user = await this.usersRepository.findOne({where: {id}});
    if (!user) {
      throw new BadRequestException('This account is not exist!') 
    }

    const isCodeValid = new Date() < user.codeExpired;
    if (isCodeValid) {
      if (code == user.codeId) {
        await this.usersRepository.update({id}, {status: UserStatus.ACTIVE});
        return {
          status: 'success',
          message: 'Your account has been active!!'
        }
      } else {
        throw new BadRequestException('Code active is not correct!') 
      }
    } else {
      throw new BadRequestException('Code active has been expired! Please get another code!') 
    }
  }

  async forgotPassword(email: string) {
    const isEmailExist = await this.isEMailExist(email);
    if (!isEmailExist) {
      throw new BadRequestException(`${email} has not been existed! Please use another email!`)
    }

    const user = await this.usersRepository.findOne({where: {email}});
    if (!user) {
      throw new BadRequestException('This account is not exist!') 
    }

    const codeId = uuidv4();
    const hashPassword = await this.hashingPasswordProvider.hashPasswordHelper(codeId);
    await this.usersRepository.update({id: user.id}, {password: hashPassword});

    this.mailerService
    .sendMail({
      to: user.email,
      subject: 'Temp password',
      template: "forgot-password",
      context: {
        name: user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email,
        tempPassword: codeId
      }
    })

    return {
      status: 'success',
      message: 'Your temp password will be send to your email!'
    }
  }
}
