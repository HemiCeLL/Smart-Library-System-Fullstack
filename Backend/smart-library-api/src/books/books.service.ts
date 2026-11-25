import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateBookDto) {
    return this.prisma.book.create({ data: dto });
  }

  findAll(filter?: { category?: string; status?: string; search?: string }) {
    const where: Prisma.BookWhereInput = {};
    if (filter?.category) {
      where.category = { equals: filter.category, mode: 'insensitive' };
    }
    if (filter?.status) {
      where.status = filter.status;
    }
    if (filter?.search) {
      where.title = { contains: filter.search, mode: 'insensitive' };
    }
    return this.prisma.book.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    await this.findOne(id);
    return this.prisma.book.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }

  async stats() {
    const [total, available, perCategory] = await Promise.all([
      this.prisma.book.count(),
      this.prisma.book.count({ where: { status: 'Tersedia' } }),
      this.prisma.book.groupBy({ by: ['category'], _count: { _all: true } }),
    ]);
    return {
      totalBooks: total,
      availableBooks: available,
      borrowedBooks: total - available,
      perCategory: perCategory.map((c) => ({
        category: c.category,
        count: c._count._all,
      })),
    };
  }
}
