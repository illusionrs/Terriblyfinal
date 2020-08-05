const express=require('express');
const request=require('request');
var cors = require('cors');


const PORT= process.env.PORT || 5000;

const app=express();
app.use(cors())


app.get("/data",(req,res)=>{

    request('http://terriblytinytales.com/test.txt',
    
    function(error,response,body){


        if(!error && response.statusCode==200)
        {
            var parsebody=body;
            //console.log(parsebody)
            res.send(parsebody)

        }

    })
})

app.listen(PORT,()=> console.log(`express started at ${PORT}`));