import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CeremonyResolver } from './ceremony.resolver';

@Module({
  imports: [],
  providers: [CeremonyResolver, PrismaService],
})
export class CeremonyModule {}
