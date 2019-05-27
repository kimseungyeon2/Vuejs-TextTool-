import axios from 'axios';//axios

export default class Service {
  constructor(domain) {
    this.domain = domain;
    this.form = new FormData();
  }
  post_axios(url,form){
    return axios.post(url,form)
    .then(res=>res.data)
    .catch(res=>{
      alert("server error");
    });
  }
  get_axios(url){
    return axios.get(url)
    .then(res=>res.data)
    .catch(res=>{
      alert("server error");
    });

  }
  upload(request,data){//upload methods
    this.form.append('data',data[0]);
    return this.post_axios(this.domain+request,this.form);
  }
  file_call(request,data){
    return this.get_axios(this.domain+request+"?data="+data);
  }
  search_words(request,data){
    this.form.append('data',data);
    return this.post_axios(this.domain+request,this.form);
  }
  search_word(request,data){
    return this.get_axios(this.domain+request+"?word="+data);
  }
}
