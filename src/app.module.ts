import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule } from '@nestjs/jwt'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { AttendanceModule } from './modules/attendance.module'
import { CeremonyModule } from './modules/ceremony.module'
import { FamiliesModule } from './modules/families.module'
import { GroupsModule } from './modules/groups.module'
import { NamersModule } from './modules/namers.module'
import { NotificationModule } from './modules/notification.module'
import { NpmgModule } from './modules/npmg.module'
import { ReportsModule } from './modules/reports.module'
import { TasksModule } from './modules/tasks.module'
import { UsersModule } from './modules/users.module'
import { jwtConstants } from './utils/jwtSetup'

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
          }

          Object.keys(error.extensions.invalidArgs).forEach(key => {
            const constraints = []
            Object.keys(error.extensions.invalidArgs[key].constraints).forEach(
              _key => {
                constraints.push(
                  error.extensions.invalidArgs[key].constraints[_key],
                )
              },
            )

            extensions.errors.push({
              field: error.extensions.invalidArgs[key].property,
              errors: constraints,
            })
          })

          const graphQLFormattedError: GraphQLFormattedError = {
            message: 'VALIDATION_ERROR',
            extensions: extensions,
          }

          return graphQLFormattedError
        } else if (!error.path) {
          return {
            message: error.message,
            status: 400,
          }
        } else {
          if (error.extensions.exception.name === 'JsonWebTokenError') {
            const graphQLFormattedError = {
              status: 404,
              message: 'Invalid token',
              error: 'Unauthorized',
            }
            return graphQLFormattedError
          } else if (error.extensions.exception.code === 'P2002') {
            const field = error.extensions.exception.meta.target[0]
            const graphQLFormattedError = {
              status: 404,
              message: 'Invalid Data',
              error: `${field} Already exists`,
            }
            return graphQLFormattedError
          } else {
            return error.extensions?.exception?.response
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
