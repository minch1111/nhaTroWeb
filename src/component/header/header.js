import React, { Component } from 'react';
import './header.css'
import Datenow from './datenow/datenow';
import img_icon_login from '../header/image_header/icon_login.png'
import LoginRegister from '../login__register/login__register';
import Menu from '../menu/menu';
import SlideHeader from './slide_header/slide_header';
import Filter from './filter/filter';
import { useLocation, useParams } from 'react-router-dom'

function Header(props) {
    const location = useLocation()
    // console.log('location.pathname', location.pathname.search('nguoi-dung'))
    // console.log('location.pathname', location.pathname)
    return (
        <div className="container-fluid">
            <div className="row header1">
                <div className="col-md-6 col-sm-6 col-xs-6 header1_info_left" >
                    <Datenow />
                </div>
                {
                    // location.pathname.search('messenger') <= 0 &&
                    location.pathname.search('xac-nhan-email') <= 0 && (
                        location.pathname.search('nguoi-dung') <= 0 && (
                            <div className="col-md-6 col-sm-6 col-xs-6 header1_info_right">
                                <LoginRegister  clickPostNewstoApp={(r) => props.clickPostNewstoApp(r)} clickMovedOnUsertoApp={props.clickMovedOnUsertoApp}  socket ={props.socket}/>
                                <div className="header1_info_right__div-img">
                                    <img src={img_icon_login} alt="icon_login" />
                                </div>
                            </div>
                        )
                    )
                }
            </div>
            {
                  location.pathname.search('xac-nhan-email') <= 0 && location.pathname.search('nguoi-dung') <= 0 && location.pathname.search('messenger') <= 0 &&
                <div className="row header2">
                    <div className="row header2-slide-menu" id={location.pathname !== '/nguoi-dung/dang-tin-moi' ? "header2-menu" : ""}>
                        <Menu StateFiterandslide_FuncApp={props.StateFiterandslide_FuncApp}
                            stateFiterandslide_imgApp={props.stateFiterandslide_imgApp} />
                    </div>

                   {
                      location.pathname.search('thong-tin-chi-tiet') <= 0 &&  <div className="row header_slide">
                        <SlideHeader />
                    </div>
                   }

                </div>
            }
            {location.pathname.search('thong-tin-lien-he') <= 0 && location.pathname.search('thong-tin-chi-tiet') <= 0 && location.pathname.search('xac-nhan-email') <= 0 && location.pathname.search('nguoi-dung') <= 0 && location.pathname.search('messenger') <= 0 &&
                <div className="row">
                    <div className="container form_filter">
                        <Filter
                        // StateFiterTyhomeNews_TF={props.StateFiterTyhomeNews_TF}  // Hi???n ho???c ???n fitter
                        // GetNewsFiltertoApp={props.GetNewsFiltertoApp}
                        // GetTypeNewstoApp={props.GetTypeNewstoApp}                       // GetTypeNewstoApp
                        />

                    </div>
                </div>
            }

        </div>
    );
}


export default Header;