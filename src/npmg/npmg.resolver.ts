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
import { Npmg } from './npmg';

@InputType()
class NewNpmg {
  @Field()
  name: string;

  @Field()
  mother: string;

  @Field()
  father: string;

  @Field()
  dob: string;

  @Field()
  family: string;

  @Field()
  isSilverBacked: boolean;

}

@Resolver(Npmg)
export class NpmgResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => Npmg, { nullable: true, name: 'getNpmg' })
  async family(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.npmg.findUnique({
      where: { id },
    });
  }

  @Mutation(returns => Npmg)
  async addNewFamily(@Args('data') data: NewNpmg, @Context() ctx) {
    return this.prismaService.npmg.create({
      data: {
        name: data.name,
        dob: data.dob,
        mother: data.mother,
        father: data.father,
        isSilverBacked: data.isSilverBacked,
        family: data.family,
      },
    });
  }
}
