

var url = "http://localhost:8080/"; //null
export var SENDrequest = (method,pack)=>{
  return new Promise((res,rej)=>{
    var options={
      method:'POST',
      headers:{
        'Accept':'application/json'
      },
      body:JSON.stringify({
        pack:pack
      })
    }
    if(url){
      fetch(url+method,options)
      .then(response=>{return response.json();})
      .then(data=>{return res(data);})
      .catch(err=>{return res(err)})
    }else{return res('URL not set...');}
  });
}
