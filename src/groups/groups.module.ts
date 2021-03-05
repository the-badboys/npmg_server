import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { jwtConstants } from 'src/utils/jwtSetup';
import { GroupsResolver } from './groups.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [GroupsResolver, PrismaService],
})
export class GroupsModule {}
