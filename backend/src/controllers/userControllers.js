const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function browse(req, res) {
  try {
    const users = await prisma.user.findMany({
      include: {
        card: true,
      },
    });

    users.forEach((user) => {
      delete user.card.pin;
    });
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function read(req, res) {
  const { account } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        accountNumber: account,
      },
    });

    user ? res.status(200).json({ user }) : res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getUserAndPassToNext(req, res, next) {
  const account = req.body.card.userAccountNumber;
  try {
    const user = await prisma.user.findUnique({
      where: {
        accountNumber: account,
      },
    });

    if (user) {
      req.body.user = user;
      next();
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserOperations(req, res) {
  const { account } = req.params;
  try {
    /* const operations = await prisma.bankOperation.findMany({
      where: {
        OR: [{ userFrom: account }, { userTo: account }],
      },
    }); */
    const user = await prisma.user.findUnique({
      where: {
        accountNumber: account,
      },
      include: {
        card: true,
        bankOperationsFrom: true,
        bankOperationsTo: {
          where: {
            NOT: [{ userFrom: account }],
          },
        },
      },
    });

    user.operations = [
      ...user.bankOperationsFrom,
      ...user.bankOperationsTo,
    ].sort((a, b) => a.id - b.id);
    delete user.bankOperationsFrom;
    delete user.bankOperationsTo;

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  browse,
  read,
  getUserOperations,
  getUserAndPassToNext,
};
