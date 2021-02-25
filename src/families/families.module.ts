import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FamiliesResolver } from './families.resolver';

@Module({
  providers: [FamiliesResolver, PrismaService],
})
export class FamiliesModule {}
