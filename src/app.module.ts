import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { NpmgModule } from './npmg/npmg.module';
import { FamiliesModule } from './families/families.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      
    }),
    UsersModule,
    NpmgModule,
    FamiliesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
