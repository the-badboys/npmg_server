import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { NewAttendance } from './inputs/create.input';
import { UpdateAttendance } from './inputs/update.input';
import { Attendance } from './dto/attendance';
import { PrismaService } from 'src/prisma.service';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { DateRange } from './inputs/date.input';
import { UserGuard } from 'src/users/user.guard';
import { Roles } from 'src/users/roles.decorator';
import { ROLES } from 'src/users/user';

@Resolver(Attendance)
@UseGuards(UserGuard)
export class AttendanceResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  @Query(returns => [Attendance], { nullable: true, name: 'getAllAttendances' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER)
  async allReports(@Context() ctx) {
    return this.prismaService.attendance.findMany({});
  }
  @Query(returns => Attendance, { nullable: true, name: 'getAttendance' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER)
  async attendance(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.attendance.findUnique({
      where: { id },
    });
  }
  @Query(returns => [Attendance], { nullable: true, name: 'getUserAttendance' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER)
  async user_attendance(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.attendance.findMany({
      where: { attendant: id },
    });
  }
  @Query(returns => [Attendance], { nullable: true, name: 'getDayAttendance' })
  @Roles(ROLES.ADMIN)
  async day_attendance(@Args('date') day: Date, @Context() ctx) {
    return this.prismaService.attendance.findMany({
      where: { date: day },
    });
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
    });
  }
  @Mutation(returns => Attendance)
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER)
  async newAttendance(@Args('data') data: NewAttendance, @Context() ctx) {
    const user = await this.prismaService.users.findUnique({
      where: { id: data.attendant },
    });
    if (!user) {
      return new UserInputError('Ranger not found');
    }
    data.added_by = ctx.user.id;
    return this.prismaService.attendance.create({
      data: data,
    });
  }
  @Mutation(returns => Attendance, { nullable: true, name: 'deleteAttendance' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN)
  async delete(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.attendance.delete({
      where: { id },
    });
  }
}
