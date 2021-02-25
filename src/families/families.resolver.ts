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
import { PrismaService } from 'src/prisma.service';
import { Family } from './family';

@InputType()
class NewFamily {
  @Field()
  family_name: string;

  @Field()
  leader: string;

}

@Resolver(Family)
export class FamiliesResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

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
