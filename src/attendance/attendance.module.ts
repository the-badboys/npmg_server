import { Module } from '@nestjs/common';
import { AttendanceResolver } from './attendance.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AttendanceResolver,PrismaService]
})
export class AttendanceModule {}
