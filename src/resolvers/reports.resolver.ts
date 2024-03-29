import { Inject, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server-express'
import { Roles } from 'src/decorators/roles.decorator'
import { UserGuard } from 'src/guards/user.guard'
import { ROLES } from 'src/models/user'
import { PrismaService } from 'src/prisma.service'
import { DateRange } from '../inputs/AttendanceDate.input'
import { NewReport } from '../inputs/ReportCreate.input'
import { UpdateReport } from '../inputs/ReportUpdate.input'
import { Report } from '../models/reports'

@Resolver()
@UseGuards(UserGuard)
export class ReportsResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  @Query(returns => [Report], { nullable: true, name: 'getAllReports' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN)
  async allReports(@Context() ctx) {
    return this.prismaService.reports.findMany({})
  }
  @Query(returns => Report, { nullable: true, name: 'getReport' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN)
  async npmg(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.reports.findUnique({
      where: { id },
    })
  }
  @Mutation(returns => Report)
  @Roles(ROLES.DOCTOR, ROLES.RANGER)
  async NewReport(@Args('data') data: NewReport, @Context() ctx) {
    data.reporter = ctx.user.id
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id: data.gorilla },
    })
    if (!npmg) {
      return new UserInputError('Gorilla not found')
    }
    return this.prismaService.reports.create({
      data: data,
    })
  }
  @Query(returns => [Report], { name: 'getDayReport' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN)
  async report_date(@Args('date') report: Date, @Context() ctx) {
    return this.prismaService.reports.findMany({
      where: {
        date: report,
      },
    })
  }
  @Query(returns => [Report], { name: 'getTimeRangeReport' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN)
  async report_month(@Args('date') report: DateRange, @Context() ctx) {
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
  @Roles(ROLES.DOCTOR, ROLES.RANGER)
  async updatenpmgreport(
    @Args('report_update') report: UpdateReport,
    @Context() ctx,
  ) {
    report.data.reporter = ctx.user.id
    const npmg = await this.prismaService.npmg.findUnique({
      where: { id: report.data.gorilla },
    })
    if (!npmg) {
      return new UserInputError('Gorilla not found')
    }
    return this.prismaService.reports.update({
      where: {
        id: report.report_id,
      },
      data: report.data,
    })
  }
  @Mutation(returns => Report, { nullable: true, name: 'deleteReport' })
  @Roles(ROLES.ADMIN)
  async delete(@Args('id') id: string, @Context() ctx) {
    const npmg = await this.prismaService.reports.findUnique({
      where: { id },
    })
    if (!npmg) {
      return new UserInputError('Report to be deleted not found')
    }
    return this.prismaService.reports.delete({
      where: { id },
    })
  }
}
