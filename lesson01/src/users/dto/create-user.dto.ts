import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
// Check the link for validators:
// https://github.com/typestack/class-validator#validation-decorators

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Role must be one of the following values: INTERN, ENGINEER, ADMIN'
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
