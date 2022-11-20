import {UserForm} from './bin/userform.js';
import {SETrowFROMobject,BUILDdistable} from './bin/vhc-tables.js';
import {SENDrequest} from './bin/server-requester.js';


// Setup Container
var usercont = document.createElement('div');
usercont.id='user-cont';
document.body.appendChild(usercont);
///////////////////

// Setup User Form
var userform = new UserForm();
userform.cont.id="myuserform";
usercont.appendChild(userform.cont);
///////////////////

// Setup User Table

var userheaders = { //headers to match user object (auser)
  uname:'User Name',
  first:'First',
  last:'Last',
  phone:'Phone',
  job:'Job',
  compensation:'Compensation'
}

var usertable = document.createElement('div');
usertable.classList.add('vg-gentable'); 

usercont.appendChild(usertable);//add table to

var LOADtable=()=>{
  SENDrequest('users',{
    method:'getlist',
    user:{}
  }).then(
    answr=>{
      console.log(answr);
      if(answr.success){
        answr.result.unshift(userheaders);
        BUILDdistable({
          list:answr.result,
          cont:usertable,
          header:true,
          eve:(row)=>{userform.loaduser(row);}
        });
      }
    }
  )
}
document.getElementsByClassName('form-action-bar')[0].addEventListener('click',(ele)=>{
  console.log('Refresh Table');
  LOADtable();
})
LOADtable();

////////////////////
/*
SENDrequest('users',{
  method:'getlist',
  user:{
    uname:'JOGH',
    first:'B',
    last:'TEST'
  }
}).then(
  res=>{
    console.log(res);
  }
)
*/
