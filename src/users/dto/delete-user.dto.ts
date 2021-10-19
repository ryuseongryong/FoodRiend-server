import { IsBoolean } from 'class-validator';

export class DeleteUserDto {
  @IsBoolean()
  readonly checkDelete: boolean;
}
