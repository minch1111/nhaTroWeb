import { apiWithoutUser } from "../config/api"

const feedback ={
  listFeedBack(id){
    return fetch(`${apiWithoutUser}feedback/hien-danh-sach-danh-gia`,{
      method:'POST',
      headers:{
        'Content-Type':'Application/json'
      },
      body:JSON.stringify({user_id:id})
    }).then(res=>res.json());
  },
  feedbackAction(form){
    return fetch(`${apiWithoutUser}feedback/gui-danh-gia`,{
      method:'POST',
      headers:{
        'Content-Type':'Application/json'
      },
      body:JSON.stringify(form)
    }).then(res=>res.json());
  },
  getFeedBackItem(form){
    return fetch(`${apiWithoutUser}feedback/lay-feedback`,{
      method:'POST',
      headers:{
        'Content-Type':'Application/json'
      },
      body:JSON.stringify(form)
    }).then(res=>res.json());
  }
}

export default feedback;