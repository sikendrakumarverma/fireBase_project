const express = require("express");
const router = express.Router();

const { createPattSubGame,getAllPattSubGame,getPattSubGameById,updatePattSubGame,deletePattSubGame} = require("../controllers/pattController");
//const upload = require('../middlewares/uploadFile');
//const {authJWT} = require('../middlewares/authJWT');

//----------------------------------------patt sub game Api's-------------------------------------------------------//
router.post("/create", createPattSubGame);

router.get("/readAll", getAllPattSubGame);

router.get("/read/:docId", getPattSubGameById);

router.put("/update/:docId", updatePattSubGame);

router.delete("/delete/:docId", deletePattSubGame);


module.exports = router;