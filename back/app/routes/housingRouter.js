const express = require("express");
const router = express.Router();
const isUser = require ("../middlewares/isUser");
const housingCtrl = require("../controllers/housingController");
const multer = require ("../middlewares/multer");

// const Multer = require('multer');
// const multer = Multer({
//     storage: Multer.memoryStorage(),
//     limits: {
//         fileSize: 10 * 1024 * 1024,
//     },
// });


router.get("/:id", housingCtrl.getOneHousing);
router.get("/planet/:id", housingCtrl.getHousingByDestination);
router.get("/", housingCtrl.getAllHousing);
router.post("/", isUser, multer.single('picture'), housingCtrl.createHousing);
router.put("/:id", isUser, multer.single('picture'), housingCtrl.updateHousing);
router.delete("/:id", isUser, housingCtrl.deleteHousing);


module.exports = router;