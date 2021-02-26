import { Module } from '@nestjs/common';
import { TasksResolver } from './tasks.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TasksResolver,PrismaService]
})
export class TasksModule {}
