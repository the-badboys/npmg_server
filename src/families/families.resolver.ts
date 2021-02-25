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

  @Mutation(returns => Family)
  async addNewFamily(@Args('data') data: NewFamily, @Context() ctx) {
    return this.prismaService.families.create({
      data: {
        leader: data.leader,
        family_name: data.family_name,
        
      },
    });
  }
}
