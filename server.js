const express = require("express");
const app = express();

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));

var mysql=require('mysql')
var sql=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'todo'
})
sql.connect((err)=>{
    if(err) throw err;
    console.log("Connnected!");
})

app.get('/',(req,res)=>{
    var todo='Select * from list;';
    sql.query(todo,(err,data)=>{
        if(err) throw err
        console.log(data);
        res.render('index',{task:data})
    })
})

app.post('/add',(req,res)=>{
    var to =req.body.newtask;
    // console.log(to);
    var add ='INSERT INTO `list`(`todo`) VALUES (?)'
    sql.query(add,to,(err,data)=>{
        if(err) throw err
        // console.log(data)
        res.redirect('/')
    })
})

// app.post("/remove",(req,res)=>{
//     if(!req.body.checkbox){
//         res.redirect("/");
//     }
//     else{
//         if(req.body.notes==""){
//             var sql = "DELETE FROM tasks WHERE id="+req.body.checkbox+"";
//             con.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log("record deleted");
//             res.redirect("/");
//             });
//         }
//         else{
//             var sql = "UPDATE tasks SET task='"+req.body.notes+"' WHERE id="+req.body.checkbox+"";
//             con.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log("record deleted");
//             res.redirect("/");
//             });
//         }
//     }
// })
app.post('/remove',(req,res)=>{
    var id =req.body.items;
    var remove = 'DELETE FROM list WHERE sl_no = ?'
    sql.query(remove,id,(err,data)=>{
        if(err) throw err;
        // console.log(data)
        res.redirect('/')
    })
})

app.listen(3080)