const express = require("express");
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");

router.get("/", (req, res, next) => {
  res.send("got to GET /wiki/");
});

router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: "",
      content: "",
    });

    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
