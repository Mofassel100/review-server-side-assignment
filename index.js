const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 4000;


  require('colors')



require('dotenv').config()
// middle were 
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{

    res.send("server is runing")
})


app.listen(port,()=>{

    console.log(`sercer run ${port}`.bgRed);
})
  

