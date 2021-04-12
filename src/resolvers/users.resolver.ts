import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  Context,
  Field,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import { ROLES, User } from '../models/user';
import { PrismaService } from 'src/prisma.service';
import { hash, validatePassword } from '../utils/hashPassword';
import { JwtService } from '@nestjs/jwt';
import { UserGuard } from '../guards/user.guard';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { users } from '@prisma/client';
import { Roles } from '../roles.decorator';
import * as bcrypt from 'bcrypt';

@InputType()
export class SingUpUserInput {
  @IsEmail()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field(type => ROLES)
  role: ROLES;
}

@InputType()
export class LoginUserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  role: ROLES;
}

@InputType()
export class updatePasswordInput {
  @Field()
  currentPassword: string;

  @Field(type => String)
  @IsNotEmpty()
  newPassword: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;
}

@Resolver(User)
export class UsersResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  @Query(returns => User, { nullable: true, name: 'getUser' })
  async user(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.users.findUnique({
      where: { id },
    });
  }

  @Mutation(returns => LoginResponse, { name: 'login' })
  async loginUser(@Args('data') data: LoginUserInput, @Context() ctx) {
    const findUser = await this.prismaService.users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!findUser) {
      throw new UnauthorizedException('Invalid email or password');
    }

    let doPasswordsMatch = await validatePassword(
      data.password,
      findUser.password,
    );

    if (!doPasswordsMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    let token = this.jwtService.sign(findUser);

    return { token };
  }

  @Query(returns => User, { nullable: true, name: 'me' })
  @UseGuards(UserGuard)
  async getLoggedIn(@Context() ctx) {
    return ctx.user;
  }

  @Mutation(returns => User)
  async signup(@Args('data') data: SingUpUserInput, @Context() ctx) {
    const checkUserExists = await this.prismaService.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (checkUserExists) {
      throw new HttpException('Email already Exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(data.password);

    return this.prismaService.users.create({
      data: {
        email: data.email,
        lastName: data.lastName,
        firstName: data.lastName,
        password: hashedPassword,
        role: data.role,
      },
    });
  }

  @Mutation(returns => User, { name: 'updateUser' })
  @UseGuards(UserGuard)
  async updateUser(
    @Args('data') data: UpdateUserInput,
    @Context() ctx,
  ): Promise<users> {
    const updatedUser = await this.prismaService.users.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        ...data,
      },
    });

    return updatedUser;
  }

  @Mutation(returns => User, { name: 'updateUserPassword' })
  @UseGuards(UserGuard)
  async updateUserPassword(
    @Args('data') data: updatePasswordInput,
    @Context() ctx,
  ) {
    const checkPassword = await bcrypt.compare(
      data.currentPassword,
      ctx.user.password,
    );

    if (!checkPassword) {
      throw new ForbiddenException('Password mismatch');
    }

    const updatedUser = await this.prismaService.users.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        password: await hash(data.newPassword),
      },
    });
    return updatedUser;
  }

  @Mutation(returns => User, { name: 'deleteUser' })
  @UseGuards(UserGuard)
  @Roles(ROLES.ADMIN)
  async deleteUser(@Args('id') id: string, @Context() ctx) {
    const deleteUser = await this.prismaService.users.delete({
      where: {
        id,
      },
    });
    return deleteUser;
  }
}
