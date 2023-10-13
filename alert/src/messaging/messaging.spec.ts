import { Test, TestingModule } from '@nestjs/testing';
import { Messaging } from './messaging.service';

describe('Messaging', () => {
  let provider: Messaging;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Messaging],
    }).compile();

    provider = module.get<Messaging>(Messaging);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
