import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Subscription,
  Mutation,
  Args,
  Field,
  Context,
  InputType,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { title } from 'process';
import { PrismaService } from 'src/prisma.service';
import { Notification, NotificationTypes } from '../models/notification';

const pubSub = new PubSub();

@InputType()
class NotificationInput {
  @Field()
  title: string;

  @Field()
  message: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  isRead: boolean;

  @Field()
  emailTo: string;

  @Field(type => NotificationTypes)
  notification_type: NotificationTypes;
}

@Resolver(Notification)
export class NotificationResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => Notification, { name: 'getAllNotifications' })
  async getAllNotifications() {
    return this.prismaService.notifications.findMany();
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
    });
    pubSub.publish('notificationAdded', { notificationAdded: notification });
    return notification;
  }

  @Subscription(returns => Notification)
  notificationAdded() {
    return pubSub.asyncIterator('notificationAdded');
  }
}
