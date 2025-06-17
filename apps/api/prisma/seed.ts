import { PrismaClient, MediaType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário admin
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
    },
  });

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Ação' } }),
    prisma.category.create({ data: { name: 'Aventura' } }),
    prisma.category.create({ data: { name: 'Comédia' } }),
    prisma.category.create({ data: { name: 'Drama' } }),
    prisma.category.create({ data: { name: 'Ficção Científica' } }),
    prisma.category.create({ data: { name: 'Suspense' } }),
  ]);

  // Criar mídias
  const media = [
    {
      title: 'O Poderoso Chefão',
      description:
        'A história da família Corleone, uma das mais poderosas famílias do crime organizado nos Estados Unidos.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80',
      releaseYear: 1972,
      type: MediaType.MOVIE,
      rating: 4.8,
      duration: 175 * 60,
      isFeatured: true,
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
      releaseYear: 2008,
      type: MediaType.SERIES,
      rating: 4.9,
      duration: 45 * 60,
      isPopular: true,
      userId: adminUser.id,
      categoryIds: [categories[3].id, categories[5].id],
    },
    {
      title: 'Interestelar',
      description:
        'Um grupo de astronautas viaja através de um buraco de minhoca no espaço para garantir a sobrevivência da humanidade.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      releaseYear: 2014,
      type: MediaType.MOVIE,
      rating: 4.7,
      duration: 169 * 60,
      isPopular: true,
      userId: adminUser.id,
      categoryIds: [categories[4].id, categories[3].id],
    },
    {
      title: 'Duna: Parte 2',
      description:
        'Paul Atreides une forças com Chani e os Fremen para liderar a revolta contra aqueles que destruíram sua família.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      releaseYear: 2024,
      type: MediaType.MOVIE,
      rating: 4.6,
      duration: 166 * 60,
      releaseDate: new Date(),
      userId: adminUser.id,
      categoryIds: [categories[0].id, categories[4].id],
    },
    {
      title: 'Stranger Things',
      description:
        'Quando um garoto desaparece, sua mãe, um chefe de polícia e seus amigos devem enfrentar forças sobrenaturais terríveis para recuperá-lo.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      releaseYear: 2016,
      type: MediaType.SERIES,
      rating: 4.5,
      duration: 50 * 60,
      isPopular: true,
      userId: adminUser.id,
      categoryIds: [categories[4].id, categories[5].id],
    },
  ];

  for (const item of media) {
    const { categoryIds, ...mediaData } = item;
    await prisma.media.create({
      data: {
        ...mediaData,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
