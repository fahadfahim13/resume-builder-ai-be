import { Test, TestingModule } from '@nestjs/testing';
import { AiResumesService } from './ai-resumes.service';

describe('AiResumesService', () => {
  let service: AiResumesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiResumesService],
    }).compile();

    service = module.get<AiResumesService>(AiResumesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
