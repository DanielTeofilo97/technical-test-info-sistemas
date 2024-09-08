import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {

    // Create adm
    const password = await bcrypt.hash('12345678', await bcrypt.genSalt());
    const user = await prisma.user.create({
      data: {
        name: 'Galvão Alves',
        cpf: '51103282000',
        password: password,
        role: 0,
      },
    });

    // Create vehicles

    const fakeVehicles = [
      {
        plate: "HRO3E24",
        chassis: "8AD3CN6BTBG035202",
        renavam: "52036153225",
        model: "607 Sedan 3.0 V6",
        brand: "Peugeot",
        year: 2024,
        idUserCreate: user.id,
        idUserUpdate: user.id
      },
      {
        plate: "HEO3E29",
        chassis: "8AD3CN6BTBG035202",
        renavam: "52036153225",
        model: "Bravo Tjet 1.4 Turbo",
        brand: "Fiat",
        year: 2024,
        idUserCreate: user.id,
        idUserUpdate: user.id
      },
      {
        plate: "HCH1669",
        chassis: "8AD3CN6BTBG035203",
        renavam: "52036153223",
        model: "Prisma",
        brand: "GM",
        year: 2024,
        idUserCreate: user.id,
        idUserUpdate: user.id
      },
    ]

    await prisma.vehicle.createMany({
      data: fakeVehicles,
    });

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
