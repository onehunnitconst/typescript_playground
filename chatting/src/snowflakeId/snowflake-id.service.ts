import { Injectable } from '@nestjs/common';

@Injectable()
export class SnowflakeIdService {
  private static readonly baseEpoch = 1697161614465;
  private static epochOffset = SnowflakeIdService.baseEpoch;
  private static sequence = 0;

  generate(): number {
    const dataCenterId = +process.env.DATA_CENTER_ID;
    const serverId = +process.env.SERVER_ID;

    const currentEpoch = Date.now();
    const timestamp = currentEpoch - SnowflakeIdService.baseEpoch;

    if (currentEpoch > SnowflakeIdService.epochOffset) {
      SnowflakeIdService.epochOffset = currentEpoch;
      SnowflakeIdService.sequence = 0;
    }

    const timestampBit = `${timestamp.toString(2).padStart(41, '0')}`;
    const instanceBit = `${dataCenterId.toString(2).padStart(5, '0')}${serverId
      .toString(2)
      .padStart(5, '0')}`;
    const sequenceBit = `${SnowflakeIdService.sequence
      .toString(2)
      .padStart(12, '0')}`;
    SnowflakeIdService.sequence++;

    return +`0b${timestampBit + instanceBit + sequenceBit}`;
  }
}
