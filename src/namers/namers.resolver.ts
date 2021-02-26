import { Inject } from '@nestjs/common';
import { Namer } from './dto/namers';
import {AuthenticationError, UserInputError} from 'apollo-server-express'
import {
    Resolver,
    Query,
    Args,
    Mutation,
    Context,
  } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { NewNamer } from './input/create.input';
import { UpdateNamer } from './input/update.input';

@Resolver(Namer)
export class NamersResolver {
    constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
    @Query(returns => [Namer], { nullable: true, name: 'getNamers' })
  async namers(@Context() ctx) {
    return this.prismaService.namers.findMany({});
  }
  @Query(returns => Namer, { nullable: true, name: 'getNamer' })
  async namer(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.namers.findUnique({
      where: { id },
    });
  }
  @Query(returns => [Namer], { nullable: true, name: 'getYearNamers' })
  async namersinYear(@Args('year') year: string, @Context() ctx) {
    return this.prismaService.namers.findUnique({
      where: { id: year },
    });
  }
  @Mutation(returns => [Namer])
  async addNewNamer(@Args('data') data: NewNamer, @Context() ctx) {
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id:data.gorilla },
    });
    if(!npmg){
      return new UserInputError("Gorilla not found")
    }
    return this.prismaService.namers.create({
      data: {
        gorilla: data.gorilla,
        year: data.year,
        fullname: data.fullname,
        isCompleted: data.isCompleted,
        comment: data.comment
      },
    });
  }
  @Mutation(returns => Namer, { nullable: true, name: 'updateNamer' })
  async updatenamer(@Args('update') namer: UpdateNamer, @Context() ctx) {
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id:namer.data.gorilla },
    });
    if(!npmg){
      return new UserInputError("Gorilla not found")
    }
    return this.prismaService.namers.update({
      where: {
        id: namer.namer_id,
      },
      data: {
        gorilla: namer.data.gorilla,
        year: namer.data.year,
        fullname: namer.data.fullname,
        isCompleted: namer.data.isCompleted,
        comment: namer.data.comment
      },
    });
  }

  @Mutation(returns => Namer, { nullable: true, name: 'deleteNamer' })
  async delete(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.namers.delete({
      where: { id },
    });
  }
}
