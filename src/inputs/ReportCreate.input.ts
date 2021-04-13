import { Field, InputType } from '@nestjs/graphql'
import { values } from '../models/reports'

@InputType()
export class NewReport {
  @Field()
  gorilla: string
  @Field({ nullable: true })
  date: Date
  @Field()
  lungs: values
  @Field()
  heart: values
  @Field()
  legs: values
  @Field()
  head: values
  @Field()
  eyes: values
  @Field()
  stomach: values
  @Field({ nullable: true })
  reporter: string
}
