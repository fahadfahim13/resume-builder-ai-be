import { Injectable } from '@nestjs/common';
import { CreateAiResumeDto } from './dto/create-ai-resume.dto';
import { UpdateAiResumeDto } from './dto/update-ai-resume.dto';

import { getPrompt } from './utils/prompt';
import { AIChatSession } from './utils/AiModel';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiResumesService {
  constructor(private confiService: ConfigService) {}

  async create(createAiResumeDto: CreateAiResumeDto) {
    const result = await AIChatSession(
      this.confiService.get<string>('API_KEYS.GEMINI') ?? '',
    ).sendMessage(getPrompt(createAiResumeDto.userInput));
    return result.response.text();
  }

  findAll() {
    return `This action returns all aiResumes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiResume`;
  }

  update(id: number, updateAiResumeDto: UpdateAiResumeDto) {
    return `This action updates a #${id} aiResume`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiResume`;
  }
}
