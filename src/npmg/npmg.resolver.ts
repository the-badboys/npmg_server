import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { Npmg } from './dto/npmg';
import { NewNpmg } from './inputs/create.input';
import { UpdateNpmg } from './inputs/update.input';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

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
  @Mutation(returns => Npmg, { nullable: true, name: 'updateNpmg' })
  async updatenpmg(@Args('update') npmg: UpdateNpmg, @Context() ctx) {
    const m_npmg = await this.prismaService.npmg.findUnique({
      where: { id: npmg.data.mother },
    });
    if (!m_npmg) {
      return new UserInputError('Mother not found');
    }
    if(m_npmg.gender != "female"){
      return new UserInputError('Mother not female');
    }
    const f_npmg = await this.prismaService.npmg.findUnique({
      where: { id: npmg.data.father },
    });
    if (!f_npmg) {
      return new UserInputError('Father not found');
    }
    if(f_npmg.gender != "male"){
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
      data: {
        name: npmg.data.name,
        dob: npmg.data.dob,
        mother: npmg.data.mother,
        father: npmg.data.father,
        isSilverBacked: npmg.data.isSilverBacked,
        family: npmg.data.family,
        gender: npmg.data.gender,
      },
    });
  }
  @Mutation(returns => Npmg)
  async newNpmg(@Args('data') data: NewNpmg, @Context() ctx) {
    console.log(data);
    const nametaken = await this.prismaService.npmg.findUnique({
      where: { name: data.name },
    });

    if (nametaken) {
      return new UserInputError('Gorilla name taken');
    }
    if(data.mother){
      const m_npmg = await this.prismaService.npmg.findUnique({
        where: { id: data.mother },
      });
      if (!m_npmg ) {
        return new UserInputError('Mother not found');
      }
    }
    if(data.father){
      const m_npmg = await this.prismaService.npmg.findUnique({
        where: { id: data.father },
      });
      if (!m_npmg ) {
        return new UserInputError('Father not found');
      }
    }
    if(data.family){
      const m_npmg = await this.prismaService.families.findUnique({
        where: { id: data.family },
      });
      if (!m_npmg ) {
        return new UserInputError('Family not found');
      }
    }
    // if(data.family == ""){
    //   data.family = null;
    // }
    // if(data.mother =""){
    //   data.mother = null;
    // }
    // if(data.father =""){
    //   data.father = null;
    // }
    return this.prismaService.npmg.create({
      data: data
    });
    
  }

  @Mutation(returns => Npmg, { nullable: true, name: 'deleteNpmg' })
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
