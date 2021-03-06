import React, { Component, useContext, useEffect, useState } from 'react';
import './footer.css'
import img_school from './img_footer/img_school.jpg';
import img_envelope from './img_footer/envelope.png';
import img_location from './img_footer/location.png';
import img_phone_call from './img_footer/phone-call.png'
import { Context } from "../../App"
import { Link } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import { apiWithoutUser } from '../../config/api';
import chatServices from '../../services/chatService';
let $ = window.$
let socket


function Footer() {
    let { user, numNoti, runNotifyMessageAgain } = useContext(Context)
    const [notiNum, setNotiNum] = useState()

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



    useEffect(() => {
        // Socket
        socket.on("notifyMessage", num => runNotifyMessageAgain())
        const btn = document.querySelector('.scroll-to-top');
        $(btn).click(function () {
            // window.scrollBy(
            //   {
            //     top: -document.body.offsetHeight,
            //     behavior: "smooth"
            //   }
            // )
            $('html,body').stop().animate({
                scrollTop: -$(this).offset().top
            }, 2000);
        })
    }, [])

    return (
        <div>
            {user ? <Link className='btn-Chat cursor-pointer'
                // onClick={() => showListChat()}
                to="/messenger"
            >
                Chat
                <div className='bg-danger rounded-circle d-flex justify-content-center align-items-center' style={{ width: "15px", height: "15px", position: 'absolute', top: '0px', right: '7px', zIndex: '99999999' }}>
                    <div> {numNoti} </div>
                </div>
            </Link> : <Link className='btn-Chat cursor-pointer' to="/" data-toggle="modal" data-target="#modalLoginForm">
                Chat
            </Link>
            }
            <div className='scroll-to-top btn btn-warning rounded-circle justify-content-center align-items-center'>
                <i className="fa fa-chevron-up" aria-hidden="true"></i>
            </div>
            <div className="Footer">
                <div className="container ">
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-4 Footer-infor">
                            <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-header">
                                <h3>Th??ng tin li??n h???</h3>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-content">
                                <img src={img_school} alt="logo" />
                                <h1>Ph??ng Tr??? Sinh Vi??n</h1>
                                <p>PhongTroSinhVien r???t vui khi gi??p ???????c b???n</p>
                            </div>

                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-header">
                                <h3>Gi??? l??m vi???c</h3>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-hourwork">
                                <p>Th??? 2 - Th??? 6 <span>09 AM - 19 PM</span></p>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                <p>Th??? 7  <span>09 AM - 12 AM</span></p>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                <p>Ch??? nh???t <span>09 AM - 19 PM</span></p>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                <h6><img src={img_phone_call} alt="cty" /><span> (+84 - 028) 38964922</span></h6>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                <h6><img src={img_envelope} alt="cty" /><span>phongtrosinhvien@gmail.com</span> </h6>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                <h6><img src={img_location} alt="cty" /> <span>S?? V???n H???nh, Qu???n 10, Th??nh ph??? H??? Ch?? Minh.</span></h6>
                            </div>

                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <div className="row ">
                                <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-header">
                                    <h3>Menu</h3>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 Footer-menu">
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                        <p>Trang ch???</p>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                        <p>Thu?? ph??ng tr???</p>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                        <p>Thu?? c??n h???</p>
                                    </div>

                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 Footer-menu ">
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                        <p>Thu?? nh?? tr???</p>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                        <p>Li??n h???</p>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                        <p>Th??ng tin chi ti??t</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Footer;