import React, { Component, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Link } from "react-router-dom";
import axios from 'axios';
import img from "../../assets/img/logo512.png"

import OwlCarousel from 'react-owl-carousel';
import postt from '../../services/news'

import './newsdetail.css'
import { useParams } from 'react-router-dom';
export default function NewsDetail() {
    const [detail, setDetail] = useState()
    const { slug } = useParams()

    useEffect(async () => {
        let res = await postt.getNewsDetail(slug)
        if (res.success) {
            console.log('res.data', res.data)
            setDetail(res.data)
        }
    }, [])


    const formatNumber = (num) => {
        num = num * 10000;
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    if (!detail) return <div>Loading...</div>
    return (
        <div className="container News-detail">
            <div >
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 News-detail-image ">
                        <OwlCarousel
                            className=" owl-carousel owl-theme "
                            loop
                            margin={10}
                            nav
                            items={1}
                            lazyLoad
                            autoplay
                            autoplayTimeout={4000}
                            smartSpeed={1000}
                        >
                            {
                                detail.img_infor.map((item, index) =>
                                    <img src={item} key={index} className="carousel-item-img-detail-news  " />
                                )
                            }
                        </OwlCarousel>
                    </div>

                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 News-detail-content wow fadeInUp" data-wow-delay="0.1s">
                            <div className="News-detail-content-title">
                                <p className="News-detail-content-title-typenews"> {detail.infor.typehome === 1 ? "Phòng Trọ" : detail.infor.typehome == 2 ? "Nhà Nguyên Căn" : "Căn Hộ"} </p>
                                <h3 className="News-detail-content-title-title"> {detail.infor.title} </h3>
                                <p className="News-detail-content-title-location"> {detail.address.district}, {detail.address.city} </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9 col-sm-9 col-xs-12 News-detail-content-left wow fadeInUp" data-wow-delay="0.1s">
                            <div className="col-md-12 col-sm-12 col-xs-12 News-detail-content-table wow fadeInUp" data-wow-delay="0.3s">
                                <h1 className="News-detail-item">Thông Tin Chi tiết</h1>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td className="News-detail-content-table-item">Ðịa chỉ</td>
                                            <td colSpan="3"> {detail.address.address_detail}, {detail.address.street}, {detail.address.district}, {detail.address.city} </td>
                                        </tr>
                                        <tr>
                                            <td className="News-detail-content-table-item">Giá:</td>
                                            <td>{formatNumber(detail.infor.price)} đ</td>
                                            <td className="News-detail-content-table-item">Người đăng:</td>
                                            <td> {detail.createbyname} </td>
                                        </tr>
                                        <tr>
                                            <td className="News-detail-content-table-item">Diện tích:</td>
                                            <td>{detail.infor.acreage} m2</td>
                                            <td className="News-detail-content-table-item">Số diện thoại:</td>
                                            <td> {detail.infor.number_phone} </td>
                                        </tr>
                                        <tr>
                                            <td className="News-detail-content-table-item">Loại tin:</td>
                                            <td> {detail.infor.typehome === 1 ? "Phòng Trọ" : detail.infor.typehome == 2 ? "Nhà Nguyên Căn" : "Căn Hộ"} </td>
                                            <td className="News-detail-content-table-item">Số phòng bếp:</td>
                                            <td> {detail.infor.nb_kitchenroom ? detail.infor.nb_kitchenroom : 1} </td>
                                        </tr>
                                        <tr>
                                            <td className="News-detail-content-table-item">Số phòng ngủ:</td>
                                            <td> {detail.infor.nb_bedroom ? detail.infor.nb_bedroom : 1} </td>
                                            <td className="News-detail-content-table-item">Số phòng tolet:</td>
                                            <td> {detail.infor.nb_bath_toilet ? detail.infor.nb_bath_toilet : 1}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-md-12 col-sm-12 col-xs-12 News-detail-infor wow fadeInUp" data-wow-delay="0.4s">
                                <h1 className="News-detail-item">Thông tin</h1>
                                <p className="News-detail-infor-content"> {detail.infor.content_infor} </p>
                            </div>

                            <div className="row News-detail-untilities wow fadeInUp" data-wow-delay="0.5s">
                                <h1 className=" col-md-12 col-sm-12 col-xs-12 News-detail-item">Tiện ích</h1>
                                <div className="col-md-3 col-sm-3 col-xs-6">
                                    <p className="News-detail-infor-content" > Wifi {detail.utilities.isChecked_wifi && <i class="fa fa-check-square" aria-hidden="true"></i>}</p>

                                    <p className="News-detail-infor-content"> Gác lửng {detail.utilities.isChecked_mezzanine && <i class="fa fa-check-square" aria-hidden="true"></i>}</p>
                                    <p className="News-detail-infor-content"> Camera an ninh  {detail.utilities.isChecked_camera && <i class="fa fa-check-square" aria-hidden="true"></i>}</p>
                                </div>
                                <div className="col-md-3 col-sm-3 col-xs-6">
                                    {/* {
                                    detail.utilities.isChecked_parking &&  */}
                                    <p className="News-detail-infor-content"> Bãi đậu xe riêng {detail.utilities.isChecked_parking && <i class="fa fa-check-square" aria-hidden="true"></i>} </p>
                                    {/* } */}
                                    {/* { */}
                                    {/* detail.utilities.isChecked_fridge &&  */}
                                    <p className="News-detail-infor-content"> Tủ lạnh {detail.utilities.isChecked_fridge && <i class="fa fa-check-square" aria-hidden="true"></i>}  </p>
                                    {/* } */}
                                    {/* {detail.utilities.isChecked_WashingMachine && */}
                                    <p className="News-detail-infor-content"> Máy giặt {detail.utilities.isChecked_WashingMachine && <i class="fa fa-check-square" aria-hidden="true"></i>} </p>
                                    {/* } */}
                                </div>
                                <div className="col-md-3 col-sm-3 col-xs-6">
                                    {/* {
                                    detail.utilities.isChecked_television && */}
                                    <p className="News-detail-infor-content"> Tivi {detail.utilities.isChecked_television && <i class="fa fa-check-square" aria-hidden="true"></i>} </p>
                                    {/* //  }
                                    // { */}
                                    {/* // detail.utilities.isChecked_AirConditional && */}
                                    <p className="News-detail-infor-content"> Máy điều hòa {detail.utilities.isChecked_AirConditional && <i class="fa fa-check-square" aria-hidden="true"></i>} </p>
                                    {/* //  } */}
                                    {/* // { */}
                                    {/* // detail.utilities.isChecked_elevator && */}
                                    <p className="News-detail-infor-content"> Thang máy {detail.utilities.isChecked_elevator && <i class="fa fa-check-square" aria-hidden="true"></i>} </p>
                                    {/* //  } */}
                                </div>
                                <div className="col-md-3 col-sm-3 col-xs-6">
                                    <p className="News-detail-infor-content"> Hồ bơi {detail.utilities.isChecked_pool && <i class="fa fa-check-square" aria-hidden="true"></i>}</p>
                                    <p className="News-detail-infor-content"> Công viên {detail.utilities.isChecked_park && <i class="fa fa-check-square" aria-hidden="true"></i>}</p>
                                    <p className="News-detail-infor-content"> Wifi  {detail.utilities.isChecked_mattress && <i class="fa fa-check-square" aria-hidden="true"></i>} </p>
                                </div>

                            </div>
                            {/* <div className="col-md-12 col-sm-12 col-xs-12 News-detail-ggmap wow fadeInUp" data-wow-delay="0.6s">
                                            <h1 className="News-detail-item">Bản đồ</h1>
                                            <div style={{ height: '400px', width: '100%' }}>
                                                    {/* <GoogleMapReact
                                                    bootstrapURLKeys={{key:'AIzaSyDLhm8DHP3A6kMCIsiwQWUU-pX5hSbyaQo'}}
                                                    defaultCenter={this.state.center}
                                                    defaultZoom={16}
                                                    yesIWantToUseGoogleMapApiInternals
                                                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                                                    >
                                                    </GoogleMapReact>
                                            </div>
                                    </div> */}


                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-12 News-near wow fadeInUp" data-wow-delay="0.7s">
                            <div className="row News-near-header">
                                <h6>Tin nổi bật gần đó</h6>
                            </div>
                            {/* {
                                    this.state.NewsNears.map((item,key)=>
                                     <div className="row News-near-content" key={key}>
                                            <div className="col-md-4 col-sm-4 col-xs-4 News-near-content-img">
                                                <img src={item.img_avatar} alt="item" />
                                            </div>
                                            <div className="col-md-8 col-sm-8 col-xs-8 News-near-content-link">
                                            <Link className="News-near-content-link-to" onClick={this.ClickNewsNears} to={`/trang-chu/thong-tin-chi-tiet/${item._id}`}>{item.infor.title}</Link>
                                            </div>
                                     </div>
                                     )
                                     } */}


                        </div>
                    </div>
                </div>
            </div>
            {/* // )} */}
        </div>



    );
}


// export default NewsDetail;