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
import {
  CreateAiResumeDto,
  FindResumeDto,
  GenerateDescDto,
} from './dto/create-ai-resume.dto';
import { UpdateAiResumeDto } from './dto/update-ai-resume.dto';
import { GetAiResumeDetailsDto } from './dto/get-ai-resume.dto';

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

  @Post('/generate-desc')
  generateDescription(@Body() generateDescriptionDto: GenerateDescDto) {
    return this.aiResumesService.getDescription(generateDescriptionDto);
  }

  @Post('/get-details')
  findOne(@Body() getAiResumeDto: GetAiResumeDetailsDto) {
    return this.aiResumesService.findOne(getAiResumeDto);
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
