import { Test, TestingModule } from '@nestjs/testing';
import { AiResumesController } from './ai-resumes.controller';
import { AiResumesService } from './ai-resumes.service';

describe('AiResumesController', () => {
  let controller: AiResumesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiResumesController],
      providers: [AiResumesService],
    }).compile();

    controller = module.get<AiResumesController>(AiResumesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
