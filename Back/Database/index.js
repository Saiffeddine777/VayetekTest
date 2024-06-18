const {Pool} = require ("pg")

const config ={
    port : process.env.PORT,
    user : process.env.USERNAME,
    password: process.env.PASSWORD,
    database:process.env.DATABASE,
    host:process.env.HOST
}
const pool = new Pool(config)

module.exports  = pool

