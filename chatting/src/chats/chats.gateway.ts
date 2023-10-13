import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { Message } from 'src/domain/message';
import { Observable, from, map } from 'rxjs';
import { Server } from 'ws';

@WebSocketGateway(4300, {
  cors: {
    origin: '*',
  },
})
export class ChatsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatsService: ChatsService) {}

  @SubscribeMessage('send')
  sendMessage(@MessageBody() data: string) {

    this.server.clients.forEach((client) => {
      client.send(JSON.stringify({ event: 'receive', data }));
    });
    return;
  }

  @SubscribeMessage('receive')
  receiveMessage(@MessageBody() data: string) {
    return data;
  }

  @SubscribeMessage('read')
  readMessage(@MessageBody() data: any): Observable<WsResponse<Message>> {
    const messages = this.chatsService.read();

    return from(messages).pipe(
      map((message) => ({ event: 'read', data: message })),
    );
  }
}
