import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType()
export class Attendance {
  @Field(type => ID)
  id: string
  @Field(type => String)
  attendant: string
  @Field(type => String)
  added_by: string
  @Field(type => String)
  date: Date
  @Field(type => Boolean)
  isPresent: boolean
}
