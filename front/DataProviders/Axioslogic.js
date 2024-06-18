import axios from "axios"
const url = import.meta.env.VITE_BACKEND_URL
export const fetchData = async()=>{
   try{
      const {data} = await axios.get(`${url}/api/games/all`)
      return data
   }
   catch(err){
     console.error(err)
   }
}

export const insertData = async(gametitle)=>{
   try{ 
    await axios.post(`${url}/api/games/create`,{gametitle})
   }
   catch(err){
     console.error(err)
   }
}

export const updateGame = async(id , isdone)=>{
    try{
        await axios.put(`${url}/api/games/update/${id}`,{isdone})
    }
    catch(err){
      console.log(err)
    }
}

export const deleteGame = async (id)=>{
    try{
        await axios.delete(`${url}/api/games/delete/${id}`)
    }
    catch(err){
      console.log(err)
    }
}