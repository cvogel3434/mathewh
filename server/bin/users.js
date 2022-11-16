var fs = require('fs');
var path = require('path');
var userlist = [];
try{userlist = require('./users.json');}
catch{console.log('No Users')}

var auser=(au={})=>{
  if(!au){au={}}
  return{
    uname:au.uname||'',
    first:au.first||'',
    last:au.last||'',
    phone:au.phone||'',
    job:au.job||''
  }
}

var ROUTEuser=(data)=>{
  return new Promise((resolve,reject)=>{
      if(data && data.method && data.user!=undefined){
        let fltuser = auser(data.user);
        switch(data.method.toUpperCase()){
          case 'ADD':{
            return resolve(ADDuser(fltuser));
            break;
          }
          case 'GET':{
            let guser = GETuser(fltuser.uname);
            if(guser){return resolve({msg:`Searched user: ${fltuser.uname}`,success:true,result:guser});}
            else{return resolve({msg:`Searched user: ${fltuser.uname}`,success:false,result:null});}
            break;
          }
          case 'GETLIST':{
            return resolve({msg:'All users',success:true,result:userlist});
            break;
          }
          case 'UPDATE':{
            return resolve(UPDATEuser(fltuser));
            break;
          }
          case 'REMOVE':{
            return resolve(REMOVEuser(fltuser.uname));
            break;
          }
          default:{return resolve({msg:'NOT a User Method',success:false});}
        }
      }else{return resolve({msg:'Bad data..',success:false})}
  });
}

var GETuser=(uname)=>{
  for(let x=0,l=userlist.length;x<l;x++){
    if(userlist[x].uname==uname){return userlist[x];}
  }
  return null;
}

var ADDuser=(user)=>{
  return new Promise((resolve,reject)=>{
    if(user.uname!='' &&  !GETuser(user.uname)){
      userlist.push(user);
      fs.writeFile(path.join(__dirname,'users.json'),JSON.stringify(userlist),(err)=>{
        if(err){userlist.pop();return resolve({msg:err,success:false});}
        else{return resolve({msg:`User: ${user.uname} was added!`,success:true});}
      });
    }else{return resolve({msg:`User: ${user.uname} alread exist`,success:false});}
  });
}
var UPDATEuser=(user)=>{
  return new Promise((resolve,reject)=>{
    let update = false;
    let backup = null;
    let changnum = 0
    for(changnum,l=userlist.length;changnum<l;changnum++){
      if(userlist[changnum].uname==user.uname){
        backup=userlist[changnum];
        userlist[changnum]=user;
        update=true;
        break;
      }
    }
    if(update){
      fs.writeFile(path.join(__dirname,'users.json'),JSON.stringify(userlist),(err)=>{
        if(err){
          userlist[changnum]=backup;
          return resolve({msg:`User ${user.uname} was not updated`,success:true});
        }else{return resolve({msg:`User ${user.uname} was updated`,success:true})}
      });
    }else{return resolve({msg:`User ${user.uname} does not exist`,success:false})}
  })
}
var REMOVEuser=(uname)=>{
  return new Promise((resolve,reject)=>{
    if(GETuser(uname)){
      let tusers = [];
      for(let x=0,l=userlist.length;x<l;x++){
        if(userlist[x].uname!=uname){tusers.push(userlist[x])}
      }
      fs.writeFile(path.join(__dirname,'users.json'),JSON.stringify(tusers),(err)=>{
        if(err){return resolve({msg:err,success:false})}
        else{
          userlist=tusers;
          return resolve({msg:`User ${uname} was removed`,success:true})
        }
      });
    }else{return resolve({msg:`User ${uname} does not exist`,success:false});}
  })
}

module.exports={
  ROUTEuser
}
