import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UpdateStatusSocket } from '../interfaces/updateStatusSocket.interface';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4200'],
  },
})
export class AnalysisGateway {
  @WebSocketServer() server: Server;
  
  sendAnalysisStatusUpdate(data: UpdateStatusSocket) {
    this.server.emit('analysisStatusUpdate', data);
  }

  sendSampleStatusUpdate(data: UpdateStatusSocket) {
    this.server.emit('sampleStatusUpdate', data);
  }
}
