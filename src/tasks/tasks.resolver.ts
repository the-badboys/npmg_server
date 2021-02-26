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
export class TasksResolver {}
