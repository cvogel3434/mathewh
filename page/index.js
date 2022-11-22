import {UserForm} from './bin/userform.js';
import {SETrowFROMobject,BUILDdistable} from './bin/vhc-tables.js';
import {SENDrequest} from './bin/server-requester.js';

// Get grid elements
var gridone = document.getElementById("gridone");
var gridtwo = document.getElementById("gridtwo");
var gridthree = document.getElementById("gridthree")

// Setup Container
var usercont = document.createElement('div');
usercont.id='user-cont';
gridone.appendChild(usercont);
///////////////////

// Setup Popup Container
var popupcont = document.createElement('div');
popupcont.className = 'userformpopupcont';
gridthree.appendChild(popupcont);

var popup = document.createElement('span');
popup.className = 'userformpopup';
popup.id = "form-popup";
popupcont.appendChild(popup);
///////////////////

// Setup User Form
var userform = new UserForm();
userform.cont.id="myuserform";
popup.appendChild(userform.cont);
///////////////////

// Setup Create New Element Buttton
var createnew = document.createElement("button");
gridtwo.appendChild(createnew);
createnew.className = "create-new-button";
createnew.id = "new-user-button"
createnew.innerHTML = "Create New User"

document.getElementById("new-user-button").addEventListener('click', (ele)=>{
  var popup = document.getElementById("form-popup");
  if (popup) {
    //Reload the table
    console.log('Refresh Table');
    LOADtable();
    //If not already visible, set to visible
    if(window.getComputedStyle(popup).visibility == "visible"){
      console.log("Element is visible.");
    } else {
      popup.classList.toggle("show");
      console.log("Element is hidden.");
    }

    //I would likely want to make this is its function in the userform class
    userform.form = undefined;
    userform.actions.save.title='add';

    popup.style.top = "-50px";
    popup.style.left = "0px";
  } else {
    console.log("No popup found")
  }
})
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
