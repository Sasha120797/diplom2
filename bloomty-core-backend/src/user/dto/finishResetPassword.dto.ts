import { IsNotEmpty, IsString } from 'class-validator';

export class FinishResetPasswordDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
