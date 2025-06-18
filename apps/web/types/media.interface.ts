export type Category =
  | 'ACTION'
  | 'ADVENTURE'
  | 'ANIMATION'
  | 'COMEDY'
  | 'CRIME'
  | 'DOCUMENTARY'
  | 'DRAMA'
  | 'FAMILY'
  | 'FANTASY'
  | 'HISTORY'
  | 'HORROR'
  | 'MUSIC'
  | 'MYSTERY'
  | 'ROMANCE'
  | 'SCIENCE_FICTION'
  | 'TV_MOVIE'
  | 'THRILLER'
  | 'WAR'
  | 'WESTERN'

export type Rating =
  | 'G'
  | 'PG'
  | 'PG-13'
  | 'R'
  | 'NC-17'

export interface Media {
  id: string
  title: string
  description: string
  releaseYear: number
  type: 'MOVIE' | 'SERIES'
  rating: Rating
  userRating: number // nota média de avaliação
  duration: number
  categories: Category[]
  thumbnailUrl: string
  poster: string
  createdAt: string
  updatedAt: string
}

export interface CreateMediaDto {
  title: string
  description: string
  releaseYear: number
  type: 'MOVIE' | 'SERIES'
  duration: number
  categories: Category[]
  thumbnailUrl: string
  poster: string
}

export interface UpdateMediaDto extends Partial<CreateMediaDto> {
  id: string
} 