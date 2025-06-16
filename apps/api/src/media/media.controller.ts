import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { MediaRating } from '@prisma/client';
import { RequestWithUser } from '../auth/types/jwt-payload.interface';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar nova mídia' })
  @ApiResponse({ status: 201, description: 'Mídia criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  create(
    @Body() createMediaDto: CreateMediaDto,
    @Request() req: RequestWithUser,
  ) {
    return this.mediaService.create(createMediaDto, req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Listar catálogo de mídias' })
  @ApiResponse({ status: 200, description: 'Lista de mídias' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'genre', required: false, type: String })
  @ApiQuery({ name: 'year', required: false, type: String })
  @ApiQuery({ name: 'rating', required: false, enum: MediaRating })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('genre') genre?: string,
    @Query('year') year?: string,
    @Query('rating') rating?: string,
    @Query('search') search?: string,
  ) {
    return this.mediaService.findAll({
      page,
      limit,
      genre,
      year,
      rating: rating as MediaRating | undefined,
      search,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma mídia' })
  @ApiResponse({ status: 200, description: 'Detalhes da mídia' })
  @ApiResponse({ status: 404, description: 'Mídia não encontrada' })
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Get(':id/trailer')
  @ApiOperation({ summary: 'Obter URL do trailer' })
  @ApiResponse({ status: 200, description: 'URL do trailer' })
  @ApiResponse({ status: 404, description: 'Mídia não encontrada' })
  getTrailerUrl(@Param('id') id: string) {
    return this.mediaService.getTrailerUrl(id);
  }

  @Get(':id/stream')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter URL de streaming' })
  @ApiResponse({ status: 200, description: 'URL de streaming' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Mídia não encontrada' })
  getStreamUrl(@Param('id') id: string) {
    return this.mediaService.getStreamUrl(id);
  }

  @Get('genres')
  @ApiOperation({ summary: 'Listar todos os gêneros disponíveis' })
  @ApiResponse({ status: 200, description: 'Lista de gêneros' })
  getGenres() {
    return this.mediaService.getGenres();
  }

  @Get('years')
  @ApiOperation({ summary: 'Listar todos os anos disponíveis' })
  @ApiResponse({ status: 200, description: 'Lista de anos' })
  getYears() {
    return this.mediaService.getYears();
  }
}
