import { InputType, Field, ID } from '@nestjs/graphql';

import { NewNamer } from './NamerCreate.input';

@InputType()
export class UpdateNamer {
  @Field(() => NewNamer, { nullable: true })
  data: NewNamer;

  @Field(() => ID, { nullable: true })
  namer_id: string;
}
