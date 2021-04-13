import { Inject, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server-express'
import { Roles } from 'src/decorators/roles.decorator'
import { UserGuard } from 'src/guards/user.guard'
import { ROLES } from 'src/models/user'
import { PrismaService } from 'src/prisma.service'
import { NewAttendance } from '../inputs/AttendanceCreate.input'
import { DateRange } from '../inputs/AttendanceDate.input'
import { Attendance } from '../models/attendance'

@Resolver(Attendance)
@UseGuards(UserGuard)
export class AttendanceResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => [Attendance], { nullable: true, name: 'getAllAttendances' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER)
  async allReports(@Context() ctx) {
    return this.prismaService.attendance.findMany({})
  }

  @Query(returns => Attendance, { nullable: true, name: 'getAttendance' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER)
  async attendance(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.attendance.findUnique({
      where: { id },
    })
  }

  @Query(returns => [Attendance], { nullable: true, name: 'getUserAttendance' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER)
  async user_attendance(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.attendance.findMany({
      where: { attendant: id },
    })
  }
  @Query(returns => [Attendance], { nullable: true, name: 'getDayAttendance' })
  @Roles(ROLES.ADMIN)
  async day_attendance(@Args('date') day: Date, @Context() ctx) {
    return this.prismaService.attendance.findMany({
      where: { date: day },
    })
  }

  @Query(returns => [Attendance], {
    nullable: true,
    name: 'getDateRangeAttendance',
  })
  @Roles(ROLES.ADMIN)
  async week_attendance(@Args('range') range: DateRange, @Context() ctx) {
    return this.prismaService.attendance.findMany({
      where: {
        date: {
          gt: range.start,
          lt: range.end,
        },
      },
    })
  }

  @Mutation(returns => Attendance)
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER)
  async newAttendance(@Args('data') data: NewAttendance, @Context() ctx) {
    const user = await this.prismaService.users.findUnique({
      where: { id: data.attendant },
    })
    if (!user) {
      return new UserInputError('Ranger not found')
    }
    data.added_by = ctx.user.id
    return this.prismaService.attendance.create({
      data: data,
    })
  }

  @Mutation(returns => Attendance, { nullable: true, name: 'deleteAttendance' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN)
  async delete(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.attendance.delete({
      where: { id },
    })
  }
}
