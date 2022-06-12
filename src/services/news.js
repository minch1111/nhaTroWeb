import { api, apiWithoutUser } from "../config/api"

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
    if (token) {
      return fetch(`${apiWithoutUser}trang-chu/tim-kiem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.accessToken}`
        },
        body: JSON.stringify(form)
      }).then(res => res.json())
    } else {
      return fetch(`${apiWithoutUser}trang-chu/tim-kiem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token.accessToken}`
        },
        body: JSON.stringify(form)
      }).then(res => res.json())
    }

  },
  getHotNews() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      return fetch(`${apiWithoutUser}trang-chu/tin-tuc-noi-bat`, {
        headers: {
          "Content-Type": "Application/json",
          "Authorization": `Bearer ${token.accessToken}`
        },
      }
      ).then(res => res.json())
    }
    else {
      return fetch(`${apiWithoutUser}trang-chu/tin-tuc-noi-bat`,
      ).then(res => res.json())
    }
  },
  getTinPhongTro() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      return fetch(`${apiWithoutUser}trang-chu/tin-phong-tro`, {
        headers: {
          "Content-Type": "Application/json",
          "Authorization": `Bearer ${token.accessToken}`
        },
      }).then(res => res.json());

    } else {
      return fetch(`${apiWithoutUser}trang-chu/tin-phong-tro`).then(res => res.json());
    }
  },
  getTinNhaTro() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      return fetch(`${apiWithoutUser}trang-chu/tin-nha-tro`, {
        headers: {
          "Content-Type": "Application/json",
          "Authorization": `Bearer ${token.accessToken}`
        },
      }).then(res => res.json());

    } else {
      return fetch(`${apiWithoutUser}trang-chu/tin-phong-tro`).then(res => res.json());
    }
  },
  getTinCanHo() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      return fetch(`${apiWithoutUser}trang-chu/tin-can-ho`, {
        headers: {
          "Content-Type": "Application/json",
          "Authorization": `Bearer ${token.accessToken}`
        },
      }).then(res => res.json());

    } else {
      return fetch(`${apiWithoutUser}trang-chu/tin-phong-tro`).then(res => res.json());
    }
  },
  getNewsDetail(id) {
    return fetch(`${apiWithoutUser}trang-chu/thong-tin-chi-tiet/${id}`).then(res => res.json())
  },
  getNewsDetailToEdit(id) {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${apiWithoutUser}phong-tro/chi-tiet-bai-dang/${id}`, {
      headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token.accessToken}`
      }
    }).then(res => res.json())
  },
  getRelateNews(form) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      return fetch(`${apiWithoutUser}trang-chu/tin-tuc-lien-quan`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          "Authorization":`Bearer ${token.accessToken}`
        },
        body: JSON.stringify(form)
      }).then(res => res.json())
    } else {
      return fetch(`${apiWithoutUser}trang-chu/tin-tuc-lien-quan`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify(form)
      }).then(res => res.json())
    }

  },
  getListPhongTro() {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${apiWithoutUser}phong-tro/quan-ly-tin-dang/phong-tro`, {
      headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token.accessToken}`
      }
    }).then(res => res.json())
  },
  getListNhaTro() {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${apiWithoutUser}phong-tro/quan-ly-tin-dang/nha-tro`, {
      headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token.accessToken}`
      }
    }).then(res => res.json())
  },
  getListCanHo() {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${apiWithoutUser}phong-tro/quan-ly-tin-dang/can-ho`, {
      headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token.accessToken}`
      }
    }).then(res => res.json())
  },
  updateNews(id, form) {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${apiWithoutUser}phong-tro/cap-nhat-tin-dang/${id}`, {
      method: 'POST',
      headers: {
        // 'Access-Control-Allow-Origin:' :"*",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.accessToken}`
      },
      body: JSON.stringify(form)
    }).then(res => res.json())
  },
  getProfileGuest(id) {
    return fetch(`${apiWithoutUser}trang-chu/thong-tin-nguoi-dung/${id}`, {
      headers: {
        "Content-Type": "Application/json",
      }
    }).then(res => res.json())
  },
  reportPost(form) {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${apiWithoutUser}trang-chu/bao-cao`, {
      method: 'POST',
      headers: {
        // 'Access-Control-Allow-Origin:' :"*",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.accessToken}`
      },
      body: JSON.stringify(form)
    }).then(res => res.json())
  },
  getFavoriteNews() {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${api}/tin-yeu-thich`, {
      headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token.accessToken}`
      }
    }).then(res => res.json())
  },
  handleFavorite(id) {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`${api}/yeu-thich-tin/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token.accessToken}`
      }
    }).then(res => res.json())
  }
}
export default postt