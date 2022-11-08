const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 4000;


  require('colors')



require('dotenv').config()



// middle were 
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{

    res.send("server is runing")
})




const uri = `mongodb+srv://${ process.env.DB_User}:${process.env.DB_Password}@cluster0.0vygy0s.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
async function run(){

  try{
    const UserServiceCollection = client.db('ServiceUsers').collection('foodserviceDa');
    app.get('/home', async(req,res)=>{

      const quiry ={}
      const cursor =UserServiceCollection.find(quiry)
      const serviceData = await cursor.limit(3).toArray()
      res.send(serviceData)
    })
    app.get('/service', async(req,res)=>{

      const quiry ={}
      const cursor =UserServiceCollection.find(quiry)
      const serviceData = await cursor.toArray()
      res.send(serviceData)
    })
    app.get('/service/:id', async(req,res)=>{
      const id= req.params.id;


      const query ={ _id:ObjectId(id)}
      const dataDetails = await UserServiceCollection.findOne(query)
       
      res.send(dataDetails)
      console.log(dataDetails);
    })


  }
  finally{

  }
}
run().catch(error=>{
  console.log(error.bgRed)
})




app.listen(port,()=>{

    console.log(`sercer run ${port}`.bgRed);
})
  

