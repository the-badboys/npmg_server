import { Module } from '@nestjs/common';
import { AttendanceResolver } from './attendance.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/jwtSetup';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AttendanceResolver, PrismaService],
})
export class AttendanceModule {}
