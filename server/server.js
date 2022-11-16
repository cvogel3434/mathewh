
var http = require('http');
var users = require('./bin/users.js');
var port = 8080;


var server = http.createServer();
server.on('request',(req,res)=>{//cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
});
server.on('request',(req,res)=>{
  var data = '';
  req.on('data',chunk=>{data+=chunk;});
  req.on('end',()=>{
    try{data=JSON.parse(data);}catch{data={}}
    let waiter=null;
    console.log(data);
    switch(req.url.split('/')[1].toUpperCase()){
      case 'PING':{res.write(JSON.stringify({success:true,msg:'ping'}));break;}
      case 'USERS':{
        waiter = users.ROUTEuser(data.pack);
        break;
      }
      default:{res.write(JSON.stringify({success:false,msg:'not a command'}));}
    }
    if(waiter){
      waiter.then(
        answr=>{
          res.write(JSON.stringify(answr));
          res.end();
        }
      )
    }else{res.end();}
  });
});
server.listen(port,console.log(`listening on port: ${port}`));
