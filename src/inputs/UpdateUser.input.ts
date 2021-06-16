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

  @Field({ nullable: true})
  phone!: string

  @Field({ nullable: true})
  district!: string

  @Field({ nullable: true})
  province!: string

  @Field()
  role!: ROLES
}
