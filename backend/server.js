const express=require("express");
const fileUpload = require("express-fileupload");
const multer = require('multer');
const upload = multer();


var cors = require('cors')
const app = express();
app.use(cors());
app.use(fileUpload());

const mysql = require('mysql');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ImageAnnotate'

})
db.connect(err=>{
    if(err){
        console.log(err);
    }
    console.log("MySQL connected")
})

app.get('/',(req,res)=>{
    const sql ="SELECT * FROM class"
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err)
        }

        res.send(results)
    })
})

app.post('/addAnno',(req,res)=>{
    //res.json('Succ');
    const formData = req.body;
    const sql = `INSERT INTO annotation (classID,xCoor,yCoor,leng, height,imgName ) VALUES (${formData.annotations},"${formData.imgName}")`
    console.log(sql);
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err)
        }

        res.send(results)
        console.log(results);
    })
})

app.get('/addAnno',(req,res)=>{
    const formData = req.body;
    const sql = `SELECT * FROM annotation`
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err)
        }

        res.send(results);

    })
})


app.post('/addClass',(req,res)=>{
    //res.json('Succ');
    const formData = req.body;
    const sql = `INSERT INTO class (name ) VALUES ("${formData.name}"")`
    console.log(sql);
    /*
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err)
        }

        res.send(results)
        console.log(results);
    })*/
})




app.listen(5000, ()=>console.log("server started in 5000"))

app.post('',(req,res)=>{

})