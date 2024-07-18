export class CreateAiResumeDto {
  name: string;
  userInput: string;
  userEmail: string;
  userName?: string;
  userImage?: string;
}

export class FindResumeDto {
  userEmail: string;
}
