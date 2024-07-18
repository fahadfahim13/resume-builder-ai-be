import { Module } from '@nestjs/common';
import { AiResumesService } from './ai-resumes.service';
import { AiResumesController } from './ai-resumes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resume, ResumeSchema } from 'src/Schemas/Resume';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/Schemas/User';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule,
    UsersModule,
  ],
  controllers: [AiResumesController],
  providers: [UsersService, AiResumesService],
})
export class AiResumesModule {}
