import { Inject, SetMetadata, UseGuards } from '@nestjs/common'
import {
  Args,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql'
import { PrismaService } from 'src/prisma.service'
import { Roles } from 'src/decorators/roles.decorator'
import { ROLES } from 'src/models/user'
import { UserGuard } from 'src/guards/user.guard'
import { Ceremony } from '../models/ceremony'

@InputType()
export class CeremonyInputType {
  @Field()
  title: string

  @Field()
  description: string

  @Field()
  ceremony_date: Date

  @Field()
  venue: string
}

@InputType()
export class CeremonyUpdateInputType {
  @Field()
  id: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  babies: string

  @Field()
  ceremony_date: Date

  @Field()
  venue: string
}

@Resolver(Ceremony)
@UseGuards(UserGuard)
export class CeremonyResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(() => [Ceremony], { name: 'getAllCeremonies' })
  async getAllCeremonies() {
    const ceremonies = this.prismaService.ceremonies.findMany({
      skip: 40,
      take: 10,
    })
    return ceremonies
  }

  @Query(() => Ceremony, { nullable: true, name: 'getCeremony' })
  async getCeremony(@Args('id') id: string) {
    const ceremony = this.prismaService.ceremonies.findUnique({
      where: {
        id,
      },
    })
    return ceremony
  }

  @Mutation(() => Ceremony, { name: 'createCeremony' })
  async addCeremony(@Args('data') dataArgs: CeremonyInputType) {
    const ceremony = this.prismaService.ceremonies.create({
      data: {
        venue: dataArgs.venue,
        title: dataArgs.title,
        description: dataArgs.description,
        ceremony_date: dataArgs.ceremony_date,
      },
    })
    return ceremony
  }

  @Mutation(() => Ceremony, { name: 'deleteCeremony' })
  @Roles(ROLES.ADMIN)
  async deleteCeremony(@Args('id') id: string) {
    const deletedRecord = this.prismaService.ceremonies.delete({
      where: {
        id,
      },
    })
    return deletedRecord
  }

  @Mutation(() => Ceremony, { name: 'updateCeremony' })
  @Roles(ROLES.ADMIN, ROLES.RANGER, ROLES.DOCTOR)
  async updateCeremony(@Args('data') data: CeremonyUpdateInputType) {
    const ceremony = this.prismaService.ceremonies.update({
      where: {
        id: data.id,
      },
      data: {
        ceremony_date: data.ceremony_date,
        venue: data.venue,
        title: data.title,
        description: data.description,
      },
    })

    return ceremony
  }
}
