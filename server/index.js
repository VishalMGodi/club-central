const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'amaatra123',
    database: 'club_central',
    connectionLimit: 10
})

const PORT = 4000

const app = express();

function logger(req, res, next){
    console.log(`[${Date.now()}] ${req.method} ${req.url}`)
    next();
}

app.use(logger);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
  


app.use(bodyParser.json());

app.get('/test',(req,res)=>{
    pool.query(`select * from user where user_id=1`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        // console.log(fields);
        console.log(result);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});

app.get('/getComm/:id',(req,res)=>{
    var id=req.params.id;
    id=id.substring(1);
    pool.query(`select c.* from community c left join belongs_to_comm b on c.comm_id=b.comm_id where user_id=${id};`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        console.log(result);
        console.log(req.params.id);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});

app.get(`/commInfo/:id`,(req,res)=>{
    var id = req.params.id;
    id = id.substring(1);
    pool.query(`select c.* from community c where comm_id=${id}`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        console.log(result);
        console.log(req.params.id);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});

app.get(`/allClubs/:id`,(req,res)=>{
    var id = req.params.id;
    id = id.substring(1);
    pool.query(`select c.* from club c where comm_id=${id}`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        console.log(result);
        console.log(req.params.id);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});

app.get(`/myClubs/:id`,(req,res)=>{
    var id = req.params.id;
    id = id.substring(1);
    pool.query(`select c.* from club c left join member_of_club m on c.club_id = m.club_id where c.comm_id=${id} and m.user_id=1`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        console.log(result);
        console.log(req.params.id);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});

// app.post('/api/create-new-student',(req,res)=>{
//     // SRN, First name, Last name, Email, Password, Section, Semester
//     pool.query(
//     `insert into student values('${req.body.srn}', '${req.body.fname}', '${req.body.lname}', '${req.body.email}', '${req.body.password}', '${req.body.section}', '${req.body.semester}');`, 
//         (err, result, fields)=>{
//             if(err){
//                 res.json({status: 'error', message: err});
//                 console.log(err);
//                 return console.log("Error inserting student")
//             }
//             res.json({status: `Created New User ${req.body.srn}`})
//             // console.log(result);
//         }
//     )
// });



app.listen(PORT, ()=>{
    console.log(`Club Central Server started on port: ${PORT}`);
})