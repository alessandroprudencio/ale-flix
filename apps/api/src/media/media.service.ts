import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { Prisma, Media, MediaType } from '@prisma/client';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) { }

  async create(createMediaDto: CreateMediaDto, userId: string): Promise<Media> {
    const { releaseYear, genres, ...rest } = createMediaDto;

    return this.prisma.media.create({
      data: {
        ...rest,
        releaseYear: Number(releaseYear),
        userId,
        rating: 0, // Default rating
        categories: {
          create: genres.map((name) => ({ name })),
        },
      },
    });
  }

  async findAll({
    page,
    limit,
    type,
    category,
  }: {
    page: number;
    limit: number;
    type?: MediaType;
    category?: string;
  }) {
    const skip = (page - 1) * limit;
    const where: Prisma.MediaWhereInput = {
      ...(type && { type }),
      ...(category && { categories: { some: { name: category } } }),
    };

    const [media, total] = await Promise.all([
      this.prisma.media.findMany({
        where,
        skip,
        take: limit,
        include: {
          categories: true,
        },
      }),
      this.prisma.media.count({ where }),
    ]);

    return {
      data: media,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async search(
    query: string,
    { page, limit }: { page: number; limit: number },
  ) {
    const skip = (page - 1) * limit;
    const where: Prisma.MediaWhereInput = {
      OR: [
        { title: { contains: query, mode: Prisma.QueryMode.insensitive } },
        {
          description: { contains: query, mode: Prisma.QueryMode.insensitive },
        },
      ],
    };

    const [media, total] = await Promise.all([
      this.prisma.media.findMany({
        where,
        skip,
        take: limit,
        include: {
          categories: true,
        },
      }),
      this.prisma.media.count({ where }),
    ]);

    return {
      data: media,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Media> {
    const media = await this.prisma.media.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });

    if (!media) {
      throw new NotFoundException(`Mídia com ID ${id} não encontrada`);
    }

    return media;
  }

  async getTrailerUrl(id: string): Promise<{ url: string }> {
    await this.findOne(id);
    return { url: '' }; // Removed trailerUrl as it's not in the schema
  }

  async getStreamUrl(id: string): Promise<{ url: string; expiresAt: Date }> {
    await this.findOne(id);
    // Simula uma URL de streaming que expira em 1 hora
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    return { url: `https://stream.example.com/${id}`, expiresAt }; // Mock URL since streamUrl is not in schema
  }

  async getGenres(): Promise<string[]> {
    const media = await this.prisma.media.findMany({
      select: { categories: true },
    });

    const genres = new Set<string>();
    media.forEach((m) => m.categories.forEach((c) => genres.add(c.name)));
    return Array.from(genres);
  }

  async getYears(): Promise<number[]> {
    const media = await this.prisma.media.findMany({
      select: { releaseYear: true },
      distinct: ['releaseYear'],
      orderBy: { releaseYear: 'desc' },
    });
    return media.map((m) => m.releaseYear);
  }

  async getFeatured() {
    return this.prisma.media.findFirst({
      where: { isFeatured: true },
      include: {
        categories: true,
      },
    });
  }

  getContinueWatching() {
    // Mock data for now
    return [
      {
        id: '1',
        title: 'Stranger Things',
        thumbnailUrl: 'https://example.com/stranger-things.jpg',
        releaseYear: 2016,
        type: 'SERIES',
        rating: 4.5,
        duration: 3600,
        progress: 1800,
      },
    ];
  }

  async getPopular() {
    return this.prisma.media.findMany({
      where: { isPopular: true },
      take: 10,
      include: {
        categories: true,
      },
    });
  }

  async getNewReleases() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return this.prisma.media.findMany({
      where: {
        releaseDate: {
          gte: oneMonthAgo,
        },
      },
      take: 10,
      include: {
        categories: true,
      },
    });
  }
}
