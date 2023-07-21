const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("test");
  res.send("Hello World!");
});

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:account", userControllers.read);
router.get("/users/:account/operations", userControllers.getUserOperations);

module.exports = router;
