import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NpmgResolver } from './npmg.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/jwtSetup';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [NpmgResolver, PrismaService],
})
export class NpmgModule {}
