import { Socket } from "socket.io-client";
import { apiWithoutUser, chatAPI } from "../config/api";


const chatServices = {
  getRooms(id){
    return fetch(`${apiWithoutUser}tin-nhan/tai-room`,
    {
      method:'POST',
      headers:{
        'Content-Type':'Application/json'
      },
      body:JSON.stringify(id)
    }).then(res=>res.json())
  },
  getMessages(room){
    return fetch(`${apiWithoutUser}tin-nhan/tai-tin-nhan`,
    {
      method:'POST',
      headers:{
        'Content-Type':'Application/json'
      },
      body:JSON.stringify(room)
    }).then(res=>res.json())
  }
}

export default chatServices

