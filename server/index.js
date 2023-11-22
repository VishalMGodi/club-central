const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'amaatra123',
    database: 'club_central2',
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
    console.log(req.query);
    pool.query(`select * from user where user_id=1`, (err, result, fields)=>{
        if(err){
            return console.log(err, "err");
        }
        // console.log(fields);
        // console.log(result);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});


app.get('/checkUser',(req,res)=>{
    console.log("/checkUser", req.query);
    var uname = username=`username='${req.query.username}'`
    var email = email=`email='${req.query.email}'`
    var pword = `and passwd='${req.query.password}'`
    var query ="select * from user where "+email;
     
    if(!req.query.google){
        // query+= (req.query.signup?"or":"and") + " "+ uname
        if( req.query.signup) query +=  "or "+uname 
        if( !req.query.signup) query +=  pword
    }
    console.log("query", query)
    pool.query(query, (err, result, fields)=>{
        if(err){
            return console.log(err, "err");
        }
        // console.log(fields);
        // console.log(result);
        // console.log(req)
        // console.log(res)
        console.log(result)
        res.json(result);
    })
    // res.json({status: true})
});

app.get('/getComm/',(req,res)=>{
    const id=req.query.userid;
    pool.query(`select c.* from community c left join belongs_to_comm b on c.comm_id=b.comm_id where user_id=${id};`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        // console.log(result);
        // console.log(req.params.id);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});

app.get(`/commInfo/`,(req,res)=>{
    const id = req.query.comm_id;
    pool.query(`select c.* from community c where comm_id=${id};`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        // console.log(result);
        // console.log(req.params.id);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});

app.get(`/clubInfo/`,(req,res)=>{
    const id = req.query.club_id;
    pool.query(`select c.* from club c where club_id=${id};`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        // console.log(result);
        // console.log(req.params.id);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});


app.get(`/allClubs/`,(req,res)=>{
    const id = req.query.comm_id;
    pool.query(`select c.* from club c where comm_id=${id};`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        // console.log(result);
        // console.log(req.params.id);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});

app.get(`/myClubs/`,(req,res)=>{
    const comm=req.query.comm;
    const user=req.query.user;
    pool.query(`select c.* from club c left join member_of_club m on c.club_id = m.club_id where c.comm_id=${comm} and m.user_id=${user};`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        // console.log(result);
        // console.log(req.params.id);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});

app.get(`/allEvents/`,(req,res)=>{
    const id = req.query.comm_id
    pool.query(`select * from event e left join club c on c.club_id=e.club_id where c.comm_id=${id} order by event_id desc`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        // console.log(result);
        // console.log(req.params.id);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});

app.get(`/commReq/`,(req,res)=>{
    const id = req.query.user_id
    pool.query(`select * from comm_requests r left join community c on r.comm_id=c.comm_id where user_id = ${id};`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        // console.log(result);
        // console.log(req.params.id);
        // console.log(req)
        // console.log(res)
        res.json(result);
    })
    // res.json({status: true})
});

app.get(`/clubReq/`,(req,res)=>{
    const user_id = req.query.user_id
    const comm_id = req.query.comm_id
    pool.query(`select * from club_requests r left join club c on r.club_id=c.club_id where user_id = ${user_id} and comm_id = ${comm_id};`, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        res.json(result);
    })
    // res.json({status: true})
});


app.post('/createUser',(req,res)=>{
    // SRN, First name, Last name, Email, Password, Section, Semester
    console.log(req.body);
    
    // res.json({message: "Success"})
    pool.query(
    `insert into user(username, email, passwd, date_of_birth) values ('${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.dob}');`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error inserting student")
            }
            res.json({status: `Created New user`})
            console.log(result);
        }
    )
});

app.post('/createEvent',(req,res)=>{
    // SRN, First name, Last name, Email, Password, Section, Semester
    console.log(req.body);
    
    // res.json({message: "Success"})
    pool.query(
    `insert into event(club_id, event_name, prize_money, team_size, event_type, event_mode, event_description, start_time, end_time, event_link)
    values(${req.body.club_id},'${req.body.event_name}',${req.body.prize_money},'${req.body.team_size}','${req.body.event_type}','${req.body.event_mode}','${req.body.event_description}','${req.body.start_time}','${req.body.end_time}','${req.body.event_link}');`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error inserting student")
            }
            res.json({status: `Created New Event`})
            console.log(result);
        }
    )
});

app.post('/createComm',(req,res)=>{
    // SRN, First name, Last name, Email, Password, Section, Semester
    console.log(req.body);
    
    // res.json({message: "Success"})
    pool.query(
    `call newComm('${req.body.comm_name}','${req.body.comm_description}',${req.body.comm_head_id});`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error")
            }
            res.json({status: `Created New Community`})
            console.log(result);
        }
    )
});

app.post('/createClub',(req,res)=>{
    // SRN, First name, Last name, Email, Password, Section, Semester
    // console.log(req.body);
    
    // res.json({message: "Success"})
    pool.query(
    `call newClub('${req.body.club_name}','${req.body.club_description}',${req.body.comm_id},'${req.body.club_head}');`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error")
            }
            res.json({status: `Created New Club`})
            console.log(result);
        }
    )
});

app.post('/userComm',(req,res)=>{
    // SRN, First name, Last name, Email, Password, Section, Semester
    // console.log(req.body);
    
    // res.json({message: "Success"})
    pool.query(
    `call sendCommReq('${req.body.username}',${req.body.comm_id});`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error")
            }
            res.json({status: `Sent Request`})
            console.log(result);
        }
    )
});

app.post('/userClub',(req,res)=>{
    // SRN, First name, Last name, Email, Password, Section, Semester
    // console.log(req.body);
    
    // res.json({message: "Success"})
    pool.query(
    `call sendClubReq('${req.body.username}',${req.body.club_id});`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error")
            }
            res.json({status: `Sent Request`})
            console.log(result);
        }
    )
});

app.post('/handleCommReq',(req,res)=>{
    console.log(req.body)
    pool.query(
    `call handleCommReq('${req.body.final_decision}',${req.body.req_id});`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error")
            }
            res.json({status: `Done`})
            console.log(result);
        }
    )
});

app.post('/handleClubReq',(req,res)=>{
    console.log(req.body)
    pool.query(
    `call handleClubReq('${req.body.final_decision}',${req.body.req_id});`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error")
            }
            res.json({status: `Done`})
            console.log(result);
        }
    )
});

app.post('/removeFromClub',(req,res)=>{
    console.log(req.body)
    pool.query(
    `delete from member_of_club where club_id = ${req.body.club_id} and user_id = ${req.body.user_id}`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error")
            }
            res.json({status: `Done`})
            console.log(result);
        }
    )
});

app.post('/removeFromComm',(req,res)=>{
    console.log(req.body)
    pool.query(
    `delete from belongs_to_comm where comm_id = ${req.body.comm_id} and user_id = ${req.body.user_id}`, 
        (err, result, fields)=>{
            if(err){
                res.json({status: 'error', message: err});
                console.log(err);
                return console.log("Error")
            }
            res.json({status: `Done`})
            console.log(result);
        }
    )
});

app.listen(PORT, ()=>{
    console.log(`Club Central Server started on port: ${PORT}`);
})