import { Field, ObjectType, ID,registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class Report {
    @Field(type => ID)
    id: string;
    @Field(type => ID)
    gorilla: string;
    @Field(type => Date)
    date: Date;
    @Field(type => values)
    lungs: values;
    @Field(type => values)
    heart: values;
    @Field(type =>values)
    legs: values;
    @Field(type => values)
    head: values;
    @Field(type => values)
    eyes: values;
    @Field(type =>values)
    stomach: values;
    @Field(type =>ID)
    reporter: string;
    @Field(type => Date)
    createdAt: Date;
    @Field(type => Date)
    updatedAt: Date;

}

export enum values {
    NSA = 'NSA',
    SAN = 'SAN',
    ASN = 'ASN',
  }

registerEnumType(values, {
    name: 'Values',
    description: 'Possible values of a report',
});