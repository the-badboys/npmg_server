import { Module } from '@nestjs/common';
import { NamersResolver } from './namers.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [NamersResolver,PrismaService]
})
export class NamersModule {}
