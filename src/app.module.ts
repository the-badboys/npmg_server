import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { NpmgModule } from './npmg/npmg.module';
import { FamiliesModule } from './families/families.module';
import { ReportsModule } from './reports/reports.module';
import { NamersModule } from './namers/namers.module';
import { CeremonyModule } from './ceremony/ceremony.module';
import { TasksModule } from './tasks/tasks.module';
import { AttendanceModule } from './attendance/attendance.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/jwtSetup';
import { NotificationModule } from './notification/notification.module';
import { GroupsModule } from './groups/groups.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      installSubscriptionHandlers: true,
      formatError: (error: GraphQLError) => {
        if (error.message === 'VALIDATION_ERROR') {
          const extensions = {
            code: 'VALIDATION_ERROR',
            errors: [],
          };

          Object.keys(error.extensions.invalidArgs).forEach(key => {
            const constraints = [];
            Object.keys(error.extensions.invalidArgs[key].constraints).forEach(
              _key => {
                constraints.push(
                  error.extensions.invalidArgs[key].constraints[_key],
                );
              },
            );

            extensions.errors.push({
              field: error.extensions.invalidArgs[key].property,
              errors: constraints,
            });
          });

          const graphQLFormattedError: GraphQLFormattedError = {
            message: 'VALIDATION_ERROR',
            extensions: extensions,
          };

          return graphQLFormattedError;
        } else {
          if (error.extensions.exception.name === 'JsonWebTokenError') {
            const graphQLFormattedError = {
              status: 404,
              message: 'Invalid token',
              error: 'Unauthorized',
            };
            return graphQLFormattedError;
          } else if (error.extensions.exception.code === 'P2002') {
            const field = error.extensions.exception.meta.target[0];
            const graphQLFormattedError = {
              status: 404,
              message: 'Invalid Data',
              error: `${field} Already exists`,
            };
            return graphQLFormattedError;
          } else {
            return {
              status: error.extensions?.exception.status,
              message: error.extensions?.exception?.response,
            };
          }
        }
      },
    }),
    UsersModule,
    NpmgModule,
    FamiliesModule,
    ReportsModule,
    NamersModule,
    CeremonyModule,
    TasksModule,
    AttendanceModule,
    NotificationModule,
    GroupsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
