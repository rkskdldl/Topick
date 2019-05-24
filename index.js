var express =require('express');
var mysql =require('mysql');
var dbconfig =require('./database');
var connection = mysql.createConnection(dbconfig);
var bodyparser =require('body-parser');


let moment = require('moment');
var now =moment().format("YYYY-MM-DD HH:mm:ss");

var app =express();
app.use(express.json());

app.post('/register',(req,res)=>{

  console.log("등록 구간 들어옴");
  console.log(req.body)
  if(req.body!=undefined){

 
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
app.post('/setpoint',(req,res)=>{
  if(req.body._point!=undefined){
  connection.query('update user set _point =_point+? where nickname = ?;',[req.body._point,req.body.nickname],(err,result)=>{
    if(err){
      console.log(err);
      console.log("포인트 지급 오류");
        res.send("포인트 지급 오류");
    }else{
      
        console.log("포인트 지급 완료");
        
        res.send("포인트 지급 완료");

     
    }
  
  });
}
});
app.post('/setkey',(req,res)=>{
  if(req.body._key!=undefined){
    connection.query('update user set _key =_key+? where nickname = ?;',[req.body._key,req.body.nickname],(err,result)=>{
      if(err){
        console.log(err);
        console.log("키 지급 오류");
          res.send("키 지급 오류");
      }else{
          console.log("키 지급 완료");
          res.send("키 지급 완료");
      }
    });
  }
});
app.post('/usepoint',(req,res)=>{
  if(req.body._point!=undefined){
    connection.query('update user set _point =_point-? where nickname = ?;',[req.body._point,req.body.nickname],(err,result)=>{
      if(err){
        console.log(err);
        console.log("포인트 사용 오류");
          res.send("포인트 사용 오류");
      }else{
          console.log("포인트 사용 완료");
          res.send("포인트 사용 완료");
      }
    });
  }
});
app.post('/usekey',(req,res)=>{
  if(req.body._key!=undefined){
    connection.query('update user set _key =_key-? where nickname = ?;',[req.body._key,req.body.nickname],(err,result)=>{
      if(err){
        console.log(err);
        console.log("키 사용 오류");
          res.send("키 사용 오류");
      }else{
          console.log("키 사용 완료");
          res.send("키 사용 완료");
      }
    });
  }
});
app.post('/get_topiclist',(req,res)=>{
    connection.query('select * from topic',[],(err,result)=>{
      if(err){
        console.log(err);
        console.log("topic리스트 가져오기 오류");
          res.send("topic리스트 가져오기 오류");
      }else{
          console.log("topic리스트 가져오기 완료");
          res.send(result);
      }
    });
  
});
app.post('/register_topic',(req,res)=>{
  if(req.body!=undefined){
    var topic =[
      {
        "writer":req.body.writer,
        "enroll_date":new Date(now),
        "topic_content":req.body.topic_content,
        "topic_title":req.body.topic_title,
        "topic_category":req.body.topic_category
      }
    ];
    connection.query('insert into topic set ?',topic,(err,result)=>{
      if(err){
        console.log(err);
        console.log("topic 등록 오류");
          res.send("topic 등록 오류");
      }else{
          console.log("topic 등록 성공");
          res.send("topic 등록 성공");
      }
    });
  }
});
app.post('/register_comment',(req,res)=>{
  if(req.body!=undefined){
    var comment =[
      {
      "comment_content":req.body.comment_content,
      "writer":req.body.writer,
      "enroll_date":new Date(now),
      "topic_id":req.body.topic_id  
      }
    ];
    connection.query('insert into comment set ?',comment,(err,result)=>{
      if(err){
        console.log(err);
        console.log("덧글 등록 오류");
          res.send("덧글 등록 오류");
      }else{
          console.log("덧글 등록 성공");
          res.send("덧글 등록 성공");
      }
    });
  }
});
app.post('/edit_topic',(req,res)=>{
  if(req.body!=undefined){
    var topic =
      {
       
        "modified_date":new Date(now),
        "topic_content":req.body.topic_content,
        "topic_title":req.body.topic_title,
        "topic_category":req.body.topic_category
      }
    
    connection.query('update topic set ? where topic_id = ?',[topic,req.body.topic_id],(err,result)=>{
      if(err){
        console.log(err);
        console.log("topic 수정 오류");
          res.send("topic 수정 오류");
      }else{
          console.log("topic 수정 성공");
          res.send("topic 수정 성공");
      }
    });
  }
});
app.post('/edit_comment',(req,res)=>{
  if(req.body!=undefined){
    var comment =
    {
      "comment_content":req.body.comment_content,
      "modified_date":new Date(now),
      
      }
    
    connection.query('update comment set ? where comment_id = ?',[comment,req.body.comment_id],(err,result)=>{
      if(err){
        console.log(err);
        console.log("덧글 수정 오류");
          res.send("덧글 수정 오류");
      }else{
          console.log("덧글 수정 성공");
          res.send("덧글 수정 성공");
      }
    });
  }
});
app.post('/delete_topic',(req,res)=>{
if(req.body!=undefined){
connection.query('delete from topic where topic_id =?',[req.body.topic_id],(err,result)=>{
  if(err){
    console.log(err);
    console.log("topic 삭제 오류");
    res.send("topic 삭제 오류");
  }else{
    console.log("topic 삭제 성공");
    res.send("topic 삭제 성공");
  }
});
}
});
app.post('/delete_comment',(req,res)=>{
  if(req.body!=undefined){
  connection.query('delete from comment where comment_id =?',[req.body.comment_id],(err,result)=>{
    if(err){
      console.log(err);
      console.log("덧글 삭제 오류");
      res.send("덧글 삭제 오류");
    }else{
      console.log("덧글 삭제 성공");
      res.send("덧글 삭제 성공");
    }
  });
  }
  });
app.listen(3000,()=>{
console.log('Example app listening on port 3000!');
});
