import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
} from '@nestjs/common';
import { AiResumesService } from './ai-resumes.service';
import { CreateAiResumeDto, FindResumeDto } from './dto/create-ai-resume.dto';
import { UpdateAiResumeDto } from './dto/update-ai-resume.dto';

@Controller('ai-resumes')
export class AiResumesController {
  constructor(private readonly aiResumesService: AiResumesService) {}

  @Post()
  create(@Body() createAiResumeDto: CreateAiResumeDto) {
    // console.log({createAiResumeDto});
    return this.aiResumesService.create(createAiResumeDto);
    // return createAiResumeDto;
  }

  @Post('/get-all')
  findAll(@Body() findResume: FindResumeDto) {
    return this.aiResumesService.findAll(findResume);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiResumesService.findOne(id);
  }

  @Post('/save')
  update(@Body() updateAiResumeDto: UpdateAiResumeDto) {
    return this.aiResumesService.update(updateAiResumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiResumesService.remove(id);
  }
}
