const express = require("express");
const router = express.Router();
const roleCtrl = require('../controllers/roleController');
const isUser = require ("../middlewares/isUser");


router.get('/', roleCtrl.getAllRole);
router.post('/', isUser, roleCtrl.createRole);
router.put('/:id', isUser, roleCtrl.updateRole);
router.delete('/:id', isUser, roleCtrl.deleteRole);


module.exports = router;