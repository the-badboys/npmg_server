import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/users/user';

@ObjectType()
export class Notification {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  isRead: boolean;

  @Field()
  updatedAt: Date;

  @Field(type => NotificationType)
  notificationType: NotificationType;

  @Field()
  title: string;

  @Field()
  message: string;

  @Field()
  emailTo: string;

  @Field()
  notifierId: User;
}

export enum NotificationType {
  REPORT_CHECKED,
  ACCOUNT_UPDATED,
  VERIFY_ACCOUNT,
  NEW_GORILLA,
  ERROR,
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'Role of users',
});
