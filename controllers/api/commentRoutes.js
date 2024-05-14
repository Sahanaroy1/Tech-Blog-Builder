const router = require("express").Router();
const { Comment } = require("../../models");
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", async (req, res) => {
  try {
    const postData = await Comment.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });

    if (!readerData) {
      res.status(404).json({ message: "No comment found in that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  let userData = "";
  try {
    try {
      userData = await User.findByPk(req.session.user_id, {});
    } catch (err) {
      console.log(err);
    }
    const newComment = await Comment.create({
      body: req.body.body,
      post_id: req.body.post_id,
      user_id: userData.name,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
