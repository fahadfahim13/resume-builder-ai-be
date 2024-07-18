export class CreateUserDto {
  name: string;
  email: string;
  image: string;
}

export class FindUserDto {
  email: string;
}
