import {
    Resolver,
    Query,
    Args,
    Mutation,
    Context,
  } from '@nestjs/graphql';
  import { Inject, UseGuards } from '@nestjs/common';
  import {NewReport} from './inputs/create.input'
  import {UpdateReport} from './inputs/update.input'
  import {Report} from './dto/reports'
  import { PrismaService } from 'src/prisma.service';
  import {UserInputError} from 'apollo-server-express'
import { DateRange } from 'src/attendance/inputs/date.input';
import { UserGuard } from 'src/users/user.guard';
import { Roles } from 'src/users/roles.decorator';
import { ROLES } from 'src/users/user';

@Resolver()
@UseGuards(UserGuard)
export class ReportsResolver {
    constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  @Query(returns => [Report], { nullable: true, name: 'getAllReports' })
  @Roles(ROLES.DOCTOR,ROLES.ADMIN)
  async allReports(@Context() ctx) {
    return this.prismaService.reports.findMany({});
  }
  @Query(returns => Report, { nullable: true, name: 'getReport' })
  @Roles(ROLES.DOCTOR,ROLES.ADMIN)
  async npmg(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.reports.findUnique({
      where: { id },
    });
  }
  @Mutation(returns => Report)
  @Roles(ROLES.DOCTOR,ROLES.RANGER)
  async NewReport(@Args('data') data: NewReport, @Context() ctx) {
    data.reporter = ctx.user.id;
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id:data.gorilla },
    });
    if(!npmg){
      return new UserInputError("Gorilla not found")
    }
    return this.prismaService.reports.create({
      data: data
    });
  }
  @Query(returns => [Report],{name: "getDayReport"})
  @Roles(ROLES.DOCTOR,ROLES.ADMIN)
  async report_date(@Args('date') report: Date, @Context() ctx){
    return this.prismaService.reports.findMany({
      where: {
        date: report,
      },
    })
  }
  @Query(returns => [Report],{name: "getTimeRangeReport"})
  @Roles(ROLES.DOCTOR,ROLES.ADMIN)
  async report_month(@Args('date') report: DateRange, @Context() ctx){
    return this.prismaService.reports.findMany({
      where: {
        date: {
          gt: report.start,
          lt: report.end,
      },
      },
    })
  }
  @Mutation(returns => Report, { nullable: true, name: 'updateReport' })
  @Roles(ROLES.DOCTOR,ROLES.RANGER)
  async updatenpmgreport(@Args('report_update') report: UpdateReport, @Context() ctx) {
    report.data.reporter = ctx.user.id;
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id:report.data.gorilla },
    });
    if(!npmg){
      return new UserInputError("Gorilla not found")
    }
    return this.prismaService.reports.update({
      where: {
        id: report.report_id,
      },
      data: report.data
    });
  }
  @Mutation(returns => Report, { nullable: true, name: 'deleteReport' })
  @Roles(ROLES.ADMIN)
  async delete(@Args('id') id: string, @Context() ctx) {
    const npmg = await this.prismaService.reports.findUnique({
      where: { id },
    });
    if(!npmg){
      return new UserInputError("Report to be deleted not found")
    }
    return this.prismaService.reports.delete({
      where: { id },
    });
  }
}
