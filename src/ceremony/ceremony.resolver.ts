import { Inject } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { Ceremony } from './ceremony';

@InputType()
export class CeremonyInputType {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  babies: string;

  @Field()
  ceremony_date: Date;

  @Field()
  venue: string;
}

@InputType()
export class CeremonyUpdateInputType {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  babies: string;

  @Field()
  ceremony_date: Date;

  @Field()
  venue: string;
}

@Resolver(Ceremony)
export class CeremonyResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(() => [Ceremony], { name: 'getAllCeremonies' })
  async getAllCeremonies() {
    const ceremonies = this.prismaService.ceremonies.findMany();
    return ceremonies;
  }

  @Query(() => Ceremony, { nullable: true, name: 'getCeremony' })
  async getCeremony(@Args('id') id: string) {
    const ceremony = this.prismaService.ceremonies.findUnique({
      where: {
        id,
      },
    });
    return ceremony;
  }

  @Mutation(() => Ceremony, { name: 'createCeremony' })
  async addCeremony(@Args('data') dataArgs: CeremonyInputType) {
    const ceremony = this.prismaService.ceremonies.create({
      data: {
        // babies: {
        //   create: { id: dataArgs.babies },
        // },
        venue: dataArgs.venue,
        title: dataArgs.title,
        description: dataArgs.description,
        ceremony_date: dataArgs.ceremony_date,
      },
    });
    return ceremony;
  }

  @Mutation(() => Ceremony, { name: 'deleteCeremony' })
  async deleteCeremony(@Args('id') id: string) {
    const deletedRecord = this.prismaService.ceremonies.delete({
      where: {
        id,
      },
    });
    return deletedRecord;
  }

  @Mutation(() => Ceremony, { name: 'updateCeremony' })
  async updateCeremony(@Args('data') data: CeremonyUpdateInputType) {
    const ceremony = this.prismaService.ceremonies.update({
      where: {
        id: data.id,
      },
      data: {
        // babies: data.babies,
        ceremony_date: data.ceremony_date,
        venue: data.venue,
        title: data.title,
        description: data.description,
      },
    });

    return ceremony;
  }
}
