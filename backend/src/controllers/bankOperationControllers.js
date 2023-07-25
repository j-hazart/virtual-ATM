const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function create(req, res) {
  try {
    await prisma.bankOperation.create({
      data: req.body,
    });

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  create,
};
