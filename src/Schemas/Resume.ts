import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Resume {
  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  name: string;

  @Prop()
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
