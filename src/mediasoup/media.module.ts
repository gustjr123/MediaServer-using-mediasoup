import { Module } from '@nestjs/common';
import { mediaGateway } from './media.gateway';
@Module({
  imports: [],
  providers: [mediaGateway],
})
export class MediaModule {}
