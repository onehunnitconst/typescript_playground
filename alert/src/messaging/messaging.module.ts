import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import * as amqplib from 'amqplib';

@Module({
  providers: [
    MessagingService,
    {
      provide: 'AMQPLIB',
      useFactory: async () => {
        const conn = await amqplib.connect('amqp://localhost:5672');
        return conn;
      },
    },
  ],
})
export class MessagingModule {}
