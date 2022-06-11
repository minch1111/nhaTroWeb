import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import postt from '../../../services/news'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom'
import img_icon_location from "../../home/image_icon/location.png"


export default function (props) {

  const [loading, setLoading] = useState(true)
  const [favorite, setFavorite] = useState()

  useEffect(() => {
    (
      async () => {
        let res = await postt.getFavoriteNews();
        if (res.result) {
          setFavorite(res.data)
          setLoading(false)
        }
      }
    )()
  }, [])

  const NewsDeitail = () => {
    props.NewsDetailtoApp();
  }

  const formatNumber = (num) => {
    if (num < 100000) {
      num = num * 100000
    }
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const handleFavorite = async (id) => {

    let res = await postt.handleFavorite(id);
    if (res.result) {

      alert("Đã xoá khỏi danh sách yêu thích")
      setLoading(true)
      const result = await postt.getFavoriteNews();
      if (result.result) {
        setFavorite(result.data);
        setLoading(false);
      }
    }
    else {
      alert("Không thể thêm vào tin yêu thích")
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12 tieudepage_mg">
          <h2 className="tieudepage_mg-h2">Danh sách yêu thích</h2>
          <p>Nơi lưu lại các bài viết yêu thích của bạn</p>
        </div>
      </div>
      <div className="row">
        {loading ?
          [1, 2, 3, 4, 5, 6].map((o, i) => <div className="col-12 col-sm-6 col-md-4 col-xl-4" key={i} >
            <div className="Card wow fadeInUp" data-wow-delay="0.3s" >
              <div className="cardhome" >
                {/* <img className="card-img" src={item.img_avatar} alt="Card" /> */}
                <Skeleton
                  item={1}
                  height={255}
                  className="skeleton-custom"
                >
                </Skeleton>
                <div className='favorite'>
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </div>
                {/* <div className="cardhome__price">
                                            <span>{formatNumber(item.infor.price) ? formatNumber(item.infor.price) + " VND" : ""}</span>
                                        </div> */}
              </div>
              <div className="taghome">
                <Link className="Link-detail-news" to="#"></Link>
                <div className="taghome-location d-flex">
                  {/* <img src={img_icon_location} alt="icon_location" /> */}
                  <div className='mr-1' style={{ width: "20px" }}>
                    <Skeleton item={1} height={20} className="w-100" />
                  </div>
                  <div className='w-100'>
                    <Skeleton
                      item={1}
                      height={20}
                      className="w-100"
                    />
                  </div>
                  {/* {item.address.address_detail}, {item.address.street}, {item.address.district}, {item.address.city} */}
                  {/* {props.GetNameDistrictsFiltertoApp[index] + ", " + props.GetNameCityFiltertoApp[index]} */}
                </div>
                <Skeleton item={1} height={30}></Skeleton>
              </div>
            </div>
          </div>)
          :
          favorite?.map((item, index) =>
            <div className="col-12 col-sm-6 col-md-4 col-xl-4" key={index} >
              <div className="Card wow fadeInUp" data-wow-delay="0.3s" >
                <div className="cardhome" >
                  <img className="card-img" src={item.img_avatar} alt="Card" />
                  <div className='favorite' style={{ color: "red" }}>
                    <i className="fa fa-heart" onClick={(id) => handleFavorite(item._id)} aria-hidden="true"></i>
                  </div>
                  <div className="cardhome__price">
                    <span>{formatNumber(item.infor.price) ? formatNumber(item.infor.price) + " VND" : ""}</span>
                  </div>
                </div>
                <div className="taghome">
                  <Link className="Link-detail-news" onClick={NewsDeitail} id={item._id} to={`/thong-tin-chi-tiet/${item._id}`}>{item.infor.title}</Link>
                  <div className="taghome-location">
                    <img src={img_icon_location} alt="icon_location" />
                    <span> {item.address.address_detail}, {item.address.street}, {item.address.district}, {item.address.city}
                      {/* {props.GetNameDistrictsFiltertoApp[index] + ", " + props.GetNameCityFiltertoApp[index]} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>

    </div>
  )
}
