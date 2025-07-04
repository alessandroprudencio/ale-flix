import { PrismaClient, MediaType, MediaRating, Category } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Criar usuário admin se não existir
  let adminUser = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  })
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('93+~N5!a', 10),
      },
    })
  }

  // Create categories se não existirem
  const categoryNames = ['Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica', 'Suspense']
  const categories: Category[] = []
  for (const name of categoryNames) {
    let category: Category | null = await prisma.category.findUnique({ where: { name } })
    if (!category) {
      category = await prisma.category.create({ data: { name } })
    }
    categories.push(category)
  }

  // Criar mídias se não existirem
  const media = [
    {
      title: 'O Poderoso Chefão',
      description:
        'A história da família Corleone, uma das mais poderosas famílias do crime organizado nos Estados Unidos.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80',
      poster:
        'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80',
      releaseYear: 1972,
      type: MediaType.MOVIE,
      rating: MediaRating.R,
      userRating: 4.8,
      duration: 175 * 60,
      isFeatured: true,
      streamUrl: 'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
      isPopular: true,
      userId: adminUser.id,
      categoryIds: [categories[3].id, categories[5].id],
    },
    {
      title: 'Breaking Bad',
      description:
        'Um professor de química do ensino médio é diagnosticado com câncer e começa a fabricar metanfetamina para garantir o futuro financeiro de sua família.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      poster:
        'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      releaseYear: 2008,
      type: MediaType.SERIES,
      rating: MediaRating.R,
      userRating: 4.9,
      duration: 45 * 60,
      streamUrl: 'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
      isPopular: true,
      userId: adminUser.id,
      categoryIds: [categories[3].id, categories[5].id],
    },
    {
      title: 'Interestelar',
      description:
        'Um grupo de astronautas viaja através de um buraco de minhoca no espaço para garantir a sobrevivência da humanidade.',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png',
      poster: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png',
      releaseYear: 2014,
      type: MediaType.MOVIE,
      rating: MediaRating.PG13,
      userRating: 4.7,
      duration: 169 * 60,
      streamUrl: 'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
      isPopular: true,
      userId: adminUser.id,
      categoryIds: [categories[4].id, categories[3].id],
    },
    {
      title: 'Duna: Parte 2',
      description:
        'Paul Atreides une forças com Chani e os Fremen para liderar a revolta contra aqueles que destruíram sua família.',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png',
      poster: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png',
      releaseYear: 2024,
      type: MediaType.MOVIE,
      rating: MediaRating.PG13,
      userRating: 4.6,
      duration: 166 * 60,
      releaseDate: new Date(),
      userId: adminUser.id,
      categoryIds: [categories[0].id, categories[4].id],
    },
    {
      title: 'Stranger Things',
      description:
        'Quando um garoto desaparece, sua mãe, um chefe de polícia e seus amigos devem enfrentar forças sobrenaturais terríveis para recuperá-lo.',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png',
      poster: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png',
      releaseYear: 2016,
      type: MediaType.SERIES,
      rating: MediaRating.PG13,
      userRating: 4.5,
      duration: 50 * 60,
      streamUrl: 'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
      isPopular: true,
      userId: adminUser.id,
      categoryIds: [categories[4].id, categories[5].id],
    },
  ]

  for (const item of media) {
    const { categoryIds, userId, title, ...mediaData } = item
    // Verifica se já existe mídia com o mesmo título
    let existingMedia = await prisma.media.findFirst({ where: { title } })
    if (!existingMedia) {
      await prisma.media.create({
        data: {
          ...mediaData,
          title,
          user: {
            connect: { id: userId },
          },
          categories: {
            create: categoryIds.map(categoryId => ({
              categoryId,
              mediaId: undefined, // This will be set automatically by Prisma
            })),
          },
        },
      })
    }
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
