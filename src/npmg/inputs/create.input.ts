import {
    InputType,
    Field,
  } from '@nestjs/graphql';

@InputType()
export class NewNpmg {
  @Field()
  name: string;

  @Field({nullable: true})
  mother: string;

  @Field({nullable: true})
  father: string;

  @Field({nullable: true})
  gender: string;

  @Field({nullable: true})
  dob: string;

  @Field({nullable: true})
  family: string;

  @Field({nullable: true})
  isSilverBacked: boolean;

}
