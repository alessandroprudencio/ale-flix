import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  IsEnum,
  IsArray,
  Min,
  Max,
  IsOptional,
  MaxLength,
} from 'class-validator'
import { MediaType, MediaStatus, MediaRating } from '@prisma/client'

export class CreateMediaDto {
  @ApiProperty({
    example: 'O Poderoso Chefão',
    description: 'Título da mídia',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string

  @ApiProperty({
    example:
      'A história da família Corleone, uma das mais poderosas famílias do crime organizado nos Estados Unidos.',
    description: 'Descrição da mídia',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @IsOptional()
  description?: string

  @ApiProperty({
    example: 175,
    description: 'Duração em segundos',
  })
  @IsNumber()
  @Min(1)
  duration: number

  @ApiProperty({
    example: '1972',
    description: 'Ano de lançamento',
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1900)
  @Max(new Date().getFullYear())
  releaseYear: number

  @ApiProperty({
    enum: MediaType,
    example: MediaType.MOVIE,
    description: 'Tipo da mídia',
  })
  @IsEnum(MediaType)
  type: MediaType

  @ApiProperty({
    enum: MediaRating,
    example: MediaRating.R,
    description: 'Classificação indicativa',
  })
  @IsEnum(MediaRating)
  rating: MediaRating

  @ApiProperty({
    example: ['Crime', 'Drama'],
    description: 'Gêneros da mídia',
  })
  @IsArray()
  @IsString({ each: true })
  genres: string[]

  @ApiProperty({
    example: ['Francis Ford Coppola'],
    description: 'Diretores da mídia',
  })
  @IsArray()
  @IsString({ each: true })
  directors: string[]

  @ApiProperty({
    example: ['Marlon Brando', 'Al Pacino'],
    description: 'Elenco da mídia',
  })
  @IsArray()
  @IsString({ each: true })
  cast: string[]

  @ApiProperty({
    example: 'https://example.com/thumbnail.jpg',
    description: 'URL da thumbnail',
  })
  @IsUrl()
  @IsNotEmpty()
  thumbnailUrl: string

  @ApiProperty({
    example: 'https://example.com/trailer.mp4',
    description: 'URL do trailer',
  })
  @IsUrl()
  trailerUrl: string

  @ApiProperty({
    example: 'https://example.com/stream.mp4',
    description: 'URL do stream',
  })
  @IsUrl()
  streamUrl: string

  @ApiProperty({
    enum: MediaStatus,
    example: MediaStatus.DRAFT,
    description: 'Status da mídia',
  })
  @IsEnum(MediaStatus)
  @IsOptional()
  status?: MediaStatus

  // @ApiProperty({
  //   example: '123e4567-e89b-12d3-a456-426614174000',
  //   description: 'ID do usuário',
  // })
  // @IsString()
  // @IsNotEmpty()
  // userId: string

  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'URL do poster',
  })
  @IsUrl()
  @IsNotEmpty()
  poster: string

  @ApiProperty({
    example: ['123e4567-e89b-12d3-a456-426614174000', 'abc12345-def6-7890-ghij-klmnopqrstuv'],
    description: 'IDs das categorias associadas à mídia',
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  categoryIds?: string[]
}
