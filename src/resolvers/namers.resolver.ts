import { Inject, UseGuards } from '@nestjs/common';
import { Namer } from '../models/namers';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { NewNamer } from '../inputs/NamerCreate.input';
import { UpdateNamer } from '../inputs/NamerUpdate.input';
import { UserGuard } from 'src/guards/user.guard';
import { Roles } from 'src/roles.decorator';
import { ROLES } from 'src/models/user';

@Resolver(Namer)
@UseGuards(UserGuard)
export class NamersResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  @Query(returns => [Namer], { nullable: true, name: 'getNamers' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER, ROLES.USER)
  async namers(@Context() ctx) {
    return this.prismaService.namers.findMany({});
  }
  @Query(returns => Namer, { nullable: true, name: 'getNamer' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER, ROLES.USER)
  async namer(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.namers.findUnique({
      where: { id },
    });
  }
  @Query(returns => [Namer], { nullable: true, name: 'getCeremonyNamers' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER, ROLES.USER)
  async namersinYear(@Args('id') id: string, @Context() ctx) {
    return await this.prismaService.namers.findMany({
      where: { ceremonyId: id },
    })[0];
  }
  @Mutation(returns => Namer)
  @Roles(ROLES.ADMIN)
  async addNewNamer(@Args('data') data: NewNamer, @Context() ctx) {
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id: data.gorilla },
    });
    if (!npmg) {
      return new UserInputError('Gorilla not found');
    }
    return this.prismaService.namers.create({
      data: data,
    });
  }
  @Mutation(returns => Namer, { nullable: true, name: 'updateNamer' })
  async updatenamer(@Args('update') namer: UpdateNamer, @Context() ctx) {
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id: namer.data.gorilla },
    });
    if (!npmg) {
      return new UserInputError('Gorilla not found');
    }
    return this.prismaService.namers.update({
      where: {
        id: namer.namer_id,
      },
      data: namer.data,
    });
  }

  @Mutation(returns => Namer, { nullable: true, name: 'deleteNamer' })
  @Roles(ROLES.ADMIN)
  async delete(@Args('id') id: string, @Context() ctx) {
    const npmg = await this.prismaService.namers.findUnique({
      where: { id },
    });
    if (!npmg) {
      return new UserInputError('Namer to be deleted not found');
    }
    return this.prismaService.namers.delete({
      where: { id },
    });
  }
}
