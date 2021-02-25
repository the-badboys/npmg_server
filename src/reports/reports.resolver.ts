import {
    Resolver,
    Query,
    Args,
    Mutation,
    Context,
  } from '@nestjs/graphql';
  import { Inject } from '@nestjs/common';
  import {NewReport} from './inputs/create.input'
  import {UpdateReport} from './inputs/update.input'
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
  @Query(returns => [Report],{name: "getDayReport"})
  async report_date(@Args('date') report: Date, @Context() ctx){
    return this.prismaService.reports.findMany({
      where: {
        date: report,
      },
    })
  }
  @Query(returns => [Report],{name: "getWeekReport"})
  async report_week(@Args('date') report: Date, @Context() ctx){
    return this.prismaService.reports.findMany({
      where: {
        date: report,
      },
    })
  }
  @Query(returns => [Report],{name: "getMonthReport"})
  async report_month(@Args('date') report: Date, @Context() ctx){
    return this.prismaService.reports.findMany({
      where: {
        date: report,
      },
    })
  }
  @Mutation(returns => Report, { nullable: true, name: 'updateNpmg' })
  async updatenpmg(@Args('report_update') report: UpdateReport, @Context() ctx) {
    return this.prismaService.reports.update({
      where: {
        id: report.report_id,
      },
      data: {
        gorilla: report.data.gorilla,
        date: report.data.date,
        reporter: report.data.reporter,
        lungs: report.data.lungs,
        legs: report.data.legs,
        head: report.data.head,
        stomach: report.data.stomach,
        eyes: report.data.eyes,
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
