var express =require('express');
var mysql =require('mysql');
var dbconfig =require('./database');
var connection = mysql.createConnection(dbconfig);
var bodyparser =require('body-parser');


let moment = require('moment');

var app =express();
app.use(express.json());

app.post('/register',(req,res)=>{

  console.log("등록 구간 들어옴");
  console.log(req.body)
  if(req.body!=undefined){

  var now =moment().format("YYYY-MM-DD HH:mm:ss");
  var user =[
    {
      "nickname":req.body.nickname,
      "phonenumber":req.body.phonenumber,
      "_point":req.body._point,
      "_key":req.body._key,
      "reg_date":new Date(now)
    }
  ];

  //회원가입 시작
  connection.query('select nickname from user where nickname=?',[req.body.nickname],(err,result)=>{
    if(err){
      console.log(err);
      }
      console.log("결과값은?")
     console.log(result.length);
      if(result.length==0){
        connection.query('insert into user set ?',user,(err,rows,fields)=>{
          if(err){
          console.log(err);
          }
          console.log(rows);
          res.send("회원가입 완료!");
          
        });
      }else{
        console.log("이미 존재하는 아이디입니다.");
        res.send("이미 존재하는 아이디입니다.");
        
      }
    

  });
  //회원가입 부분 끝
  
 

    
  
}

});
app.post('/login',(req,res)=>{

});

app.listen(3000,()=>{
console.log('Example app listening on port 3000!');
});
