import { Test, TestingModule } from '@nestjs/testing';
import { SnowflakeIdService } from './snowflake-id.service';
import { ConfigModule } from '@nestjs/config';

describe('SnowflakeIdService', () => {
  let service: SnowflakeIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
      ],
      providers: [SnowflakeIdService],
    }).compile();

    service = module.get<SnowflakeIdService>(SnowflakeIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('generate snowflake id', async () => {
    const [id1, id2] = await Promise.all([
      new Promise((resolve) => {
        resolve(service.generate());
      }),
      new Promise((resolve) => {
        resolve(service.generate());
      }),
    ]);

    console.log(id1, id2);

    expect(id1).not.toEqual(id2);
  });
});
