import React, { Component, useContext, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import img_icon_location from './image_icon/location.png'
import img_idea from './image_icon/idea.jpg'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


import './home.css'
import { Context } from '../../App';
import postt from '../../services/news';
import AlertCustom from '../alert/AlertCustom';
let $ = window.$


function Home(props) {
    let { NewsFilter, user } = useContext(Context)
    let filter = useRef()
    const [isAlertSuccess, setIsAlertSuccess] = useState(false)
    const [mess, setMess] = useState("")
    // constructor(props) {
    //     super(props);
    //     this.state={
    //         All_News:[],
    //         NameCity:[],
    //         NameDistricts:[],
    //         FeedBack:[],
    //         NameCityFilter:[],
    //         NameDistrictsFilter:[],
    //         Click_Find_News:false,
    //         flagFilter:false,
    //         NameUser:[],
    //         NameRole:[]

    //     }
    //     props.StateFiterTyhomeNewstoApp();

    // }
    // async UNSAFE_componentWillMount(){

    //     await axios.get('/trang-chu/tin-tong-hop')
    //     .then(res => {
    //         this.setState({
    //             All_News:res.data.All_News
    //         })
    //         if(res.data.All_News){
    //             res.data.All_News.forEach(element => {

    //                 axios.get(`/trang-chu/thong-tin-chi-tiet/city/${element.address.code_city}`)
    //                 .then(res=>{
    //                     let NameCity_Array=this.state.NameCity
    //                     NameCity_Array.push(res.data.NameCity)
    //                     this.setState({
    //                         NameCity:NameCity_Array
    //                     })
    //                 }

    //                 )
    //                 .catch( (error) => console.log(error));

    //                 axios.get(`/trang-chu/thong-tin-chi-tiet/dictrict/${element.address.code_dictrict}`)
    //                 .then(res=>{
    //                     let NameDistricts_Array=this.state.NameDistricts;
    //                     NameDistricts_Array.push(res.data.NameDistricts)
    //                     this.setState({
    //                         NameDistricts:NameDistricts_Array
    //                     })
    //                 })
    //                 .catch( (error) => console.log(error));
    //             });
    //         }
    //     })
    //     .catch( (error) => console.log(error));


    //      // Get Feedback to Server return list Room Home
    //     await axios.get("/nguoi-dung/danh-gia")
    //     .then(res => {
    //         this.setState({
    //                 FeedBack:res.data.feedbacks
    //         });
    //         if(res.data.feedbacks){
    //             res.data.feedbacks.forEach(element=>{
    //                 axios.get(`/nguoi-dung/thong-tin/${element.iduser}`)
    //                 .then(res=>{
    //                     let NameUser=this.state.NameUser;
    //                     NameUser.push(res.data.user.firstname + " "+ res.data.user.lastname);
    //                     let NameRole=this.state.NameRole;
    //                     NameRole.push(res.data.user.role);
    //                     this.setState({
    //                         NameUser:NameUser,
    //                         NameRole:NameRole
    //                     })

    //                 })
    //                 .catch( (error) => console.log(error));
    //             })
    //         }
    //     })
    //     .catch( (error) => console.log(error));

    // }

    const [hotNews, setHotNews] = useState()



    const ClickFind_News = () => {
        // const close = document.getElementById("Click_Find_News");
        // close.click();
        // document.querySelector('#Find_News').scrollIntoView({
        //     behavior: 'smooth'
        // });
        // $('#Find_News').stop().animate({
        //     scrollTop: -$(this).offset()
        // }, 2000);



    }


    // Click News will show News Detail


    const NewsDeitail = () => {
        props.NewsDetailtoApp();
    }

    const formatNumber = (num) => {
        if (num < 100000) {
            num = num * 100000
        }
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const result = await postt.getHotNews();
            if (user) {
                var list = result.data.filter((o) => o.createbyid !== user._id)
                setHotNews(list)
            } else {
                setHotNews(result.data)
            }
            setLoading(false);
        })();
        // let res = await postt.getHotNews();
        // if (res.result) {
        //     // console.log('res', res)
        //     setHotNews(res.data)
        // }
    }, [user])

    useEffect(() => {
        const btn = document.querySelector('#scrollFilter');

        $(btn).click(function () {
            $('html,body').stop().animate({
                scrollTop: $(this).offset().top - 1650
            }, 2000);
        })
    }, [])

    const handleFavorite = async (id, isLoved) => {
        let res = await postt.handleFavorite(id);
        if (res.result) {
            if (isLoved) {
                setIsAlertSuccess(true)
                setMess("???? xo?? kh???i danh s??ch y??u th??ch")
            } else {
                setIsAlertSuccess(true)
                setMess("???? th??m v??o danh s??ch y??u th??ch")
            }
            const result = await postt.getHotNews();
            var list = result.data.filter((o) => o.createbyid !== user._id)
            setHotNews(list)
            setTimeout(() => {
                setIsAlertSuccess(false)
                setMess("");
            }, 1500);
        }
        else {
            alert("Kh??ng th??? th??m v??o tin y??u th??ch")
        }
    }

    // console.log('NewsFilter', NewsFilter)
    // console.log('props.', props.)
    return (
        <div className="Home container-fluid">
            {
                isAlertSuccess && <AlertCustom type="error" content={mess} />
            }
            <div className="container">
                {props.clickFindNewstoApp &&
                    <div className="row home_tieude wow fadeInUp" data-wow-delay="0.1s">
                        <div className="col-md-12 home_tieude_divh2">
                            <h2>K???t qu??? t??m ki???m</h2>
                        </div>
                        <div className="col-md-12 home_tieude_divp">
                            <p>PhongTroVN gi??p b???n t??m ki???m m???t c??ch nhanh nh???t</p>
                        </div>
                    </div>
                }
                {props.NewsFiltertoApp.length > 0 ?
                    <div className="row">
                        {
                            props.NewsFiltertoApp?.map((item, index) =>
                                // <NewsItem item={item} NewsDeitail = {NewsDeitail} key={index} />
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
                                            <Link className="Link-detail-news" onClick={NewsDeitail} id={item._id} to={`trang-chu/thong-tin-chi-tiet/${item._id}`}>{item.infor.title}</Link>
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
                    : <div><p className={!props.clickFindNewstoApp ? "result_filter wow fadeInUp" : "result_filter_No_item wow fadeInUp"} data-wow-delay="0.1s">Kh??ng c?? tin</p></div>

                }
                <div className="row home_tieude wow fadeInUp" data-wow-delay="0.1s">
                    <div className="col-md-12 home_tieude_divh2">
                        <h2>Tin N???i B???t</h2>
                    </div>
                    <div className="col-md-12 home_tieude_divp">
                        <p>PhongTroVN gi??p b???n t??m ki???m m???t c??ch nhanh nh???t</p>
                    </div>
                </div>
                {/* News VIP  (Tin n???i b???t)*/}
                <div className="row">
                    {
                        hotNews?.map((item, index) =>
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
            {/* Idea Website Slogan (Th??? hi???n slogan cho website) */}
            <div className="row idea">
                <div className="col-md-12 col-sm-12 col-xs-12 idea-content">
                    <img src={img_idea} alt="idea" className="idea-content-img" />
                    <div className="col-md-12 col-sm-12 col-xs-12 bg-overlay-black">
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12 idea-content-slogan">
                        <h3 className="idea-content-slogan-h3 wow  fadeInUp" data-wow-delay="500ms">B???n ??ang t??m ki???m m???t n??i cho thu???</h3>
                        <h6 className="idea-content-slogan-h6 wow fadeInUp" data-wow-delay="600ms">PhongTroVN s??? gi??p b???n m???t c??ch nhanh ch??ng</h6>
                        <div id='scrollFilter' className="idea-content-slogan-button bnt_find wow fadeInUp cursor-pointer" data-wow-delay="700ms" style={{ width: '200px', textAlign: 'center' }}
                        // type="button"
                        // onClick={ClickFind_News}

                        >T??m Ki???m</div>
                        {/* <a href="#Find_News" id="Click_Find_News">Haha</a> */}
                    </div>
                </div>
            </div>
            {/* FeedBack Website (Kh??ch h??ng ????nh gi?? cho website) */}
            {/* <div className="container">
                <div className="row home_tieude wow fadeInUp" data-wow-delay="0.1s">
                    <div className="col-md-12 home_tieude_divh2">
                        <h2>????nh gi?? c???a m???i ng?????i</h2>
                    </div>
                    <div className="col-md-12 home_tieude_divp">
                        <p>PhongTroVN gi??p b???n t??m ki???m ph??ng tr??? ??ng ?? v?? t???t nh???t</p>
                    </div>
                </div>
                <OwlCarousel
                    className=" owl-carousel owl-theme "
                    loop
                    margin={0}
                    nav
                    autoplay
                    autoplayTimeout={40000}
                    smartSpeed={1000}
                >
                    {
                        [1, 2, 3].map((item, index) =>
                            <div className="box-feedback w-100" key={index}>
                                <div className=" box-title">
                                    <h5 className="box-title-h6">Ti??u ?????</h5>
                                </div>
                                <div className=" box-content">
                                    <p className="box-content-p">N???i dung</p>
                                </div>
                                <div className=" box-author-info">
                                    <img src={img_idea} alt="author" className="box-author-info-img w-100" />
                                    <p className="box-author-info-p">T??n Ng?????i feedback,<span className="box-author-info-span">Quy???n ?</span></p>
                                </div>
                            </div>
                        )
                    }
                </OwlCarousel>
            </div> */}
        </div>
    );
}

export default Home;

export const NewsItem = ({ item, NewsDeitail }) => {
    const formatNumber = (num) => {
        if (num < 100000) {
            num = num * 100000
        }
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    console.log('props.item', item)
    return (
        <div className="col-12 col-sm-6 col-md-4 col-xl-4" >
            <div className="Card wow fadeInUp" data-wow-delay="0.3s" >
                <div className="cardhome" >
                    <img className="card-img" src={item.img_avatar} alt="Card" />
                    <div className='favorite'>
                        <i className="fa fa-heart" aria-hidden="true"></i>
                    </div>
                    <div className="cardhome__price">
                        <span>{formatNumber(item.infor.price) ? formatNumber(item.infor.price) + " VND" : ""}</span>
                    </div>
                </div>
                <div className="taghome">
                    <Link className="Link-detail-news" onClick={NewsDeitail()} id={item._id} to={`trang-chu/thong-tin-chi-tiet/${item._id}`}>{item.infor.title}</Link>
                    <div className="taghome-location">
                        <img src={img_icon_location} alt="icon_location" />
                        <span> {item.address.address_detail}, {item.item.address.street}, {item.item.address.district}, {item.address.city}
                            {/* {props.GetNameDistrictsFiltertoApp[index] + ", " + props.GetNameCityFiltertoApp[index]} */}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}