import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType()
export class Family {
  @Field(type => ID)
  id: string
  @Field(type => String)
  family_name: string
  @Field(type => String)
  leader: string
}
