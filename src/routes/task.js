const express = require("express");
const router = express.Router();

const taskController = require("../controller/taskController");
const { taskValidator } = require('../validators');

router.get("/", taskController.index);
router.get("/create", taskController.addView);
router.post('/',taskValidator, taskController.add);
router.get("/:id", taskController.editView);
router.put("/:id",taskValidator,taskController.edit);
router.delete("/:id", taskController.delete);
router.get("/filter-data/search", taskController.filter);
module.exports = router;
// checkPermission('admins.admins.create'),