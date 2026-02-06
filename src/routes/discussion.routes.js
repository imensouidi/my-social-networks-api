const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/discussion.controller");

router.post("/group/:groupId", auth, ctrl.createForGroup);
router.post("/event/:eventId", auth, ctrl.createForEvent);
router.get("/:id", auth, ctrl.getDiscussion);

module.exports = router;
