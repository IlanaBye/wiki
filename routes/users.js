const express = require("express");
const router = express.Router();
const { userList } = require("../views");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const authorPages = await Pages.findAll(req.params.userId, {
      include: [{ model: Page }],
    });

    if (!user) {
      res.status(404).send(notFoundPage());
    } else {
      res.send(userPages(user, user.pages));
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
