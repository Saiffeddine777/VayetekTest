const { createAGameService, getAllGamesService, updateAGameService, deleteAGameService } = require("../Services/Games")

module.exports={
    async createAgame(req, res){
       const {gametitle} = req.body
       try{
          const result = await createAGameService(gametitle)
          res.status(200).json(result.command)
       }
       catch(err){
        res.status(500).json(err)
       }
    },
    async getAllGames(req,res){
      try{
         const result = await getAllGamesService()
         res.status(200).json(result.rows)
      }
      catch(err){
        res.status(500).json(err)
      }
    },

    async updateAGame(req,res){
        const data = req.body
        const id = req.params.id
       try{
        const result = await updateAGameService(data , id)
        res.status(200).json(result)
       }
       catch(err){
          res.status(500).json(err)
       }
    },

    async deleteAGame(req,res){
        const {id} = req.params
        try{
           result = await deleteAGameService(id)
           res.status(200).json(result)
        }
        catch(err){
          res.status(500).json(err)
        }
    }
}