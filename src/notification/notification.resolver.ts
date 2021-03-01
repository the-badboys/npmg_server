import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Subscription,
  Mutation,
  Args,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { PrismaService } from 'src/prisma.service';
import { Notification, NotificationType } from './notification';

const pubSub = new PubSub();

@ObjectType()
class NotificationInput {
  @Field()
  title: string;

  @Field()
  message: string;

  @Field()
  notifierId: string;

  @Field(type => NotificationType)
  event_type: NotificationType;

  @Field()
  isRead: boolean;

  @Field()
  emailTo: string;
}

@Resolver(Notification)
export class NotificationResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(returns => Notification, { name: 'getAllNotifications' })
  async getAllNotifications() {
    return this.prismaService.notifications.findMany();
  }

  // @Mutation(returns => Notification, { name: 'createNewNotification' })
  // async AddNotification(@Args('data') data: NotificationInput) {
  //   const notification = await this.prismaService.notifications.create({
  //     data: {
  //       title: data.title,
  //       message: data.message,
  //       notication_type: data.event_type,
  //       userId: data.notifierId,
  //       emailTo: data.emailTo,
  //     },
  //   });
  //   pubSub.publish('notificationAdded', notification);
  //   return notification;
  // }

  @Subscription(returns => Notification)
  newNotification() {
    return pubSub.asyncIterator('notificationAdded');
  }
}
