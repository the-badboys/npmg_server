import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { User } from './dto/user';
import {SingUpUserInput} from './inputs/create.input';
import { PrismaService } from 'src/prisma.service';



@Resolver(User)
export class UsersResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => User, { nullable: true, name: 'getUser' })
  async user(@Args('id') id: string, @Context() ctx) {
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
