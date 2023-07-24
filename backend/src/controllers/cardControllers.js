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

/* async function checkCardPin(req, res, next) {
  const { cardNumber, pin, card } = req.body;
  const isPinValidated = card.pin === pin;
  try {
    const updateCard = await prisma.card.update({
      where: {
        cardNumber,
      },
      data: {
        attempt: isPinValidated ? 4 : card.attempt - 1,
      },
    });

    isPinValidated
      ? next()
      : res.json({
          message:
            updateCard.attempt !== 0
              ? `Code PIN incorrect ${updateCard.attempt} tentatives restantes`
              : "Carte bloqué",
        });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
} */

module.exports = {
  checkCardNumber,
  /* checkCardPin, */
  getCardWithPinandPassToNext,
};
