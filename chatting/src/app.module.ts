import { Module } from '@nestjs/common';
import { ChatsModule } from './chats/chats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ChatsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
