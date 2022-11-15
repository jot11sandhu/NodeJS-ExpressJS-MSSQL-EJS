const express = require('express');
const app = express();
const fetch = require('node-fetch');


app.use(express.json());
app.use(express.urlencoded({extended : false}));

const db = require("./models/index.js");
db.sequelize.sync();

app.set('view engine','ejs');

app.get('/',(req, res)=>{
    res.render('home', {usertype: ""});
});

app.get('/addresult',(req,res)=>{
    res.render('addresult',{usertype: "teacher"});
});

app.post('/editresult',(req, res)=>{
    res.render('editresult',{usertype: "teacher", user: req.body});
});

app.post('/searchresult',async (req,res)=>{
    const data = await searchData(req.body.rollNumber,req.body.name);
    res.render('searchresult', {data: data, usertype: "student"});
});

app.get('/teacher', async (req,res)=>{
    const data = await fetchData()
    res.render('teacher', {data : data, usertype: "teacher"});
});

app.get('/student', (req,res)=>{
    res.render('student',{data: {}, usertype: "student"});
});

app.get('/logout', (req,res)=>{
    res.redirect('/');
});

require("./routes/teacher.routes")(app);

function fetchData(){
    return fetch(`${URL}${PORT}/api/results`,{method: 'GET'}).then(res=> res.json());
}

function searchData(rollNumber, name){
    return fetch(`${URL}${PORT}/api/results/${rollNumber}/${name}`,{method: 'POST'}).then(res=> res.json());
}

const URL = "http://localhost:";
const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT}`);
});
