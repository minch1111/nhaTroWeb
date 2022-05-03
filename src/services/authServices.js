import { responsiveFontSizes } from "@material-ui/core"
import { api } from "../config/api"

const authServices = {
  login(form){
    return fetch(`${api}/dang-nhap`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(form)
    }).then(res=>res.json())
  },
  signUp(form) {
    return fetch(`${api}/dang-ky`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(form)
    }).then(res=>res.json())
  },
  getUserInfo(){
    let token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${api}/thong-tin`,{
      method :'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token.accessToken}`
      }
    }).then(res=>res.json())
  },
  confirmEmail(form) {
    return fetch(`${api}/tai-khoan/kich-hoat`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(form)
    }).then(res=>res.json())
  },
  confirmEmailToPostNews() {
    let token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${api}/xac-thuc/gui-email`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token.accessToken}`
      }
    }).then(res=>res.json())
  },
  confirmEmailAgainToPostNews() {
    let token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${api}/xac-thuc/xac-nhan-email`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token.accessToken}`
      }
    }).then(res=>res.json())
  },
}

export default authServices