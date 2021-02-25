import {
    Resolver,
    Query,
    Args,
    Mutation,
    Context,
  } from '@nestjs/graphql';
  import { Inject } from '@nestjs/common';
  import {NewReport} from './inputs/create.input'
  import {Report} from './dto/reports'
  import { PrismaService } from 'src/prisma.service';

@Resolver()
export class ReportsResolver {
    constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  @Query(returns => [Report], { nullable: true, name: 'getAllReports' })
  async allReports(@Context() ctx) {
    return this.prismaService.reports.findMany({});
  }
  @Query(returns => Report, { nullable: true, name: 'getReport' })
  async npmg(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.reports.findUnique({
      where: { id },
    });
  }
  @Mutation(returns => Report)
  async NewReport(@Args('data') data: NewReport, @Context() ctx) {
    return this.prismaService.reports.create({
      data: {
        gorilla: data.gorilla,
        date: data.date,
        reporter: data.reporter,
        lungs: data.lungs,
        legs: data.legs,
        head: data.head,
        stomach: data.stomach,
        eyes: data.eyes,
      },
    });
  }
  @Mutation(returns => Report, { nullable: true, name: 'deleteReport' })
  async delete(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.reports.delete({
      where: { id },
    });
  }
}
