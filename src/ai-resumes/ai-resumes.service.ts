import { Injectable } from '@nestjs/common';
import {
  CreateAiResumeDto,
  FindResumeDto,
  GenerateDescDto,
} from './dto/create-ai-resume.dto';
import { UpdateAiResumeDto } from './dto/update-ai-resume.dto';

import { getDescriptionPrompt, getPrompt } from './utils/prompt';
import { AIChatSession } from './utils/AiModel';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Resume } from 'src/Schemas/Resume';
import { Model } from 'mongoose';
import { GetAiResumeDetailsDto } from './dto/get-ai-resume.dto';

@Injectable()
export class AiResumesService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<Resume>,
    private confiService: ConfigService,
    private userService: UsersService,
  ) {}

  async create(createAiResumeDto: CreateAiResumeDto) {
    if (createAiResumeDto.userEmail === '') {
      return null;
    }

    let user: any = await this.userService.findOneByEmail(
      createAiResumeDto.userEmail,
    );
    if (!user) {
      user = await this.userService.create({
        email: createAiResumeDto.userEmail,
        name: createAiResumeDto.userName ?? '',
        image: createAiResumeDto.userImage ?? '',
      });
    }

    const result = await AIChatSession(
      this.confiService.get<string>('API_KEYS.GEMINI') ?? '',
    ).sendMessage(getPrompt(createAiResumeDto.userInput));
    const res = result.response.text();

    const pushResume = new this.resumeModel({
      userId: user._id,
      name: createAiResumeDto.name,
      userEmail: createAiResumeDto.userEmail,
      resumeJson: JSON.stringify(res),
      userPrompt: createAiResumeDto.userInput,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
    });
    const finalData = await pushResume.save();
    return finalData;
  }

  async getDescription(userInput: GenerateDescDto) {
    if (userInput.userEmail === '') {
      return {
        status: 500,
        payload: 'Email is not valid!!',
      };
    }

    let user: any = await this.userService.findOneByEmail(userInput.userEmail);
    if (!user) {
      return {
        status: 404,
        payload: 'User Not Found!!',
      };
    }

    const result = await AIChatSession(
      this.confiService.get<string>('API_KEYS.GEMINI') ?? '',
    ).sendMessage(getDescriptionPrompt(userInput.userInput));
    const res = result.response.text();

    return res;
  }

  async findAll(findResume: FindResumeDto) {
    if (findResume.userEmail === '') {
      return null;
    }

    return this.resumeModel.find({
      userEmail: {
        $eq: findResume.userEmail,
      },
    });
  }

  async findOne(getAiResumeDto: GetAiResumeDetailsDto) {
    if (getAiResumeDto.userEmail === '') {
      return null;
    }
    return this.resumeModel.findOne({
      userEmail: {
        $eq: getAiResumeDto.userEmail,
      },
      _id: {
        $eq: getAiResumeDto.id,
      },
    });
  }

  async update(updateAiResumeDto: UpdateAiResumeDto) {
    const res = await this.resumeModel.updateOne(
      {
        _id: {
          $eq: updateAiResumeDto._id,
        },
      },
      {
        $set: {
          name: updateAiResumeDto.name,
          resumeJson: updateAiResumeDto.resumeJson,
          updatedAt: new Date().toUTCString(),
        },
      },
      { upsert: true },
    );
    return res;
  }

  async remove(id: string) {
    const res = await this.resumeModel.deleteOne({
      _id: {
        $eq: id,
      },
    });
    return res;
  }
}
