import React, { Component, useContext, useEffect, useState } from 'react';
// import GoogleMapReact from 'google-map-react';
import { Link } from "react-router-dom";
// import axios from 'axios';
import img from "../../assets/img/logo512.png"
import { Socket, io } from 'socket.io-client';
import OwlCarousel from 'react-owl-carousel';
import postt from '../../services/news'
import img_icon_location from '../home/image_icon/location.png'


import './newsdetail.css'
import { useParams } from 'react-router-dom';
import { Context } from '../../App';
import { apiWithoutUser, chatAPI } from '../../config/api';

let socket

export default function NewsDetail(props) {
    const [detail, setDetail] = useState()
    const [relate, setRelate] = useState()
    const [isMessage, setIsMessage] = useState(false);
    const [messageContent, setMessageContent] = useState("");
    const { user } = useContext(Context);
    const { slug } = useParams()

    useEffect(() => {
        async function runAPI() {
            let res = await postt.getNewsDetail(slug)
            if (res.success) {
                // console.log('res.data', res.data)
                setDetail(res.data)
            }
        }
        runAPI();
    }, [slug])


    useEffect(() => {
        async function runAPI() {
            let res = await postt.getRelateNews({ city: detail?.address.city, typehome: detail?.infor.typehome })
            if (res.success) {
                setRelate(res.data)
            }
        }
        if (detail) {
            runAPI()
        }
    }, [detail])

    useEffect(() => {
        // const { name, room } = queryString.parse(location.search);

        socket = io(apiWithoutUser, {
            // withCredentials:true,
        });

        // console.log('socket', socket)
        // setRoom(room);
        // setName(name)
        console.log(socket)


        if (user) {
            socket.emit('setUpSocket', { user_id: user._id }, (error) => {
                if (error) {
                    alert(error);
                }
            });
        }

    }, []);

    const NewsDeitail = () => {
        props.NewsDetailtoApp();
    }

    const formatNumber = (num) => {
        if (num < 100000) {
            num = num * 100000
        }
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const messaging = () => {
        setIsMessage(!isMessage)
    }
    const handleChange = (e) => {
        let value = e.target.value;
        setMessageContent(value)
    }

    const submit = (e) => {
        e.preventDefault();
        let currentId = user._id
        console.log("run");
        // console.log('currentId', currentId)
        socket.emit('sendMessage', { IdSender: currentId, IdReceiver: detail?.createbyid, message: { content: messageContent, images: [] } })
        // setMessages([...messages,message])
        setMessageContent('')
    }

    if (!detail) return <div>Loading...</div>

    return (
        <div className="container News-detail" style={{ marginTop: '90px' }}>
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 News-detail-image ">
                    <OwlCarousel
                        className=" owl-carousel owl-theme "
                        loop
                        margin={10}
                        items={2}
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
                                        <td className="News-detail-content-table-item">Số phòng ngủ:</td>
                                        <td> {detail.infor.nb_bedroom ? detail.infor.nb_bedroom : 1} </td>
                                        {/* <td className="News-detail-content-table-item">Người đăng:</td>
                                        <td> {detail.createbyname} </td> */}
                                    </tr>
                                    <tr>
                                        <td className="News-detail-content-table-item">Diện tích:</td>
                                        <td>{detail.infor.acreage} m2</td>
                                        <td className="News-detail-content-table-item">Số phòng tolet:</td>
                                        <td> {detail.infor.nb_bath_toilet ? detail.infor.nb_bath_toilet : 1}</td>
                                        {/* <td className="News-detail-content-table-item">Số diện thoại:</td>
                                        <td> {detail.infor.number_phone} </td> */}
                                    </tr>
                                    <tr>
                                        <td className="News-detail-content-table-item">Loại tin:</td>
                                        <td> {detail.infor.typehome === 1 ? "Phòng Trọ" : detail.infor.typehome == 2 ? "Nhà Nguyên Căn" : "Căn Hộ"} </td>
                                        <td className="News-detail-content-table-item">Số phòng bếp:</td>
                                        <td> {detail.infor.nb_kitchenroom ? detail.infor.nb_kitchenroom : 1} </td>
                                    </tr>
                                    <tr>


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
                                <p className="News-detail-infor-content" > Wifi {detail.utilities.isChecked_wifi && <i className="fa fa-check-square" aria-hidden="true"></i>}</p>

                                <p className="News-detail-infor-content"> Gác lửng {detail.utilities.isChecked_mezzanine && <i className="fa fa-check-square" aria-hidden="true"></i>}</p>
                                <p className="News-detail-infor-content"> Camera an ninh  {detail.utilities.isChecked_camera && <i className="fa fa-check-square" aria-hidden="true"></i>}</p>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                {/* {
                                    detail.utilities.isChecked_parking &&  */}
                                <p className="News-detail-infor-content"> Bãi đậu xe riêng {detail.utilities.isChecked_parking && <i className="fa fa-check-square" aria-hidden="true"></i>} </p>
                                {/* } */}
                                {/* { */}
                                {/* detail.utilities.isChecked_fridge &&  */}
                                <p className="News-detail-infor-content"> Tủ lạnh {detail.utilities.isChecked_fridge && <i className="fa fa-check-square" aria-hidden="true"></i>}  </p>
                                {/* } */}
                                {/* {detail.utilities.isChecked_WashingMachine && */}
                                <p className="News-detail-infor-content"> Máy giặt {detail.utilities.isChecked_WashingMachine && <i className="fa fa-check-square" aria-hidden="true"></i>} </p>
                                {/* } */}
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                {/* {
                                    detail.utilities.isChecked_television && */}
                                <p className="News-detail-infor-content"> Tivi {detail.utilities.isChecked_television && <i className="fa fa-check-square" aria-hidden="true"></i>} </p>
                                {/* //  }
                                    // { */}
                                {/* // detail.utilities.isChecked_AirConditional && */}
                                <p className="News-detail-infor-content"> Máy điều hòa {detail.utilities.isChecked_AirConditional && <i className="fa fa-check-square" aria-hidden="true"></i>} </p>
                                {/* //  } */}
                                {/* // { */}
                                {/* // detail.utilities.isChecked_elevator && */}
                                <p className="News-detail-infor-content"> Thang máy {detail.utilities.isChecked_elevator && <i className="fa fa-check-square" aria-hidden="true"></i>} </p>
                                {/* //  } */}
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                <p className="News-detail-infor-content"> Hồ bơi {detail.utilities.isChecked_pool && <i className="fa fa-check-square" aria-hidden="true"></i>}</p>
                                <p className="News-detail-infor-content"> Công viên {detail.utilities.isChecked_park && <i className="fa fa-check-square" aria-hidden="true"></i>}</p>
                                <p className="News-detail-infor-content"> Wifi  {detail.utilities.isChecked_mattress && <i className="fa fa-check-square" aria-hidden="true"></i>} </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-12 News-near wow fadeInUp" data-wow-delay="0.7s">
                        <div className="row News-near-header justify-content-center">
                            <h6>Liên hệ</h6>
                        </div>
                        <div className='w-100 px-2 py-1' >
                            <p>Tên người cho thuê : <strong>{detail.createbyname} </strong> </p>
                            <p>Số điện thoại : <strong>{detail.infor.number_phone}</strong>  </p>
                        </div>
                        {
                            !user && <div className='container w-100 px-2 py-1 cursor-pointer'>
                            <div className='p-2 text-center bg-secondary text-light' data-toggle="modal" data-target="#modalLoginForm" >Nhắn tin trực tiếp</div>
                        </div>
                        }
                        {
                             user._id !== detail?.createbyid  &&

                            <div className='container w-100 px-2 py-1 cursor-pointer'>
                                <div className='p-2 text-center bg-secondary text-light' onClick={messaging}>Nhắn tin trực tiếp</div>
                            </div>


                        }

                        {
                            user && isMessage &&
                            <form onSubmit={(e) => submit(e)} className='container w-100 px-2 py-1 cursor-pointer'>
                                <div className="form-group d-flex">
                                    <input type="text" name="" id="" className="form-control" placeholder="Nhập tin nhắn..." aria-describedby="helpId" value={messageContent} onChange={e => handleChange(e)} />
                                    <button type='submit' className='btn d-flex align-items-center p-0' style={{ marginLeft: '-52px', justifyContent: 'space-evenly' }} ><p className='m-0'>Gửi</p>  <i className="fa fa-commenting-o mx-1" aria-hidden="true"></i></button>
                                </div>
                            </form>
                        }

                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 wow fadeInUp d-flex justify-content-center' data-wow-delay="0.7s" >
                        <div className="row News-near-header justify-content-center w-50 px-2">
                            <h6>Tin liên quan</h6>
                        </div>
                    </div>
                    {
                        relate?.map((o, i) =>
                            <div className="col-12 col-sm-6 col-md-3 col-xl-3" key={i} >
                                <div className="Card wow fadeInUp" data-wow-delay="0.3s" >
                                    <div className="cardhome" >
                                        <img className="card-img" alt="Card" src={o.img_avatar} />
                                        <div className='favorite'>
                                            <i className="fa fa-heart" aria-hidden="true"></i>
                                        </div>
                                        <div className="cardhome__price">
                                            <span>
                                                {formatNumber(o.infor.price) ? formatNumber(o.infor.price) + " VND" : ""}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="taghome">
                                        <Link className="Link-detail-news"
                                            // onClick={NewsDeitail} id={o._id}
                                            to={`/thong-tin-chi-tiet/${o._id}`}
                                        >
                                            {o.infor.title}
                                        </Link>
                                        <div className="taghome-location">
                                            <img
                                                src={img_icon_location}
                                                alt="icon_location" />
                                            <span>
                                                {/* {item.address.address_detail}, {item.address.street}, {item.address.district}, {item.address.city} */}
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
        </div>
    );
}


// export default NewsDetail;