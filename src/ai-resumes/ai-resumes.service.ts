import { Injectable } from '@nestjs/common';
import { CreateAiResumeDto, FindResumeDto } from './dto/create-ai-resume.dto';
import { UpdateAiResumeDto } from './dto/update-ai-resume.dto';

import { getPrompt } from './utils/prompt';
import { AIChatSession } from './utils/AiModel';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Resume } from 'src/Schemas/Resume';
import { Model } from 'mongoose';
import { User } from 'src/Schemas/User';

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

    console.log(createAiResumeDto.userInput);

    let user: any = await this.userService.findOneByEmail(
      createAiResumeDto.userEmail,
    );
    console.log({ user });
    if (!user) {
      user = await this.userService.create({
        email: createAiResumeDto.userEmail,
        name: createAiResumeDto.userName ?? '',
        image: createAiResumeDto.userImage ?? '',
      });
    }
    console.log({ user });
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
    console.log({ finalData });
    return finalData;
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

  async findOne(id: string) {
    return this.resumeModel.findById(id);
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
          resumeJson: updateAiResumeDto.resumeJson,
          updatedAt: new Date().toUTCString(),
        },
      },
      { upsert: true },
    );
    console.log(res.acknowledged);
    console.log(res.modifiedCount);
    console.log(res.upsertedId);
    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} aiResume`;
  }
}
