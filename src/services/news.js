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
}
export default postt