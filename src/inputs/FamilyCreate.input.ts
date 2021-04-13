import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class NewFamily {
  @Field()
  family_name: string

  @Field({ nullable: true })
  leader: string
}
