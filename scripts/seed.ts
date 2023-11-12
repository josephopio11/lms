// import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Photography" },
        { name: "Fitness" },
        { name: "Accounting" },
        { name: "Filming" },
        { name: "Engineering" },
        { name: "Technology" },
        { name: "Mathematics" },
        { name: "Automotives" },
        { name: "Biotech" },
        { name: "Hisotry" },
      ]
    });

    console.log("Success seeding database")
  } catch (error) {
    console.log("Error seeding the database categories: ", error)
  } finally {
    await database.$disconnect()
  }
}

// main()