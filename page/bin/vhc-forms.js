
export class VHCform{
  constructor(cont){
    this.cont=cont;
    this.inputs={};
    this.actions={};
  }
  set form(input={}){
    for(let i in this.inputs){
      switch(this.inputs[i].tagName){
        case 'INPUT' || 'TEXTAREA':{this.inputs[i].value=input[i]?input[i]:'';break;}
        default:{this.inputs[i].innerText = input[i]?input[i]:'';}
      }
    }
  }
  get form(){
    let fi ={}
    for(let i in this.inputs){
      switch(this.inputs[i].tagName){
        case 'INPUT' || 'TEXTAREA':{fi[i]=this.inputs[i].value;break;}
        case 'DIV':{fi[i]=this.inputs[i].innerText;break;}
        default:{console.log(`${i} failed to get from form`);}
      }
    }
    return fi;
  }

  validate(){}
  submit(){}

  setinputs(inputs){
    for(let i in inputs){
      try{this.inputs[i]=this.cont.getElementsByClassName(inputs[i])[0];}
      catch{console.log(`Class ${i} is not declared in Form ${this.cont} it has been left out of this.inputs`)}
    }
  }
}
