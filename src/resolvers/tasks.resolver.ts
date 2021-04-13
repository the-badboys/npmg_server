import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { Inject, UseGuards } from '@nestjs/common'
import { NewTask } from '../inputs/Taskcreate.input'
import { UpdateTask } from '../inputs/Taskupdate.input'
import { Task } from '../models/tasks'
import { PrismaService } from 'src/prisma.service'
import { UserInputError } from 'apollo-server-express'
import { UserGuard } from 'src/guards/user.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { ROLES } from 'src/models/user'

@Resolver(Task)
@UseGuards(UserGuard)
export class TasksResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  @Query(returns => [Task], { nullable: true, name: 'getAllTasks' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER)
  async allTasks(@Context() ctx) {
    return this.prismaService.tasks.findMany({})
  }
  @Query(returns => Task, { nullable: true, name: 'getTask' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER)
  async task(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.tasks.findUnique({
      where: { id },
    })
  }
  @Query(returns => [Task], { nullable: true, name: 'getGroupTasks' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER)
  async getGroupTasks(@Args('id') id: string, @Context() ctx) {
    return this.prismaService.tasks.findMany({
      where: { group: id },
    })
  }
  @Query(returns => [Task], { nullable: true, name: 'getDayTasks' })
  @Roles(ROLES.DOCTOR, ROLES.ADMIN, ROLES.RANGER)
  async day_attendance(@Args('date') day: Date, @Context() ctx) {
    return this.prismaService.tasks.findMany({
      where: { date: day },
    })
  }
  @Mutation(returns => Task)
  @Roles(ROLES.ADMIN)
  async newTask(@Args('data') data: NewTask, @Context() ctx) {
    data.added_by = ctx.user.id
    return this.prismaService.tasks.create({
      data: data,
    })
  }
  @Mutation(returns => Task, { nullable: true, name: 'deleteAttendance' })
  @Roles(ROLES.ADMIN)
  async delete(@Args('id') id: string, @Context() ctx) {
    const npmg = await this.prismaService.tasks.findUnique({
      where: { id },
    })
    if (!npmg) {
      return new UserInputError('Task to be deleted not found')
    }
    return this.prismaService.tasks.delete({
      where: { id },
    })
  }
}
