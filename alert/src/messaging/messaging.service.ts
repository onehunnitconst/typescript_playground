import { Inject, Injectable } from '@nestjs/common';
import { Connection as AmqpConnection } from 'amqplib';

@Injectable()
export class MessagingService {
  constructor(
    @Inject('AMQPLIB') private readonly amqpConnection: AmqpConnection,
  ) {}

  void addListener() {
    
  }
}
