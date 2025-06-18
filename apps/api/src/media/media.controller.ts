import { Controller, Get, Post, Body, Param, UseGuards, Query, Request } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
import { MediaService } from './media.service'
import { CreateMediaDto } from './dto/create-media.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { MediaType, UserRole } from '@prisma/client'
import { RequestWithUser } from '../auth/types/jwt-payload.interface'

@ApiTags('media')
@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new media' })
  @ApiResponse({ status: 201, description: 'Media created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only admins can create media' })
  async create(@Body() createMediaDto: CreateMediaDto, @Request() req: RequestWithUser) {
    return this.mediaService.create(createMediaDto, req.user.id)
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
    const type = typeStr ? MediaType[typeStr.toUpperCase() as keyof typeof MediaType] : undefined
    return this.mediaService.findAll({ page, limit, type, category })
  }

  @Get('search')
  @ApiOperation({ summary: 'Search media' })
  @ApiResponse({ status: 200, description: 'Return search results' })
  async search(
    @Query('q') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.mediaService.search(query, { page, limit })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get media by id' })
  @ApiResponse({ status: 200, description: 'Return media details' })
  async findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id)
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured media' })
  @ApiResponse({ status: 200, description: 'Return featured media' })
  async getFeatured() {
    return this.mediaService.getFeatured()
  }

  @Get('continue-watching')
  @ApiOperation({ summary: 'Get continue watching media' })
  @ApiResponse({ status: 200, description: 'Return continue watching media' })
  getContinueWatching() {
    return this.mediaService.getContinueWatching()
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular media' })
  @ApiResponse({ status: 200, description: 'Return popular media' })
  async getPopular() {
    return this.mediaService.getPopular()
  }

  @Get('new-releases')
  @ApiOperation({ summary: 'Get new releases' })
  @ApiResponse({ status: 200, description: 'Return new releases' })
  async getNewReleases() {
    return this.mediaService.getNewReleases()
  }

  @Get(':id/trailer')
  @ApiOperation({ summary: 'Obter URL do trailer' })
  @ApiResponse({ status: 200, description: 'URL do trailer' })
  @ApiResponse({ status: 404, description: 'Mídia não encontrada' })
  getTrailerUrl(@Param('id') id: string) {
    return this.mediaService.getTrailerUrl(id)
  }

  @Get(':id/stream')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter URL de streaming' })
  @ApiResponse({ status: 200, description: 'URL de streaming' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Mídia não encontrada' })
  getStreamUrl(@Param('id') id: string) {
    return this.mediaService.getStreamUrl(id)
  }

  @Get('genres')
  @ApiOperation({ summary: 'Listar todos os gêneros disponíveis' })
  @ApiResponse({ status: 200, description: 'Lista de gêneros' })
  getGenres() {
    return this.mediaService.getGenres()
  }

  @Get('years')
  @ApiOperation({ summary: 'Listar todos os anos disponíveis' })
  @ApiResponse({ status: 200, description: 'Lista de anos' })
  getYears() {
    return this.mediaService.getReleaseYears()
  }

  @Get('series')
  @ApiOperation({ summary: 'Listar todas as séries' })
  @ApiResponse({ status: 200, description: 'Lista de séries retornada com sucesso' })
  async getSeries() {
    return this.mediaService.getSeries()
  }

  @Get('movies')
  @ApiOperation({ summary: 'List all movies' })
  @ApiResponse({ status: 200, description: 'List of movies returned successfully' })
  async getMovies() {
    return this.mediaService.getMovies()
  }

  @Get('categories')
  @ApiOperation({ summary: 'List all categories' })
  @ApiResponse({ status: 200, description: 'List of categories returned successfully' })
  async getCategories() {
    return this.mediaService.getCategories()
  }

  @Get('categories/:id')
  @ApiOperation({ summary: 'Obter categoria por ID' })
  @ApiResponse({ status: 200, description: 'Categoria retornada com sucesso' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  async getCategoryById(@Param('id') id: string) {
    return this.mediaService.getCategoryById(id)
  }

  @Get('categories/:id/media')
  @ApiOperation({ summary: 'Listar mídias por categoria' })
  @ApiResponse({ status: 200, description: 'Lista de mídias retornada com sucesso' })
  async getMediaByCategory(@Param('id') categoryId: string) {
    return this.mediaService.getMediaByCategory(categoryId)
  }
}
