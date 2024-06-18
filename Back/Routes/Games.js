const {Router } = require("express")
const { createAgame, getAllGames ,updateAGame, deleteAGame } = require("../Controllers/Games")

const router = Router()

router.post("/create", createAgame);
router.get("/all",getAllGames)
router.put("/update/:id" , updateAGame)
router.delete("/delete/:id", deleteAGame)
module.exports= router