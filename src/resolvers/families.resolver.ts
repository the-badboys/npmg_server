import { Inject, UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { PrismaService } from 'src/prisma.service'
import { Family } from '../models/family'
import { NewFamily } from '../inputs/FamilyCreate.input'
import { UpdateFamily } from '../inputs/FamilyUpdate.input'
import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { UserGuard } from 'src/guards/user.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { ROLES } from 'src/models/user'

@Resolver(Family)
@UseGuards(UserGuard)
export class FamiliesResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => [Family], { nullable: true, name: 'getFamilies' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER, ROLES.USER)
  async families(@Context() ctx) {
    return this.prismaService.families.findMany({})
  }
  @Query(returns => Family, { nullable: true, name: 'getFamily' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER, ROLES.USER)
  async family(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.families.findUnique({
      where: { id },
    })
  }
  @Mutation(returns => Family, { nullable: true, name: 'updateFamily' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN)
  async updatefamily(@Args('update') family: UpdateFamily, @Context() ctx) {
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id: family.data.leader },
    })
    if (!npmg) {
      return new UserInputError('Leader not found')
    }
    return this.prismaService.families.update({
      where: {
        id: family.family_id,
      },
      data: family.data,
    })
  }

  @Mutation(returns => Family)
  @Roles(ROLES.DOCTOR, ROLES.ADMIN)
  async addNewFamily(@Args('data') data: NewFamily, @Context() ctx) {
    const fam_exists = await this.prismaService.families.findUnique({
      where: { family_name: data.family_name },
    })
    if (fam_exists) {
      return new UserInputError('Family name taken')
    }
    const leader_exists = await this.prismaService.families.findMany({
      where: { leader: data.leader },
    })
    if (leader_exists.length > 0) {
      return new UserInputError('Leader can not lead more than one family')
    }
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id: data.leader },
    })
    if (!npmg) {
      return new UserInputError('Gorilla not found')
    }
    return this.prismaService.families.create({
      data: data,
    })
  }
  @Mutation(returns => Family, { nullable: true, name: 'deleteFamily' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN)
  async delete(@Args('id') id: string, @Context() ctx) {
    const npmg = await this.prismaService.families.findUnique({
      where: { id },
    })
    if (!npmg) {
      return new UserInputError('Family to be deleted not found')
    }
    return this.prismaService.families.delete({
      where: { id },
    })
  }
}
