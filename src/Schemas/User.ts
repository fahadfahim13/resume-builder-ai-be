import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  image: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
