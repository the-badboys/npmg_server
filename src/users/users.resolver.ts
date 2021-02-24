import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './user';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';

@Resolver(User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
    @Inject(PrismaService) private prismaService: PrismaService,
  ) {}

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
