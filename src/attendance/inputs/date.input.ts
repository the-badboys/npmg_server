import { Field, InputType} from '@nestjs/graphql';

@InputType()
export class DateRange {
    @Field(type => String)
    start: Date;
    @Field(type => String)
    end: Date;
}