import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  Context,
  InputType,
  Field,
} from '@nestjs/graphql';
import { ROLES, User } from './user';
import { PrismaService } from 'src/prisma.service';

@InputType()
class SingUpUserInput {
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
  async user(@Args('id') id: number, @Context() ctx) {
    return this.prismaService.users.findUnique({
      where: { id },
    });
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
