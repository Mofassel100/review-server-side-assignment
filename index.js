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
    const ReviesCollecton = client.db('ServiceUsers').collection('reviewsCollect');
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

    // my riviews added 

    app.get('/myreviews',async(req,res)=>{
let query = {};
if(req.query.email){
  query={

    email:req.query.email
  }

}
const cursor = ReviesCollecton.find(query)
const myreviess = await cursor.toArray()
res.send(myreviess)

    })

    // --------------
    // app.get('/services/:id', async(req,res)=>{
    //   const id= req.params.id;


    //   const query ={ _id:ObjectId(id)}
    //   const dataDetails = await ReviesCollecton.find(query)
       
    //   res.send(dataDetails)
    //   console.log(dataDetails);
    // })

    
    // my service added
    app.post('/myservice',async(req,res)=>{
const data = req.body
const result = await UserServiceCollection.insertOne(data)
res.send(result)

       
    })
    // Revies 
   
    app.post('/reviews',async(req,res)=>{


      const dataReview = req.body;
      const dataRev= await ReviesCollecton.insertOne(dataReview);
      res.send(dataRev)

    })
// all review data loaded

// app.get('/allreviews/:id',async(req,res)=>{
//   const {id}= req.params;

//   const query = {_id:ObjectId(id)}
//   const cursor = ReviesCollecton.find(query)
//   const result = await cursor.toArray()
//   res.send(result)
// })
    //updat reviw data loaded 
    app.get('/reviews',async(req,res)=>{

      const query= {}
      const cursor=  ReviesCollecton.find(query)
      const result =await cursor.toArray()
    
      
   
      res.send(result)
    })


    app.patch ('/reviews/:id',async(req,res)=>{
      const id= req.params.id;
      const review = req.body.review;
      console.log(review);

      const query = {_id:ObjectId(id)}
      console.log(query);
      const updateDocs={

        $set:{
          review:review

        }
        
      }
      const result = await ReviesCollecton.updateMany(query,updateDocs)
      res.send(result)
      console.log(result);
    })
    // reviews delete
    app.delete('/reviews/:id',async(req,res)=>{
      const id=req.params.id
     
      const query= { _id : ObjectId(id)}
  
      const result = await ReviesCollecton.deleteOne(query)
      
      res.send(result);
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
  

