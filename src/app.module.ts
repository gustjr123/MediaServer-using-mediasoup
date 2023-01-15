import { Module } from '@nestjs/common';
import { MediaModule } from './mediasoup/media.module';

@Module({
  imports: [MediaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
