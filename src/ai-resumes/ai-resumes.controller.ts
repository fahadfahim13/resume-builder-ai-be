import { Controller, Get, Post, Body, Patch, Param, Delete, Response } from '@nestjs/common';
import { AiResumesService } from './ai-resumes.service';
import { CreateAiResumeDto } from './dto/create-ai-resume.dto';
import { UpdateAiResumeDto } from './dto/update-ai-resume.dto';

@Controller('ai-resumes')
export class AiResumesController {
  constructor(private readonly aiResumesService: AiResumesService) {}

  @Post()
  create(@Body() createAiResumeDto: CreateAiResumeDto) {
    return this.aiResumesService.create(createAiResumeDto);
  }

  @Get()
  findAll() {
    return this.aiResumesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiResumesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiResumeDto: UpdateAiResumeDto) {
    return this.aiResumesService.update(+id, updateAiResumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiResumesService.remove(+id);
  }
}
