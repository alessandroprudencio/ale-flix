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
import { MediaType } from '@prisma/client';
import { RequestWithUser } from '../auth/types/jwt-payload.interface';

@ApiTags('media')
@Controller('media')
@UseGuards(JwtAuthGuard)
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
  @ApiOperation({ summary: 'List all media' })
  @ApiResponse({ status: 200, description: 'Return all media' })
  @ApiQuery({ name: 'type', enum: MediaType, required: false })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('type') typeStr?: string,
    @Query('category') category?: string,
  ) {
    const type = typeStr
      ? MediaType[typeStr.toUpperCase() as keyof typeof MediaType]
      : undefined;
    return this.mediaService.findAll({ page, limit, type, category });
  }

  @Get('search')
  @ApiOperation({ summary: 'Search media' })
  @ApiResponse({ status: 200, description: 'Return search results' })
  async search(
    @Query('q') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.mediaService.search(query, { page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get media by id' })
  @ApiResponse({ status: 200, description: 'Return media details' })
  async findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured media' })
  @ApiResponse({ status: 200, description: 'Return featured media' })
  async getFeatured() {
    return this.mediaService.getFeatured();
  }

  @Get('continue-watching')
  @ApiOperation({ summary: 'Get continue watching media' })
  @ApiResponse({ status: 200, description: 'Return continue watching media' })
  getContinueWatching() {
    return this.mediaService.getContinueWatching();
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular media' })
  @ApiResponse({ status: 200, description: 'Return popular media' })
  async getPopular() {
    return this.mediaService.getPopular();
  }

  @Get('new-releases')
  @ApiOperation({ summary: 'Get new releases' })
  @ApiResponse({ status: 200, description: 'Return new releases' })
  async getNewReleases() {
    return this.mediaService.getNewReleases();
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
