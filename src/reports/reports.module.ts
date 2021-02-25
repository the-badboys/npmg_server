import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReportsResolver } from './reports.resolver';

@Module({
  providers: [ReportsResolver,PrismaService]
})
export class ReportsModule {}
