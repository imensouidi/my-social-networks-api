const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/group.controller");

router.post("/", auth, ctrl.create);

module.exports = router;
