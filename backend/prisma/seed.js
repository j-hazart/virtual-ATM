const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const data = require("./data");

async function main() {
  await prisma.user.createMany({
    data: data.users,
  });

  await prisma.card.createMany({
    data: data.cards,
  });

  await prisma.bankOperation.createMany({
    data: data.bankOperations,
  });
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
