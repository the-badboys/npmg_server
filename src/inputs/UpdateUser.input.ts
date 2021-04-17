import { Field, InputType } from '@nestjs/graphql'
import { ROLES } from 'src/models/user'

@InputType()
export class UpdateUserInput {
  @Field()
  email!: string

  @Field()
  firstName!: string

  @Field()
  lastName!: string

  @Field()
  role!: ROLES
}
