import { HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Roles } from 'src/users/roles.decorator';
import { ROLES } from 'src/users/user';
import { UserGuard } from 'src/users/user.guard';
import { groups } from './groups';

@InputType()
class NewGroupsInput {
  @Field()
  name: string;

  @Field()
  leaderId: string;
}

@Resolver(groups)
@UseGuards(UserGuard)
export class GroupsResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(() => groups, { name: 'getAllRangersGroups' })
  async getAllGroups(@Context() ctx) {
    return this.prismaService.rangerGroups.findMany();
  }

  @Query(() => groups, { name: 'getRangerGroup' })
  async getGroup(@Args('id') id: string) {
    return this.prismaService.rangerGroups.findFirst({
      where: {
        id,
      },
    });
  }

  @Mutation(() => groups, { name: 'createNewRangerGroup' })
  @Roles(ROLES.RANGER, ROLES.ADMIN)
  async newGroup(@Args('data') data: NewGroupsInput) {
    const checkIfRanger = await this.prismaService.users.findFirst({
      where: {
        id: data.leaderId,
      },
    });

    if (!checkIfRanger || checkIfRanger.role !== 'RANGER') {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Ranger not found',
        },
        403,
      );
    }

    const newGroup = await this.prismaService.rangerGroups.create({
      data,
    });
    return newGroup;
  }

  @Mutation(() => groups, { name: 'updateRangeGroup' })
  async updateRangeGroup(@Args('data') data: NewGroupsInput, @Context() ctx) {
    const newGroup = this.prismaService.rangerGroups.update({
      where: {
        id: ctx.user.id,
      },
      data,
    });
  }

  @Mutation(() => groups, { name: 'deleteRangerGroup' })
  @Roles(ROLES.ADMIN)
  async deleteRangerGroup(@Args('id') id: string) {
    const toDelete = this.prismaService.rangerGroups.delete({
      where: {
        id,
      },
    });
    return toDelete;
  }
}
