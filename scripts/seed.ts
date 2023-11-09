// import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Mathematics" },
        { name: "Music" },
        { name: "Engineering" },
        { name: "Chemistry" },
        { name: "Physics" },
        { name: "Business" },
        { name: "Law" },
        { name: "Psychology" },
        { name: "Social Science" },
        { name: "Art" },
        { name: "Languages" },
        { name: "History" },
        { name: "Geography" },
        { name: "Religion" },
        { name: "Science" },
        { name: "Technology" },
        { name: "Other" },
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