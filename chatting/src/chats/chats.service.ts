import { Injectable } from '@nestjs/common';
import { Message } from 'src/domain/message';

@Injectable()
export class ChatsService {
  private static sequence = 0;
  private static readonly store: Message[] = [];

  send(contents: string) {
    const message: Message = {
      messageId: ++ChatsService.sequence,
      contents,
      createdAt: new Date(),
    };
    ChatsService.store.push(message);
  }

  read(): Message[] {
    return ChatsService.store;
  }
}
