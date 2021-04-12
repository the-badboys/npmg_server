import { InputType, Field, ID } from '@nestjs/graphql';

import { NewNpmg } from './NpmgCreate.input';

@InputType()
export class UpdateNpmg {
  @Field(() => NewNpmg, { nullable: true })
  data: NewNpmg;

  @Field(() => ID, { nullable: true })
  npmg_id: string;
}
