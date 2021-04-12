import { InputType, Field, ID } from '@nestjs/graphql';

import { NewAttendance } from '../inputs/AttendanceCreate.input';

@InputType()
export class UpdateAttendance {
  @Field(() => NewAttendance, { nullable: true })
  data: NewAttendance;

  @Field(() => ID, { nullable: true })
  family_id: string;
}
