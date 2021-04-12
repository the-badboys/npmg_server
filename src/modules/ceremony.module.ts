import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/jwtSetup';
import { CeremonyResolver } from '../resolvers/ceremony.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [CeremonyResolver, PrismaService],
})
export class CeremonyModule {}
