import {
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
import { ROLES, User } from './user';
import { PrismaService } from 'src/prisma.service';
import { hash, validatePassword } from '../utils/hashPassword';
import { JwtService } from '@nestjs/jwt';
import { UserGuard } from './user.guard';

@InputType()
export class SingUpUserInput {
  @Field()
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
  email: string;

  @Field()
  password: string;
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

  //TODO: Get currently loggedin user

  @Query(returns => User, { nullable: true, name: 'me' })
  @UseGuards(UserGuard)
  async getLoggedIn(@Context() ctx) {
    console.log(ctx);
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
}
