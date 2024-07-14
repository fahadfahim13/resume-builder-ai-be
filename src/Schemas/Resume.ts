import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Resume {
  @Prop({ required: true })
  userId: string;

  @Prop()
  resumeJson: string;

  @Prop()
  userPrompt: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);