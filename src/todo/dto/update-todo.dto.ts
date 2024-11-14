// src/todo/dto/update-todo.dto.ts
import { IsOptional, IsString, MinLength,MaxLength,Length, IsEnum, IsNotEmpty } from 'class-validator';
import { ValidationMessages } from '../validation.messages';
import { StatusEnum } from '../status.enum';


export class UpdateTodoDto {

  @IsOptional()
  @MinLength(3, { message: ValidationMessages.NAME_TOO_SHORT })
  @MaxLength(10, { message: ValidationMessages.NAME_TOO_LONG })
  @IsString({ message: ValidationMessages.STRING })
  @IsNotEmpty({ message: ValidationMessages.NAME_REQUIRED })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: ValidationMessages.DESCRIPTION_REQUIRED })
  @MinLength(10, { message: ValidationMessages.DESCRIPTION_TOO_SHORT })
  @IsString({ message: ValidationMessages.STRING })
  description?: string;

  @IsOptional()
  @IsEnum(StatusEnum, { message: ValidationMessages.INVALID_STATUS })
  @IsNotEmpty({ message: ValidationMessages.STATUS_REQUIRED })
  status?: StatusEnum;
}
