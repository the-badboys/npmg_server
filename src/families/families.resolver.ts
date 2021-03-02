import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { Family } from './dto/family';
import {NewFamily} from './inputs/create.input'
import {UpdateFamily} from './inputs/update.input'
import {AuthenticationError, UserInputError} from 'apollo-server-express'

@Resolver(Family)
export class FamiliesResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => [Family], { nullable: true, name: 'getFamilies' })
  async families(@Context() ctx) {
    return this.prismaService.families.findMany({});
  }
  @Query(returns => Family, { nullable: true, name: 'getFamily' })
  async family(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.families.findUnique({
      where: { id },
    });
  }
  @Mutation(returns => Family, { nullable: true, name: 'updateFamily' })
  async updatefamily(@Args('update') family: UpdateFamily, @Context() ctx) {
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id:family.data.leader },
    });
    if(!npmg){
      return new UserInputError("Leader not found")
    }
    return this.prismaService.families.update({
      where: {
        id: family.family_id,
      },
      data:family.data
    });
  }

  @Mutation(returns => Family)
  async addNewFamily(@Args('data') data: NewFamily, @Context() ctx) {
    const fam_exists = await this.prismaService.families.findUnique({
      where: { family_name: data.family_name },
    });
    if(fam_exists){
      return new UserInputError("Family name taken")
    }
    const leader_exists = await this.prismaService.families.findMany({
      where: { leader: data.leader },
    });
    if(leader_exists.length > 0){
      return new UserInputError("Leader can not lead more than one family")
    }
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id:data.leader },
    });
    if(!npmg){
      return new UserInputError("Gorilla not found")
    }
    return this.prismaService.families.create({
      data: data
    });
  }
  @Mutation(returns => Family, { nullable: true, name: 'deleteFamily' })
  async delete(@Args('id') id: string, @Context() ctx) {
    const npmg = await this.prismaService.families.findUnique({
      where: { id },
    });
    if(!npmg){
      return new UserInputError("Family to be deleted not found")
    }
    return this.prismaService.families.delete({
      where: { id },
    });
  }
}
