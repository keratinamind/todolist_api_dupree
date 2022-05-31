const express = require("express");
const listController = require("../controllers/listController");
const { authenticate } = require("../controllers/authController");

const router = express.Router();

router.get("/", authenticate, listController.getAllLists);
router.get("/:id", authenticate, listController.getListById);

router.post("/", authenticate, listController.createList);
router.put("/:id", authenticate, listController.updateList);
router.delete("/:id", authenticate, listController.deleteList);



module.exports = router;
