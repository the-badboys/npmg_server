import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Namer {
    @Field(type => ID)
    id: string;
    @Field(type => String)
    fullname: string;
    @Field(type => String)
    ceremonyId: string;
    @Field(type => String)
    comment: string;
    @Field(type => ID)
    gorilla: string;
    @Field(type =>Boolean)
    isCompleted: boolean;
    @Field(type => Date)
    createdAt: Date;
    @Field(type => Date)
    updatedAt: Date;

}