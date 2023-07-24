const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkCardNumber(req, res) {
  const { cardNumber } = req.body;
  try {
    const card = await prisma.card.findUnique({
      where: {
        cardNumber,
      },
    });
    res.sendStatus(card ? 200 : 404);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getCardWithPinandPassToNext(req, res, next) {
  const { cardNumber } = req.body;
  try {
    const card = await prisma.card.findUnique({
      where: {
        cardNumber,
      },
    });

    if (card) {
      req.body.card = card;
      next();
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  checkCardNumber,
  /* checkCardPin, */
  getCardWithPinandPassToNext,
};
