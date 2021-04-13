import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { User } from 'src/models/user'

@ObjectType()
export class Notification {
  @Field(type => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  isRead: boolean

  @Field()
  updatedAt: Date

  @Field()
  title: string

  @Field()
  message: string

  @Field()
  emailTo: string

  @Field()
  userId: string

  @Field(type => NotificationTypes)
  notification_type: NotificationTypes
}

export enum NotificationTypes {
  REPORT_CHECKED = 'REPORT_CHECKED',
  ACCOUNT_UPDATED = 'ACCOUNT_UPDATED',
  VERIFY_ACCOUNT = 'VERIFY_ACCOUNT',
  NEW_GORRILLA = 'NEW_GORRILLA',
  ERROR = 'ERROR',
}

registerEnumType(NotificationTypes, {
  name: 'NotificationTypes',
  description: 'Notification events',
})
