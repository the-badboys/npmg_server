import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotificationResolver } from './notification.resolver';

@Module({
  providers: [NotificationResolver, PrismaService],
})
export class NotificationModule {}
