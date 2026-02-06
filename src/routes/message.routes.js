const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/message.controller");

router.post("/:discussionId", auth, ctrl.createMessage);
router.get("/:discussionId", auth, ctrl.getMessages);

module.exports = router;
