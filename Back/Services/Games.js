const pool = require("../Database");

module.exports={
    async createAGameService(gametitle){
        try{
         const result = await  pool.query("INSERT INTO games (gametitle , isdone) VALUES ($1, $2)",[gametitle , false])
         return result 
        }
        catch(err){
          console.log(err)
        }
    },

    async getAllGamesService(){
        try{
          const result = await pool.query("SELECT * FROM games ;");
          return result
        }
        catch(err){
           console.log(err)
        }
    },
    async deleteAGameService(id){
         
        try{
           const result = await pool.query("DELETE FROM games where id = $1 ;" ,[id])
           return result
        }
        catch(err){
          console.log(err)
        }
    },

   async updateAGameService(data ,id){
     try{
        if (data.gametitle){
            await pool.query("UPDATE games SET gametitle = $1 WHERE id = $2 ;",[data.gametitle , id])
        }
        if (data.isdone){
            await pool.query("UPDATE games SET isdone = $1 WHERE id = $2 ;",[data.isdone , id])
        }
        return {message: "updated"}
       
     }
     catch(err){
        console.log(err)
     } 
   }
}