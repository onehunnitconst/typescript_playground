import { Test, TestingModule } from '@nestjs/testing';
import { MessagingService } from './messaging.service';
import * as amqplib from 'amqplib';
import { Connection as AmqpConnection, Channel as AmqpChannel } from 'amqplib';

describe('Messaging', () => {
  let amqpConnection: AmqpConnection;
  let provider: MessagingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    provider = module.get<MessagingService>(MessagingService);
    amqpConnection = module.get<AmqpConnection>('AMQPLIB');
  });

  it('서비스 정의', () => {
    expect(provider).toBeDefined();
  });

  it('AMQP 모듈 주입 확인', () => {
    expect(amqpConnection).toBeDefined();
  });

  it('메세지 큐에 등록', async () => {
    const pub: AmqpChannel = await amqpConnection.createChannel();
    const sub: AmqpChannel = await amqpConnection.createChannel();
    const queue = 'hello';
    const message = 'hello world!';

    await sub.assertQueue(queue);
    await sub.consume(queue, (msg) => {
      if (msg !== null) {
        console.log('Received: ', msg.content.toString());
        pub.ack(msg);
      }
    });

    const success = pub.sendToQueue('queue', Buffer.from(message));
    expect(success).toBe(true);
  });

  afterEach(() => {
    amqpConnection.close();
  });
});
