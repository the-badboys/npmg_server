import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class updatePasswordInput {
  @Field()
  currentPassword!: string

  @Field(type => String)
  @IsNotEmpty()
  newPassword!: string
}
