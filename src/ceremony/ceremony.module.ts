import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { jwtConstants } from 'src/utils/jwtSetup';
import { CeremonyResolver } from './ceremony.resolver';

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
