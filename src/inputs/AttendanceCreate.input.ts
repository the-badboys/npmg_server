import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class NewAttendance {
  @Field(type => ID)
  id: string;
  @Field(type => String)
  attendant: string;
  @Field(type => String)
  added_by: string;
  @Field(type => String)
  date: Date;
  @Field(type => Boolean)
  isPresent: boolean;
}
