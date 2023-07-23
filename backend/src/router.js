const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("test");
  res.send("Hello World!");
});

const userControllers = require("./controllers/userControllers");
const cardControllers = require("./controllers/cardControllers");
const { verifyPin } = require("./services/auth");

router.get("/users", userControllers.browse);
router.get("/users/:account", userControllers.read);
router.get("/users/:account/operations", userControllers.getUserOperations);

router.post("/cards/verify", cardControllers.checkCardNumber);
router.post(
  "/login",
  cardControllers.checkCardAttempts,
  verifyPin,
  userControllers.read
);

module.exports = router;
