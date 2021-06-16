import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(type => ID)
  id: string

  @Field(type => String)
  email: string

  @Field(type => String)
  firstName: string

  @Field(type => String, { nullable: true })
  phone: string

  @Field(type => String, { nullable: true })
  district: string

  @Field(type => String, { nullable: true })
  province: string

  @Field(type => String)
  lastName: string

  @Field(type => ROLES)
  role: ROLES

  @Field(type => String)
  createdAt: Date
}

export enum ROLES {
  USER = 'USER',
  ADMIN = 'ADMIN',
  RANGER = 'RANGER',
  DOCTOR = 'DOCTOR',
}

registerEnumType(ROLES, {
  name: 'ROLES',
  description: 'Role of users',
})
