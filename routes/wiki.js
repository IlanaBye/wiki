const express = require("express");
const router = express.Router();
const { addPage, wikiPage, main, notFoundPage } = require("../newViews");
const { User, Page } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    const page = await Page.create(req.body);

    await page.setUser(user);
    // await page.setAuthor(user); //magic method

    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });

    if (page === null) {
      res.status(404).send(notFoundPage());
    } else {
      const user = await page.getUser();
      res.send(wikiPage(page, user));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
