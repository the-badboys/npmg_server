import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { Npmg } from '../models/npmg';
import { NewNpmg } from '../inputs/NpmgCreate.input';
import { UpdateNpmg } from '../inputs/NpmgUpdate.input';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { UserGuard } from 'src/guards/user.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/models/user';

@Resolver(Npmg)
@UseGuards(UserGuard)
export class NpmgResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  @Query(returns => [Npmg], { nullable: true, name: 'getAllNpmg' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER, ROLES.USER)
  async allNpmg(@Context() ctx) {
    return this.prismaService.npmg.findMany({});
  }
  @Query(returns => Npmg, { nullable: true, name: 'getNpmg' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER, ROLES.USER)
  async npmg(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.npmg.findUnique({
      where: { id },
    });
  }
  @Mutation(returns => Npmg, { nullable: true, name: 'updateNpmg' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN)
  async updatenpmg(@Args('update') npmg: UpdateNpmg, @Context() ctx) {
    const m_npmg = await this.prismaService.npmg.findUnique({
      where: { id: npmg.data.mother },
    });
    if (!m_npmg) {
      return new UserInputError('Mother not found');
    }
    if (m_npmg.gender != 'female') {
      return new UserInputError('Mother not female');
    }
    const f_npmg = await this.prismaService.npmg.findUnique({
      where: { id: npmg.data.father },
    });
    if (!f_npmg) {
      return new UserInputError('Father not found');
    }
    if (f_npmg.gender != 'male') {
      return new UserInputError('Father not male');
    }
    const family = await this.prismaService.families.findUnique({
      where: { id: npmg.data.family },
    });
    if (!family) {
      return new UserInputError('Family not found');
    }
    return this.prismaService.npmg.update({
      where: {
        id: npmg.npmg_id,
      },
      data: npmg.data,
    });
  }
  @Mutation(returns => Npmg)
  @Roles(ROLES.DOCTOR, ROLES.ADMIN)
  async newNpmg(@Args('data') data: NewNpmg, @Context() ctx) {
    const nametaken = await this.prismaService.npmg.findUnique({
      where: { name: data.name },
    });

    if (nametaken) {
      return new UserInputError('Gorilla name taken');
    }
    if (data.mother) {
      const m_npmg = await this.prismaService.npmg.findUnique({
        where: { id: data.mother },
      });
      if (!m_npmg) {
        return new UserInputError('Mother not found');
      }
    }
    if (data.father) {
      const m_npmg = await this.prismaService.npmg.findUnique({
        where: { id: data.father },
      });
      if (!m_npmg) {
        return new UserInputError('Father not found');
      }
    }
    if (data.family) {
      const m_npmg = await this.prismaService.families.findUnique({
        where: { id: data.family },
      });
      if (!m_npmg) {
        return new UserInputError('Family not found');
      }
    }
    const ceremony = await this.prismaService.ceremonies.findUnique({
      where: {
        id: data.ceremonyId,
      },
    });
    if (!ceremony) {
      return new UserInputError('Ceremony not found');
    }
    return this.prismaService.npmg.create({
      data: data,
    });
  }

  @Mutation(returns => Npmg, { nullable: true, name: 'deleteNpmg' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN)
  async delete(@Args('id') id: string, @Context() ctx) {
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id },
    });
    if (!npmg) {
      return new UserInputError('Gorilla to be deleted not found');
    }
    return this.prismaService.npmg.delete({
      where: { id },
    });
  }
}
