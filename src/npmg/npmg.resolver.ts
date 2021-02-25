import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { Npmg } from './dto/npmg';
import {NewNpmg} from './inputs/create.input'


@Resolver(Npmg)
export class NpmgResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  @Query(returns => [Npmg], { nullable: true, name: 'getAllNpmg' })
  async allNpmg(@Context() ctx) {
    return this.prismaService.npmg.findMany({});
  }
  @Query(returns => Npmg, { nullable: true, name: 'getNpmg' })
  async npmg(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.npmg.findUnique({
      where: { id },
    });
  }

  @Mutation(returns => Npmg)
  async newNpmg(@Args('data') data: NewNpmg, @Context() ctx) {
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
