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
import { User } from './user';
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

  @Field()
  role: string;
}

@Resolver(User)
export class UsersResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => User, { nullable: true, name: 'getUser' })
  async user(@Args('id') id: number, @Context() ctx): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  @Mutation(returns => User)
  async signup(
    @Args('data') data: SingUpUserInput,
    @Context() ctx,
  ): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email: data.email,
        lastName: data.lastName,
        firstName: data.lastName,
        password: data.password,
        role: 'USER',
      },
    });
  }

  // @Query(User, { name: 'getUsers', nullable: true })
  // getusers() {
  //   return this.userService.getusers();
  // }

  // @Query(() => User, { name: 'user', nullable: true })
  // getUser(@Args() getUserArgs: GetUserArgs): User {
  //   return this.userService.getUser(getUserArgs);
  // }

  // @Query(() => [User], { name: 'users', nullable: 'items' })
  // getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
  //   return this.userService.getUsers(getUsersArgs);
  // }

  // @Mutation(() => User)
  // createUser(@Args('createUserData') createUserData: CreateUserInput): User {
  //   return this.userService.createUser(createUserData);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): User {
  //   return this.userService.updateUser(updateUserData);
  // }

  // @Mutation(() => User)
  // deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
  //   return this.userService.deleteUser(deleteUserData);
  // }
}
