import { Injectable } from '@nestjs/common';
import { CreateAiResumeDto } from './dto/create-ai-resume.dto';
import { UpdateAiResumeDto } from './dto/update-ai-resume.dto';

import OpenAI from "openai";
import { getPrompt } from './utils/prompt';

@Injectable()
export class AiResumesService {
  async create(createAiResumeDto: CreateAiResumeDto) {
    const openai = new OpenAI({
      organization: process.env.OPENAI_ORGANIZATION_KEY ?? '',
      project: process.env.OPENAI_PROJECT_KEY ?? '',
      apiKey: process.env.OPENAI_API_KEY ?? ''
  });
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant to build resumes for user designed to output JSON.",
        },
        { role: "user", content: getPrompt(createAiResumeDto.userInput) },
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    }, {
      headers :{
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
        'Content-type': 'application/json;charset=UTF-8',
      }
    });
    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
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
