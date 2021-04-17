import { Inject } from '@nestjs/common'
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'
import { PrismaService } from 'src/prisma.service'
import { NotificationInput } from '../inputs/createNotification.input'
import { Notification } from '../models/notification'

const pubSub = new PubSub()

@Resolver(Notification)
export class NotificationResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => Notification, { name: 'getAllNotifications' })
  async getAllNotifications() {
    return this.prismaService.notifications.findMany()
  }

  @Mutation(returns => Notification, { name: 'createNewNotification' })
  async AddNotification(@Args('data') data: NotificationInput, @Context() ctx) {
    const notification = await this.prismaService.notifications.create({
      data: {
        title: data.title,
        message: data.message,
        notification_type: data.notification_type,
        userId: data.userId,
        emailTo: data.emailTo,
      },
    })
    pubSub.publish('notificationAdded', { notificationAdded: notification })
    return notification
  }

  @Subscription(returns => Notification)
  notificationAdded() {
    return pubSub.asyncIterator('notificationAdded')
  }
}
