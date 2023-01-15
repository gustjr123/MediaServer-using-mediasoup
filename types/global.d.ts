interface IMediasoupWorkerSettings {
  readonly rtcMinPort: number;
  readonly rtcMaxPort: number;
  readonly logLevel: string;
  readonly logTags: string[];
}

interface IMediasoupMediacodecSettings {
  readonly kind: string;
  readonly mimeType: string;
  readonly clockRate: number;
  readonly channels?: number;
  readonly preferredPayloadType?: number;
  readonly rtcpFeedback?: IMediasoupRtcpFeedback[];
  readonly parameters?: { 'x-google-start-bitrate': number };
}

interface IMediasoupListenIds {
  readonly ip: string;
  readonly announcedIp?: string | null;
}

interface IMediasoupWebRtcTransport {
  readonly listenIps: IMediasoupListenIds[];
  readonly initialAvailableOutgoingBitrate: number;
  readonly minimumAvailableOutgoingBitrate: number;
  readonly maximumAvailableOutgoingBitrate: number;
  readonly factorIncomingBitrate: number;
}

interface IMediasoupSettings {
  readonly workerPool: number;
  readonly worker: IMediasoupWorkerSettings;
  readonly router: { mediaCodecs: IMediasoupMediacodecSettings[] };
  readonly webRtcTransport: IMediasoupWebRtcTransport;
}
