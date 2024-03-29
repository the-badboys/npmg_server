import { InputType, Field, ID } from '@nestjs/graphql'

import { NewFamily } from './FamilyCreate.input'

@InputType()
export class UpdateFamily {
  @Field(() => NewFamily, { nullable: true })
  data: NewFamily

  @Field(() => ID, { nullable: true })
  family_id: string
}
