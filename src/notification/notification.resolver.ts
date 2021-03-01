import { Inject } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { Notification } from './notification';

@Resolver(Notification)
export class NotificationResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => Notification, { name: 'getAllNotifications' })
  async getAllNotifications() {
    return this.prismaService.notifications.findMany();
  }
}
