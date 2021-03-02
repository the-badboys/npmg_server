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
  import {AuthenticationError, UserInputError} from 'apollo-server-express'
import { DateRange } from 'src/attendance/inputs/date.input';
import { UserGuard } from 'src/users/user.guard';
import { Roles } from 'src/users/roles.decorator';
import { ROLES } from 'src/users/user';

@Resolver()
@UseGuards(UserGuard)
export class ReportsResolver {
    constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
    @Roles(ROLES.DOCTOR,ROLES.ADMIN,)
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
    const user = await this.prismaService.users.findUnique({
      where: { id:data.reporter },
    });
    if(!user){
      return new UserInputError("Ranger not found")
    }
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
  async report_date(@Args('date') report: Date, @Context() ctx){
    return this.prismaService.reports.findMany({
      where: {
        date: report,
      },
    })
  }
  @Query(returns => [Report],{name: "getTimeRangeReport"})
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
  async updatenpmgreport(@Args('report_update') report: UpdateReport, @Context() ctx) {
    const user = await this.prismaService.users.findUnique({
      where: { id:report.data.reporter },
    });
    if(!user){
      return new UserInputError("Ranger not found")
    }
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
