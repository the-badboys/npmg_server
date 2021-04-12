import { InputType, Field, ID } from '@nestjs/graphql';

import { NewReport } from './ReportCreate.input';

@InputType()
export class UpdateReport {
  @Field(() => NewReport, { nullable: true })
  data: NewReport;

  @Field(() => ID, { nullable: true })
  report_id: string;
}
