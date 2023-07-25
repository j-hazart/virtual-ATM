const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
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

async function verifyPin(req, res) {
  const { pin, card, user } = req.body;
  try {
    if (card.attempt === 0) {
      res.status(401).json({ message: "Carte bloqué" });
    } else {
      const match = await argon2.verify(card.hashedPin, pin);
      const updateCard = await prisma.card.update({
        where: {
          cardNumber: card.cardNumber,
        },
        data: {
          attempt: match ? 4 : card.attempt - 1,
        },
      });

      if (match) {
        const expiresIn = 60;
        const payload = {
          account: user.accountNumber,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn,
        });

        delete req.body.user.solde;
        delete req.card;
        res.send({ token, expiresIn, user });
      } else {
        res.status(401).json({
          message:
            updateCard.attempt !== 0
              ? `Code PIN incorrect ${updateCard.attempt} tentatives restantes`
              : "Carte bloqué",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function verifyPinToEdit(req, res, next) {
  const { pin, newPin } = req.body;
  const { account } = req.params;
  try {
    const card = await prisma.card.findUnique({
      where: {
        userAccountNumber: account,
      },
    });
    const match = await argon2.verify(card.hashedPin, pin);
    const updateCard = await prisma.card.update({
      where: {
        cardNumber: card.cardNumber,
      },
      data: {
        attempt: match ? 4 : card.attempt - 1,
      },
    });
    if (match) {
      req.body.pin = newPin;
      delete req.body.newPin;
      next();
    } else {
      res.status(401).json({
        message:
          updateCard.attempt !== 0
            ? `Code PIN incorrect ${updateCard.attempt} tentatives restantes`
            : "Carte bloqué",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res
      .status(401)
      .send({ message: "Refusé ! Le token n'est pas valide ou a expiré !" });
  }
};

module.exports = {
  hashPin,
  verifyPin,
  verifyPinToEdit,
  verifyToken,
};
