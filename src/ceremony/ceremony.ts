import { Field, ObjectType, ID } from '@nestjs/graphql';
import { npmg } from '@prisma/client';
import { Npmg } from 'src/npmg/dto/npmg';

@ObjectType()
export class Ceremony {
  @Field(type => ID)
  id: string;

  @Field(type => Date)
  ceremony_date: Date;

  @Field(type => Date)
  created_at: Date;

  @Field(type => String)
  title: string;

  @Field(type => Npmg)
  babies: [npmg];

  @Field(type => String)
  venue: String;

  @Field(type => String)
  description: String;
}
