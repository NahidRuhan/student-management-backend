import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentsDto } from './dto/query-students.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryStudentsDto) {
    const { search, status, class: studentClass, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = query;

    // Build where clause
    const where: Prisma.StudentWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (studentClass) {
      where.class = studentClass;
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Execute queries in parallel
    const [data, total] = await Promise.all([
      this.prisma.student.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.student.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({ where: { id } });

    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }

    return { data: student };
  }

  async create(dto: CreateStudentDto) {
    try {
      const student = await this.prisma.student.create({ data: dto });
      return { data: student };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Unique constraint violation (duplicate email)
        if (error.code === 'P2002') {
          throw new ConflictException('A student with this email already exists');
        }
      }
      this.logger.error('Failed to create student', error);
      throw new InternalServerErrorException('Failed to create student');
    }
  }

  async update(id: string, dto: UpdateStudentDto) {
    // Check if student exists
    await this.findOne(id);

    try {
      const student = await this.prisma.student.update({
        where: { id },
        data: dto,
      });
      return { data: student };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('A student with this email already exists');
        }
      }
      this.logger.error(`Failed to update student ${id}`, error);
      throw new InternalServerErrorException('Failed to update student');
    }
  }

  async remove(id: string) {
    // Check if student exists
    await this.findOne(id);

    await this.prisma.student.delete({ where: { id } });

    return { data: { id }, message: 'Student deleted successfully' };
  }
}
