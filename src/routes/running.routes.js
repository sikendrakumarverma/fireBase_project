const express = require("express");
const router = express.Router();

const { createRunningSubGame,getAllRunningSubGame,getRunningSubGameById,updateRunningSubGame,
    deleteRunningSubGame} = require("../controllers/runningController");
//const upload = require('../middlewares/uploadFile');
//const {authJWT} = require('../middlewares/authJWT');

//----------------------------------------patt sub game Api's-------------------------------------------------------//
router.post("/create", createRunningSubGame);

router.get("/readAll", getAllRunningSubGame);

router.get("/read/:docId", getRunningSubGameById);

router.put("/update/:docId", updateRunningSubGame);

router.delete("/delete/:docId", deleteRunningSubGame);


module.exports = router;