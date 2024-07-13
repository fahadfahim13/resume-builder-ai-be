import { PartialType } from '@nestjs/mapped-types';
import { CreateAiResumeDto } from './create-ai-resume.dto';

export class UpdateAiResumeDto extends PartialType(CreateAiResumeDto) {}
