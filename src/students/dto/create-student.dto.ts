import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StudentStatus } from '@prisma/client';

export class CreateStudentDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the student' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: '+8801712345678', description: 'Phone number' })
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString()
  @MaxLength(20)
  phone: string;

  @ApiProperty({ example: 'Grade 10', description: 'Student class/grade' })
  @IsNotEmpty({ message: 'Class is required' })
  @IsString()
  @MaxLength(50)
  class: string;

  @ApiProperty({ enum: StudentStatus, example: StudentStatus.ACTIVE, description: 'Student status' })
  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(StudentStatus, { message: 'Status must be either ACTIVE or INACTIVE' })
  status: StudentStatus;
}
