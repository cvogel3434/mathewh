import {VHCform} from './vhc-forms.js';
import {SENDrequest} from './server-requester.js';

export class UserForm extends VHCform{
  constructor(cont=document.createElement('div')){
    super(cont);

    this.cont=cont;
    this.cont.innerHTML=this.contents;

    this.setinputs(this.dom.inputs);//register input elements

    this.actions.clear=this.cont.getElementsByClassName(this.dom.actions.clear)[0];
    this.actions.save=this.cont.getElementsByClassName(this.dom.actions.save)[0];
    this.actions.remove=this.cont.getElementsByClassName(this.dom.actions.remove)[0];


    this.actions.clear.addEventListener('click',(ele)=>{
      this.form = undefined;
      this.actions.save.title='add';
    });
    this.actions.save.addEventListener('click',(ele)=>{this.submit(ele.target.title);});
    this.actions.remove.addEventListener('click',(ele)=>{
      this.submit('remove');
    });

    this.inputs.uname.addEventListener('change',(ele)=>{this.actions.save.title='add'});
  }

  //class names for form elements
  dom={
    cont:'user-form',
    inputs:{
      uname:'user-uname',
      first:'user-first',
      last:'user-last',
      phone:'user-phone',
      job:'user-job'
    },
    actions:{
      save:'form-update',
      remove:'form-remove',
      clear:'form-clear'
    }
  }

  //template for user form
  contents=`
    <div class="${this.dom.cont}">
      <h2>User Form</h2>
      <div class="form-inputs">
        <div>User Name</div><input class="${this.dom.inputs.uname}"/>
        <div>First Name</div><input class="${this.dom.inputs.first}"/>
        <div>Last Name</div><input class="${this.dom.inputs.last}">
        <div>Phone #</div><input class="${this.dom.inputs.phone}"/>
        <div>Job Title</div><input class="${this.dom.inputs.job}"/>
      </div>
      <div class="form-action-bar">
        <img src='./assets/disk.png' class="form-button ${this.dom.actions.save}" title="add"/>
        <img src='./assets/trash.png' class="form-button ${this.dom.actions.remove}" />
        <img src='./assets/refresh.png' class="form-button ${this.dom.actions.clear}" />
      </div>
    </div>
  `

  validate(){
    if(this.form.uname!=''){return true;}
    else{return false;}
  }

  loaduser(user){
    this.form = user;
    this.actions.save.title='update';
  }
  submit(action){
    if(this.validate()){
      if(['add','remove','update'].includes(action)){
        SENDrequest('users',{
          method:action,
          user:this.form ||{}
        }).then(
          res=>{
            console.log(res);
            if(res.success){
              switch(action){
                case 'remove':{
                  console.log('remove')
                  this.form=undefined;
                  this.actions.save.title='add';
                  break;
                }
                case 'add':{this.actions.save.title='update';break;}
              }
            }else{
              switch(action){
                case 'add':{this.actions.save.title='update';}
                case 'update':{this.actions.save.title='add';}
              }
            }
          }
        )
      }else{console.log('Bad method for server')}
    }else{console.log('Form Inputs are Bad')}
  }
}
