import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import img from "../home/image_icon/idea.jpg"
import "../profileGuest/profileGuest.css"
import img_icon_location from "../home/image_icon/location.png"

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import postt from '../../services/news'


export default function ProfileGuest(props) {
  const { slug } = useParams();

  const [profile, setProfile] = useState();

  useEffect(() => {
    (
      async () => {
        let res = await postt.getProfileGuest(slug);
        if (res.result) {
          setProfile(res.data);
        }
      }
    )(

    )
  }, [])

  const formatNumber = (num) => {
    if (num < 100000) {
      num = num * 100000
    }
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  const NewsDeitail = () => {
    props.NewsDetailtoApp();
  }

  return (
    <div className='container-fluid px-2'>
      <div className="profile_header d-flex justify-content-center">
        <div className="avatar">
          <img src={profile?.user?.infor?.img_avatar} alt="" className='h-100 w-100' />
        </div>
        <div className="name p-3" style={{ marginRight: "-400px", fontSize: "30px" }}>
          <p className='m-0'><strong> {profile?.user?.infor?.firstname} {profile?.user?.infor?.lastname} </strong></p>
        </div>
      </div>
      <div className="profile_info row" >
        <div className="col-md-3 border py-3">
          <div className="row text-light my-2" style={{ backgroundColor: "#947054" }} >
            <div className="col-12 text-center p-3"><strong><i className="fa fa-info-circle" aria-hidden="true"></i> Thông tin người dùng</strong></div>
            <div className="col-12"> <div className='p-2'><i className="fa fa-user-circle" aria-hidden="true"></i> {profile?.user?.local?.username }</div> </div>
            <div className="col-12"><div className="p-2"><i className="fa fa-map-marker" aria-hidden="true"></i> {profile?.user?.address?.address_detail}, {profile?.user?.address?.street}, {profile?.user?.address?.district}, {profile?.user?.address?.city}  </div></div>
            <div className="col-12"><div className="p-2"><i className="fa fa-phone" aria-hidden="true"></i> {profile?.user?.number_phone} </div></div>
            <div className="col-12"><div className="p-2"><i className="fa fa-envelope" aria-hidden="true"></i> {profile?.user?.local?.email}  </div></div>
            <div className="col-12"><div className="p-2"><i className="fa fa-clipboard" aria-hidden="true"></i> {profile?.news?.length} bài viết </div></div>
          </div>
        </div>
        <div className="col-md-6 border pt-4 ">
          <div className="row mt-4">
            <div className="col-12"><strong style={{ fontSize: "25px" }}>Bài Viết</strong></div>
            <div className="col-12 mt-2 p-0">
              <div className="row">
                {
                  profile?.news?.map((o, i) => <div className="col-12 col-sm-6 col-md-6 col-xl-6" key={i} >
                    <div className="Card wow fadeInUp" data-wow-delay="0.3s" >
                      <div className="cardhome" >
                        <img className="card-img" src={o?.img_infor} alt="Card" />
                        <div className='favorite'>
                          <i className="fa fa-heart" aria-hidden="true"></i>
                        </div>
                        <div className="cardhome__price">
                          <span>{formatNumber(o?.infor?.price) ? formatNumber(o?.infor?.price) + " VND" : ""}</span>
                        </div>
                      </div>
                      <div className="taghome">
                        <Link className="Link-detail-news" onClick={NewsDeitail} to={`/thong-tin-chi-tiet/sss`}>{o?.infor?.title}</Link>
                        <div className="taghome-location">
                          <img src={img_icon_location} alt="icon_location" />
                          <span>
                            {/* 90/1A Hóc Môn,TP HCM */}
                            {o?.address?.address_detail}, {o?.address?.street}, {o?.address?.district}, {o?.address?.city}
                            {/* {props.GetNameDistrictsFiltertoApp[index] + ", " + props.GetNameCityFiltertoApp[index]} */}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 pt-4">
          <div className="row mt-4">
            <div className="col-12"><strong style={{ fontSize: "25px" }}>Đánh Giá</strong></div>
            <div className="col-12">
              <OwlCarousel
                className=" owl-carousel owl-theme "
                loop
                margin={0}
                nav
                autoplay={false}
                autoplayTimeout={40000}
                smartSpeed={1000}
                items={2}
              >
                {
                  profile?.feedback?.map((item, index) =>
                    <div className="border w-100 p-1" key={index}>

                      <div className="text-center">
                        <p className="p-1">Nội dung</p>
                        <div>Số sao</div>
                      </div>
                      <div className="p-2">
                        <img src={img} alt="author" className="box-author-info-img w-100" />
                        <p className="box-author-info-p">Tên Người feedback</p>
                      </div>
                    </div>
                  )
                }
              </OwlCarousel>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
