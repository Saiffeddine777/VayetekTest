const pool = require("../Database")

module.exports={
    async createAmessageService(nickname, message){
        try{
         await pool.query("INSERT INTO messages (nickname , message) VALUES ( $1 , $2) ;",[nickname , message])
        }
        catch(err){
          console.log(err)
        }
        
    },

    async getAllMessagesService(){
        try{
          const { rows } = await pool.query("SELECT * FROM messages ;")
          return rows
         }
        catch(err){
            console.log(err)
        }
    }
}