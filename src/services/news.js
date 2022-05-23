import { apiWithoutUser } from "../config/api"

const postt = {

  postNews(form) {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${apiWithoutUser}phong-tro/dang-tin-moi`, {
      method: 'POST',
      headers: {
        // 'Access-Control-Allow-Origin:' :"*",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.accessToken}`
      },
      body: JSON.stringify(form)
    }).then(res => res.json())
  },
  filter(form) {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${apiWithoutUser}trang-chu/tim-kiem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token.accessToken}`
      },
      body: JSON.stringify(form)
    }).then(res => res.json())
  },
  getHotNews() {
    return fetch(`${apiWithoutUser}trang-chu/tin-tuc-noi-bat`).then(res => res.json())
  },
  getTinPhongTro() {
    return fetch(`${apiWithoutUser}trang-chu/tin-phong-tro`).then(res => res.json())
  },
  getNewsDetail(id) {
    return fetch(`${apiWithoutUser}trang-chu/thong-tin-chi-tiet/${id}`).then(res => res.json())
  },
  getRelateNews(form) {
    return fetch(`${apiWithoutUser}trang-chu/tin-tuc-lien-quan`, {
      method: "POST",
      headers:{
        "Content-Type":"Application/json"
      },
      body: JSON.stringify(form)
    }).then(res => res.json())
  },
  getListPhongTro() {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${apiWithoutUser}phong-tro/quan-ly-tin-dang/phong-tro`,{
      headers:{
        "Content-Type":"Application/json",
        "Authorization":`Bearer ${token.accessToken}`
      }
    }).then(res => res.json())
  },
  getListNhaTro() {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${apiWithoutUser}phong-tro/quan-ly-tin-dang/nha-tro`,{
      headers:{
        "Content-Type":"Application/json",
        "Authorization":`Bearer ${token.accessToken}`
      }
    }).then(res => res.json())
  },
  getListCanHo() {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${apiWithoutUser}phong-tro/quan-ly-tin-dang/can-ho`,{
      headers:{
        "Content-Type":"Application/json",
        "Authorization":`Bearer ${token.accessToken}`
      }
    }).then(res => res.json())
  }
}
export default postt