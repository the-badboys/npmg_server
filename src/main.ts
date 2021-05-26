import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 8800

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  process.setMaxListeners(0)
  await app.listen(PORT)
}

bootstrap()
