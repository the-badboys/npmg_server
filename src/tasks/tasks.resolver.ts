import {
    Resolver,
    Query,
    Args,
    Mutation,
    Context,
  } from '@nestjs/graphql';
  import { Inject } from '@nestjs/common';
  import {NewTask} from './inputs/create.input'
  import {UpdateTask} from './inputs/update.input'
  import {Task} from './dto/tasks'
  import { PrismaService } from 'src/prisma.service';
  import {AuthenticationError, UserInputError} from 'apollo-server-express'

@Resolver(Task)
export class TasksResolver {
    constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
    @Query(returns => [Task], { nullable: true, name: 'getAllTasks' })
    async allReports(@Context() ctx) {
      return this.prismaService.tasks.findMany({});
    }
    @Query(returns => Task, { nullable: true, name: 'getTask' })
    async attendance(@Args('id') id: string, @Context() ctx) {
      return this.prismaService.tasks.findUnique({
        where: { id },
      });
    }
    @Query(returns => [Task], { nullable: true, name: 'getGroupTasks' })
    async user_attendance(@Args('id') id: string, @Context() ctx) {
      return this.prismaService.tasks.findMany({
        where: { group: id },
      });
    }
    @Query(returns => [Task], { nullable: true, name: 'getDayTasks' })
    async day_attendance(@Args('date') day: Date, @Context() ctx) {
      return this.prismaService.tasks.findMany({
        where: { date: day },
      });
    }
    @Mutation(returns => Task)
    async newAttendance(@Args('data') data: NewTask, @Context() ctx) {
      const user = await this.prismaService.users.findUnique({
        where: { id:data.added_by },
      });
      if(!user){
        return new UserInputError("Leader not found")
      }
      return this.prismaService.tasks.create({
        data: data
      });
    }
    @Mutation(returns => Task, { nullable: true, name: 'deleteAttendance' })
  async delete(@Args('id') id: string, @Context() ctx) {
    const npmg = await this.prismaService.tasks.findUnique({
      where: { id },
    });
    if(!npmg){
      return new UserInputError("Task to be deleted not found")
    }
    return this.prismaService.tasks.delete({
      where: { id },
    });
  }
}
