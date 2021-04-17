import { Field, InputType } from '@nestjs/graphql'
import { NotificationTypes } from 'src/models/notification'

@InputType()
export class NotificationInput {
  @Field()
  title: string

  @Field()
  message: string

  @Field()
  userId: string

  @Field({ nullable: true })
  isRead: boolean

  @Field()
  emailTo: string

  @Field(type => NotificationTypes)
  notification_type: NotificationTypes
}
