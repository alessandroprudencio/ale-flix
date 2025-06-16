import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { Prisma, Media, MediaRating } from '@prisma/client';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) { }

  async create(createMediaDto: CreateMediaDto, userId: string): Promise<Media> {
    const media = await this.prisma.media.create({
      data: {
        ...createMediaDto,
        userId,
      },
    });
    return media;
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    genre?: string;
    year?: string;
    rating?: MediaRating;
    search?: string;
  }): Promise<{ data: Media[]; total: number }> {
    const { page = 1, limit = 10, genre, year, rating, search } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.MediaWhereInput = {
      AND: [
        // Filtro por gênero
        genre ? { genres: { has: genre } } : {},
        // Filtro por ano
        year ? { releaseYear: year } : {},
        // Filtro por classificação
        rating ? { rating } : {},
        // Busca por título ou descrição
        search
          ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                description: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
          : {},
      ],
    };

    const [data, total] = await Promise.all([
      this.prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.media.count({ where }),
    ]);

    return { data, total };
  }

  async findOne(id: string): Promise<Media> {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      throw new NotFoundException(`Mídia com ID ${id} não encontrada`);
    }

    return media;
  }

  async getTrailerUrl(id: string): Promise<{ url: string }> {
    const media = await this.findOne(id);
    return { url: media.trailerUrl || '' };
  }

  async getStreamUrl(id: string): Promise<{ url: string; expiresAt: Date }> {
    const media = await this.findOne(id);
    if (!media.streamUrl) {
      throw new NotFoundException('URL de streaming não disponível');
    }

    // Simula uma URL de streaming que expira em 1 hora
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    return { url: media.streamUrl, expiresAt };
  }

  async getGenres(): Promise<string[]> {
    const media = await this.prisma.media.findMany({
      select: { genres: true },
    });

    const genres = new Set<string>();
    media.forEach((m) => m.genres.forEach((g) => genres.add(g)));
    return Array.from(genres);
  }

  async getYears(): Promise<string[]> {
    const media = await this.prisma.media.findMany({
      select: { releaseYear: true },
      distinct: ['releaseYear'],
      orderBy: { releaseYear: 'desc' },
    });
    return media.map((m) => m.releaseYear);
  }
}
