import { Field, InputType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { ROLES } from 'src/models/user'

@InputType()
export class SignUpUserInput {
  @Field()
  @IsEmail()
  email!: string

  @Field()
  firstName!: string

  @Field()
  lastName!: string

  @Field()
  password!: string

  @Field(type => ROLES)
  role!: ROLES
}
