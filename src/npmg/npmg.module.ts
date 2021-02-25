import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NpmgResolver } from './npmg.resolver';

@Module({
  providers: [NpmgResolver, PrismaService],
})
export class NpmgModule {}
