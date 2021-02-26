import {
    InputType,
    Field,
    ID
  } from '@nestjs/graphql';

  import { NewTask} from './create.input'

  @InputType()
export class  UpdateNpmg {
  @Field(()=>NewTask,{nullable: true})
  data: NewTask;

  @Field(()=>ID,{nullable: true})
  task_id: string;

}