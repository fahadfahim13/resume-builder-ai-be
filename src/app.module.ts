import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiResumesModule } from './ai-resumes/ai-resumes.module';

@Module({
  imports: [AiResumesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
