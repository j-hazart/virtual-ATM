const argon2 = require("argon2");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function hashPin(req, res, next) {
  const hashOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    parallelism: 1,
    timeCost: 5,
  };

  argon2
    .hash(req.body.pin, hashOptions)
    .then((hashedPin) => {
      req.body.hashedPin = hashedPin;
      delete req.body.pin;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
}

async function verifyPin(req, res, next) {
  const { cardNumber, pin, card } = req.body;
  try {
    const match = await argon2.verify(card.hashedPin, pin);
    const updateCard = await prisma.card.update({
      where: {
        cardNumber,
      },
      data: {
        attempt: match ? 4 : card.attempt - 1,
      },
    });

    match
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
}

module.exports = {
  hashPin,
  verifyPin,
};
