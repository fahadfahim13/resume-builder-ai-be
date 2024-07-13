import { Module } from '@nestjs/common';
import { AiResumesService } from './ai-resumes.service';
import { AiResumesController } from './ai-resumes.controller';

@Module({
  controllers: [AiResumesController],
  providers: [AiResumesService],
})
export class AiResumesModule {}
