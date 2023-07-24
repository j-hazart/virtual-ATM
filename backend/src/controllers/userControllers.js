const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function browse(req, res) {
  try {
    const users = await prisma.user.findMany({});

    users.forEach((user) => {
      delete user.solde;
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
    const user = await prisma.user.findUnique({
      where: {
        accountNumber: account,
      },
      include: {
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
    ].sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    delete user.bankOperationsFrom;
    delete user.bankOperationsTo;

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deposit(req, res, next) {
  const { amount, type, userTo } = req.body;
  const { account } = req.params;
  console.log(type);
  try {
    const userMakeOperation = await prisma.user.findUnique({
      where: {
        accountNumber: account,
      },
    });
    let newSolde = 0;
    if (type !== "virement") {
      if (type === "depot") {
        newSolde = parseFloat(userMakeOperation.solde) + parseFloat(amount);
      } else {
        newSolde = parseFloat(userMakeOperation.solde) - parseFloat(amount);
      }

      if (newSolde < 0) {
        res.sendStatus(401);
      } else {
        await prisma.user.update({
          where: {
            accountNumber: account,
          },
          data: {
            solde: newSolde,
          },
        });
        next();
      }
    } else {
      const userRecieveAmount = await prisma.user.findUnique({
        where: {
          accountNumber: userTo,
        },
      });
      if (parseFloat(userMakeOperation.solde) - parseFloat(amount) < 0) {
        res.sendStatus(401);
      } else {
        await prisma.user.update({
          where: {
            accountNumber: account,
          },
          data: {
            solde: parseFloat(userMakeOperation.solde) - parseFloat(amount),
          },
        });
        await prisma.user.update({
          where: {
            accountNumber: userTo,
          },
          data: {
            solde: parseFloat(userRecieveAmount.solde) + parseFloat(amount),
          },
        });
        next();
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
/* async function edit(req, res) {
  const { depositAmount } = req.body;
  const { account } = req.params;
  try {
    const updateUser = await prisma.user.update({
      where: {
        accountNumber: account,
      },
      data: {
        solde: solde + parseInt(depositAmount),
      },
    });
    console.log(updateUser.solde);
    updateUser ? res.sendStatus(200) : res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
} */

module.exports = {
  browse,
  read,
  getUserOperations,
  getUserAndPassToNext,
  deposit,
};
