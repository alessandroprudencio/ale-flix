import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateMediaDto } from './dto/create-media.dto'
import { Prisma, Media, MediaType } from '@prisma/client'

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) { }

  async create(createMediaDto: CreateMediaDto, userId: string): Promise<Media> {
    const { categoryIds, ...mediaData } = createMediaDto

    return this.prisma.media.create({
      data: {
        ...mediaData,
        user: {
          connect: { id: userId },
        },
        categories: {
          connect: categoryIds?.map(id => ({ id })) ?? [],
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  async findAll({
    page = 1,
    limit = 10,
    type,
    category,
  }: {
    page: number
    limit: number
    type?: MediaType
    category?: string
  }) {
    const skip = (page - 1) * limit
    const where: Prisma.MediaWhereInput = {
      ...(type && { type }),
      ...(category && {
        categories: {
          some: {
            category: {
              name: category,
            },
          },
        },
      }),
    }

    const [media, total] = await Promise.all([
      this.prisma.media.findMany({
        skip,
        take: limit,
        where,
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.media.count({ where }),
    ])

    return {
      data: media,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async search(query: string, { page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit
    const where: Prisma.MediaWhereInput = {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    }

    const [media, total] = await Promise.all([
      this.prisma.media.findMany({
        skip,
        take: limit,
        where,
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.media.count({ where }),
    ])

    return {
      data: media,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findOne(id: string): Promise<Media> {
    const media = await this.prisma.media.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    if (!media) {
      throw new NotFoundException(`Mídia com ID ${id} não encontrada`)
    }

    return media
  }

  async getTrailerUrl(id: string): Promise<{ url: string }> {
    await this.findOne(id)
    return { url: '' }
  }

  async getStreamUrl(id: string): Promise<{ url: string; expiresAt: Date }> {
    await this.findOne(id)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
    return { url: `https://stream.example.com/${id}`, expiresAt }
  }

  async getGenres(): Promise<string[]> {
    const categories = await this.prisma.category.findMany({
      select: { name: true },
    })
    return categories.map(c => c.name)
  }

  async getReleaseYears(): Promise<number[]> {
    const media = await this.prisma.media.findMany({
      select: { releaseDate: true },
      distinct: ['releaseDate'],
      orderBy: { releaseDate: 'desc' },
    })
    return media.map(m => m.releaseDate.getFullYear())
  }

  async getFeatured(): Promise<Media | null> {
    return this.prisma.media.findFirst({
      where: { isFeatured: true },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  getContinueWatching() {
    return [
      {
        id: '1',
        title: 'Stranger Things',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png',
        releaseYear: 2016,
        type: 'SERIES',
        rating: 4.5,
        duration: 3600,
        progress: 1800,
      },
    ]
  }

  async getPopular(): Promise<Media[]> {
    return this.prisma.media.findMany({
      where: { isPopular: true },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  async getNewReleases() {
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    return this.prisma.media.findMany({
      where: {
        releaseDate: {
          gte: oneMonthAgo,
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  async getSeries() {
    return this.prisma.media.findMany({
      where: {
        type: MediaType.SERIES,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  async getMovies() {
    return this.prisma.media.findMany({
      where: {
        type: MediaType.MOVIE,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  async getCategories() {
    return this.prisma.category.findMany({
      include: {
        _count: {
          select: {
            media: true,
          },
        },
      },
    })
  }

  async getMediaByCategory(categoryId: string) {
    return this.prisma.media.findMany({
      where: {
        categories: {
          some: {
            categoryId,
          },
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  async getCategoryById(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        media: {
          include: {
            media: true,
          },
        },
      },
    })
  }
}
