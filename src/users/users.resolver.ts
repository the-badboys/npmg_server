import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  Context,
  Field,
  InputType,
} from '@nestjs/graphql';
import { ROLES, User } from './user';
import { PrismaService } from 'src/prisma.service';

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

@Resolver(User)
export class UsersResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => User, { nullable: true, name: 'getUser' })
  async user(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.users.findUnique({
      where: { id },
    });
  }

  //TODO: Handle login of the users
  @Mutation(resturns => String, { nullable: false, name: 'login' })
  async loginUser(@Args('id') id: string, @Context() ctx) {}

  //TODO: Get currently loggedin user
  @Query(returns => User, { nullable: true, name: 'me' })
  async getLoggedIn(@Context() ctx) {
    console.log(ctx);
  }

  @Mutation(returns => User)
  async signup(@Args('data') data: SingUpUserInput, @Context() ctx) {
    return this.prismaService.users.create({
      data: {
        email: data.email,
        lastName: data.lastName,
        firstName: data.lastName,
        password: data.password,
        role: data.role,
      },
    });
  }
}
