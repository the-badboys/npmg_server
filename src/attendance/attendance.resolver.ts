import {
    Resolver,
    Query,
    Args,
    Mutation,
    Context,
  } from '@nestjs/graphql';
  import { Inject } from '@nestjs/common';
  import {NewAttendance} from './inputs/create.input'
  import {UpdateAttendance} from './inputs/update.input'
  import {Attendance} from './dto/attendance'
  import { PrismaService } from 'src/prisma.service';
  import {AuthenticationError, UserInputError} from 'apollo-server-express'
 import { DateRange } from './inputs/date.input';
 import { UserGuard } from 'src/users/user.guard';
import { Roles } from 'src/users/roles.decorator';
import { ROLES } from 'src/users/user';

@Resolver(Attendance)
export class AttendanceResolver {
    constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
    @Query(returns => [Attendance], { nullable: true, name: 'getAllAttendances' })
    async allReports(@Context() ctx) {
      return this.prismaService.attendance.findMany({});
    }
    @Query(returns => Attendance, { nullable: true, name: 'getAttendance' })
    async attendance(@Args('id') id: string, @Context() ctx) {
      return this.prismaService.attendance.findUnique({
        where: { id },
      });
    }
    @Query(returns => [Attendance], { nullable: true, name: 'getUserAttendance' })
    async user_attendance(@Args('id') id: string, @Context() ctx) {
      return this.prismaService.attendance.findMany({
        where: { attendant: id },
      });
    }
    @Query(returns => [Attendance], { nullable: true, name: 'getDayAttendance' })
    async day_attendance(@Args('date') day: Date, @Context() ctx) {
      return this.prismaService.attendance.findMany({
        where: { date: day },
      });
    }
    @Query(returns => [Attendance], { nullable: true, name: 'getDateRangeAttendance' })
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
    async newAttendance(@Args('data') data: NewAttendance, @Context() ctx) {
      const user = await this.prismaService.users.findUnique({
        where: { id:data.attendant },
      });
      if(!user){
        return new UserInputError("Ranger not found")
      }
      const adder = await this.prismaService.users.findUnique({
        where: { id:data.added_by },
      });
      if(!adder){
        return new UserInputError("Reporter not found")
      }
      return this.prismaService.attendance.create({
        data: data
      });
    }
    @Mutation(returns => Attendance, { nullable: true, name: 'deleteAttendance' })
  async delete(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.attendance.delete({
      where: { id },
    });
  }
}
