import { Socket, Server } from 'socket.io';
import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import * as mediasoup from 'mediasoup';
import { WorkerSettings, Worker, Router } from 'mediasoup/node/lib/types';
import { Logger } from '@nestjs/common';

const mediasoupSetting = {
  // 컴퓨터의 CPU 갯수 이하로 설정해야함.
  workerPool: 1,
  worker: {
    logLevel: 'warn',
    logTags: ['info', 'ice', 'dtls', 'rtp', 'srtp', 'rtcp', 'rtx', 'bwe'],
    rtcMinPort: 10000,
    rtcMaxPort: 10018,
  },
  router: {
    mediaCodecs: [
      // 스트림 코덱 설정
      {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2,
      },
      {
        kind: 'video',
        mimeType: 'video/VP8',
        clockRate: 90000,
        parameters: {
          'x-google-start-bitrate': 1000,
        },
      },
    ],
  },
  webRtcTransport: {
    listenIps: [
      {
        ip: '127.0.0.1',
        announcedIp: '192.168.0.2',
      },
    ],
    initialAvailableOutgoingBitrate: 1000,
    minimumAvailableOutgoingBitrate: 100,
    maximumAvailableOutgoingBitrate: 1000000,
    factorIncomingBitrate: 1.0,
  },
};

@WebSocketGateway({ namespace: 'media' })
export class mediaGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private logger: Logger = new Logger('Mediasoup');
  protected worker: {
    pid: number;
    worker: Worker;
  };

  constructor() {
    this.createWorkers(mediasoupSetting).then(() => {
      this.logger.debug(`created Worker`);
    });
  }
  private async createWorkers(
    mediasoupSettings: IMediasoupSettings,
  ): Promise<void> {
    mediasoup
      .createWorker(mediasoupSettings.worker as WorkerSettings)
      .then((Worker) => {
        Worker.on('died', (error) => {
          this.logger.error('mediasoup worker has died');
          setTimeout(() => process.exit(1), 2000);
        });
        this.worker = {
          pid: Worker.pid,
          worker: Worker,
        };
      });
  }

  handleConnection(socket: Socket) {}
  handleDisconnect(socket: Socket) {}
  afterInit(server: Server) {}

  @SubscribeMessage('message')
  Message() {
    return 'message';
  }
}
