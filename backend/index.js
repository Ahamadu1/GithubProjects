import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from 'mysql2'


const app = express();
const corsOption = {
    origin:["http://localhost:5173"]
};

const dbasename = 'jobsDatabase'
const connection = mysql.creatConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "jobsDatabase"

})

const sql = `
    CREATE TABLE IF NOT EXISTS ${dbasename}(
    id INT AUTO_INCREMENT PRIMARY KEY,
    jobName varChar(100),
    company varChar(100),
    status varChar(15)
    date Date


)`;
connection.query(sql,(err,result =>{
    if (err){
        console.error('Error creating database', err);
    }else{
        console.log(`Database "${dbasename}" created or already exist.`)
    }
}));

app.use(cors(corsOption));
app.use(express.json())


let jobs = [];

connection.connect((err)=>{
    if (err) throw err;
    console.log("Connect to MySql!")
}

);
app.get("/api/data",(req,res)=>{
    const sql = `SELECT * FROM ${dbasename}`
    
    connection.query(sql,(err,results)=>{
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({success: false,message :"Server Error"});
        }

        
        res.status(200).json({success: true ,data:results})
    });

    
    
});
// app.delete((index)=>{

// })
app.post('/api/submit' , (req,res)=>{
    
    const {name,company,status,date} = req.body;
    const sql = `INSERT INTO ${dbasename} (name , company , status , date) VALUES(?,?,?,?)`
    connection.query(sql,[name, company,status,date],(err,result)=>{
        if (err){
            console.error("Database inserting error:",err);
            return res.status(500).json({success:false, message : "message server error"});

        } 
        
        res.status(200).json({success:true, message : "success"})
    });
        
     

});
// app.put(()=>{

// })
app.listen(5008,()=>{
    console.log(`Port 5008 is running.`)
})