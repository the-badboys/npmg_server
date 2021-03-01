import { Resolver } from '@nestjs/graphql';
import { Notification } from './notification';

@Resolver(Notification)
export class NotificationResolver {}
