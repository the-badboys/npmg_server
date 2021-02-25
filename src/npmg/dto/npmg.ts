import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Npmg {
    @Field(type => ID)
    id: string;
    @Field(type => String)
    name: string;
    @Field(type => String)
    mother: string;
    @Field(type => String)
    gender: string;
    @Field(type => String)
    father: string;
    @Field(type => String)
    family: string;
    @Field(type =>Boolean)
    isSilverBacked: boolean;
    @Field(type => Date)
    createdAt: Date;
    @Field(type => Date)
    updatedAt: Date;

}