import React, { Component, useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import postt from '../../services/news';
import img_icon_location from "../home/image_icon/location.png"
import { Context } from '../../App';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
function Thuephongtro(props) {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true)

    const [NewsRoom, setNewsRoom] = useState()

    useEffect(() => {
        props.StateFiterTyhomeNews_FtoApp(1);
        props.ListNewsResettoApp();
        (
            async () => {
                let res = await postt.getTinPhongTro();
                if (res.result) {
                    console.log('res', res)
                    if (user) {
                        var list = res.data.filter((o) => o.createbyid !== user._id)
                        setNewsRoom(list)
                    } else {
                        setNewsRoom(res.data)
                    }
                    setLoading(false)
                }
            }
        )()
    }, [])


    const formatNumber = (num) => {
        if (num < 100000) {
            num = num * 100000
        }
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const handleFavorite = async (id, isLoved) => {
        let res = await postt.handleFavorite(id);
        if (res.result) {
            if (isLoved) {
                alert("Đã xoá khỏi danh sách yêu thích")
            } else {
                alert("Đã thêm vào danh sách yêu thích")
            }
            let res = await postt.getTinPhongTro();
            if (res.result) {
                console.log('res', res)
                setNewsRoom(res.data)
            }
        }
        else {
            alert("Không thể thêm vào tin yêu thích")
        }
    }

    return (
        <div className="Home container-fluid">
            <p>Hi</p>
            {/* container */}
            <div className="container">
                {props.clickFindNewstoApp &&
                    <div className="row home_tieude wow fadeInUp" data-wow-delay="0.1s">
                        <div className="col-md-12 home_tieude_divh2">
                            <h2>Kết quả tìm kiếm</h2>
                        </div>
                        <div className="col-md-12 home_tieude_divp">
                            <p>PhongTroVN giúp bạn tìm kiếm một cách nhanh nhất</p>
                        </div>
                    </div>
                }
                {props.NewsFiltertoApp.length > 0 ?
                    <div className="row">
                        {
                            props.NewsFiltertoApp.map((item, index) =>
                                <div className="col-12 col-sm-6 col-md-4 col-xl-4" key={index} >
                                    <div className="Card wow fadeInUp" data-wow-delay="0.3s" >
                                        <div className="cardhome" >
                                            <img className="card-img" src={item.img_avatar} alt="Card" />
                                            {
                                                user && (item.createbyid !== user._id && <div className='favorite' style={{ color: item?.isWishList && "red" }}>
                                                    <i onClick={(id, isLoved) => handleFavorite(item._id, item.isWishList)} className="fa fa-heart" aria-hidden="true"></i>
                                                </div>)
                                            }
                                            <div className="cardhome__price">
                                                <span>{formatNumber(item.infor.price) ? formatNumber(item.infor.price) + " VND" : ""}</span>
                                            </div>
                                        </div>
                                        <div className="taghome">
                                            <Link className="Link-detail-news" id={item._id} to={`trang-chu/thong-tin-chi-tiet/${item._id}`}>{item.infor.title}</Link>
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
                    : <div><p className={!props.clickFindNewstoApp ? "result_filter wow fadeInUp" : "result_filter_No_item wow fadeInUp"} data-wow-delay="0.1s">Không có tin</p></div>

                }
                <div className="row home_tieude wow fadeInUp" data-wow-delay="0.1s">
                    <div className="col-md-12 home_tieude_divh2">
                        <h2>Tin Phòng trọ</h2>
                    </div>
                    <div className="col-md-12 home_tieude_divp">
                        <p>PhongTroVN giúp bạn tìm kiếm phòng trọ nhanh nhất</p>
                    </div>
                </div>
                <div className="row">
                    {
                        loading ?
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
                            NewsRoom?.map((item, index) =>
                                <div className="col-12 col-sm-6 col-md-4 col-xl-4" key={index} >
                                    <div className="Card wow fadeInUp" data-wow-delay="0.3s" >
                                        <div className="cardhome" >
                                            <img className="card-img" src={item.img_avatar} alt="Card" />
                                            {
                                                user && (item.createbyid !== user._id && <div className='favorite' style={{ color: item?.isWishList && "red" }}>
                                                    <i onClick={(id, isLoved) => handleFavorite(item._id, item.isWishList)} className="fa fa-heart" aria-hidden="true"></i>
                                                </div>)
                                            }
                                            <div className="cardhome__price">
                                                <span>{formatNumber(item.infor.price) ? formatNumber(item.infor.price) + " VND" : ""}</span>
                                            </div>
                                        </div>
                                        <div className="taghome">
                                            <Link className="Link-detail-news" id={item._id} to={`/thong-tin-chi-tiet/${item._id}`}>{item.infor.title}</Link>
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
                {/* end-container */}
            </div>
        </div>
    );
}


export default Thuephongtro;