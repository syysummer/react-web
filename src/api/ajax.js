import axios from "axios";
export default  function ajax(url,data = {} ,type = "GET") {
   if(type === "GET"){
     let queryStr = "";
     Object.keys(data).forEach(key => {
         queryStr += key + "=" + data[key] + "&";
     });
     if(!queryStr){
         queryStr = queryStr.substring(0,queryStr.length - 1);
         queryStr = "?" + queryStr
     }
     return axios.get(url+queryStr)
   }else{
     return axios.post(url,data)
   }
}