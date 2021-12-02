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
    const anno = formData.annotations.split(',');
    const annoLen = anno.length;
    console.log(anno);
    for(let i=0;i<annoLen;i=i+5){
        let thisAnno = `${anno[i]},${anno[i+1]},${anno[i+2]},${anno[i+3]},${anno[i+4]}`
        let sql = `INSERT INTO annotation (classID,xCoor,yCoor,leng, height,imgName ) VALUES (${thisAnno},"${formData.imgName}")`
        db.query(sql,(err,results)=>{
            if(err){
                console.log(err)
            }
    
            console.log(results);
        })
    };
    
    res.send("Success")

    /** */
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




app.listen(5000, ()=>console.log("server started in 5000"))

app.post('',(req,res)=>{

})