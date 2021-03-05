import { Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
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
import { ROLES, User } from './user';
import { PrismaService } from 'src/prisma.service';
import { hash, validatePassword } from '../utils/hashPassword';
import { JwtService } from '@nestjs/jwt';
import { UserGuard } from './user.guard';
import { IsEmail, isEmpty, IsNotEmpty } from 'class-validator';
import { users } from '@prisma/client';

@InputType()
export class SingUpUserInput {
  @Field()
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
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      },
    });

    return updatedUser;
  }
}
