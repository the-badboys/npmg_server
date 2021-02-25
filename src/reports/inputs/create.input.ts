import { Field, InputType, ID } from '@nestjs/graphql';
import {values} from '../dto/reports'

@InputType()
export class NewReport {
    @Field()
    id: string;
    @Field()
    gorilla: string;
    @Field()
    date: Date;
    @Field()
    lungs: values;
    @Field()
    heart: values;
    @Field()
    legs: values;
    @Field()
    head: values;
    @Field()
    eyes: values;
    @Field()
    stomach: values;
    @Field({nullable: true})
    reporter: string;
    @Field({nullable: true})
    createdAt: Date;
    @Field({nullable: true})
    updatedAt: Date;

}