import React, { Component, useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import './login__register.css';
import Login from './login/login';
import Register from './register/register';
import VerifyPhoneNumber from './verify_phone_number/verify_phone_number';
// import axios from 'axios';
import FeedBack from './feedback/feedback';
import authServices from '../../services/authServices';
import { Context } from '../../App';
// import ListChat from './chat/ListChat';
// import Chat from './chat/Chat';
import { Link } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';

import chatServices from '../../services/chatService';
import { apiWithoutUser } from '../../config/api';


function LoginRegister(props) {
    let { user, userName, settingUser, logout } = useContext(Context)
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data_toggle_news: 'modal',
    //         data_target_news: '#modalLoginForm',
    //         data_toggle_news_fb: 'modal',
    //         data_target_news_fb: '#modalLoginForm',
    //         result_infor_user: false,
    //         result_logout_user: false,
    //         username: localStorage.getItem('UserName') ? JSON.parse(localStorage.getItem('UserName')) : '',
    //         infoUser: localStorage.getItem('InfoUser') ? JSON.parse(localStorage.getItem('InfoUser'))['firstname'] + JSON.parse(localStorage.getItem('InfoUser'))['lastname'] : "",
    //         role: localStorage.getItem('InfoUser') ? JSON.parse(localStorage.getItem('Role')) : "",
    //         number_phone: ""
    //     }
    // }
    const [data_toggle_news, setData_toggle_news] = useState(!user ? 'modal' : null)
    const [data_target_news, setData_target_news] = useState(!user ? '#modalLoginForm' : null)
    const [data_toggle_news_fb, setData_toggle_news_fb] = useState('modal')
    const [data_target_news_fb, setData_target_news_fb] = useState('#modalLoginForm')
    const [result_infor_user, setResult_infor_user] = useState(false)
    const [result_logout_user, setResult_logout_user] = useState(false)
    const [username, setUserName] = useState(userName)
    const [infoUser, setInfoUser] = useState(user)
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('Role')))
    const [isShowChat, setIsShowChat] = useState(false)
    const [idChat, setIdChat] = useState(null)



    // async componentDidMount() {

    //     if (this.state.infoUser) {
    //         if (this.state.role === "MEMBER") {
    //             this.setState({
    //                 data_toggle_news: 'modal',
    //                 data_target_news: '#modalVerifyPhone_Nb_Form',
    //             })
    //         } else {
    //             this.setState({
    //                 data_toggle_news: '',
    //                 data_target_news: '',
    //             })
    //         }
    //     }
    //     // if (this.state.result_infor_user) {
    //     //     let res = await authServices.getUserInfo();
    //     //     if (res.success) {
    //     //         this.setState({
    //     //             result_infor_user: res.data,
    //     //             username: res.data.local.username,
    //     //             role: "MEMBER",
    //     //         })
    //     //         if (res.data.result) {
    //     //             this.setState({
    //     //                 data_toggle_news_fb: 'modal',
    //     //                 data_target_news_fb: '#modalFeedBack',
    //     //             })
    //     //         }
    //     //     }
    //     //     if (this.state.role === "MEMBER") {
    //     //         this.setState({
    //     //             data_toggle_news: 'modal',
    //     //             data_target_news: '#modalVerifyPhone_Nb_Form',
    //     //         })
    //     //     } else if (this.state.role === "CHUNHATRO") {
    //     //         this.setState({
    //     //             data_toggle_news: '',
    //     //             data_target_news: '',
    //     //         }
    //     //)
    //     //         // await  axios.get("/nguoi-dung/thong-tin")
    //     //         // .then(res => {
    //     //         //     this.setState({
    //     //         //         result_infor_user:res.data.result,
    //     //         //         username:res.data.username,
    //     //         //         role:res.data.role,
    //     //         //         number_phone:res.data.number_phone
    //     //         //         });
    //     //         //         if(res.data.result){
    //     //         //             this.setState({
    //     //         //                 data_toggle_news_fb:'modal',
    //     //         //                 data_target_news_fb:'#modalFeedBack',
    //     //         //         })
    //     //         //         }
    //     //         //     })

    //     //         // .catch( (error) => console.log(error));
    //     //         // if(this.state.role==="MEMBER"){
    //     //         //     this.setState({
    //     //         //         data_toggle_news:'modal',
    //     //         //         data_target_news:'#modalVerifyPhone_Nb_Form',
    //     //         // })
    //     //         // }else if(this.state.role==="CHUNHATRO"){
    //     //         //     this.setState({
    //     //         //         data_toggle_news:'',
    //     //         //         data_target_news:'',
    //     //         // })
    //     //         // }
    //     //     }
    //     // }

    //     // // await axios.get("/nguoi-dung/thong-tin")
    //     // //     .then(res => {
    //     // //         this.setState({
    //     // //             result_infor_user: res.data.result,
    //     // //             username: res.data.username,
    //     // //             role: res.data.role,
    //     // //             number_phone: res.data.number_phone,
    //     // //         });
    //     // //         if (res.data.result) {
    //     // //             this.setState({
    //     // //                 data_toggle_news_fb: 'modal',
    //     // //                 data_target_news_fb: '#modalFeedBack',
    //     // //             })
    //     // //         }
    //     // //         if (res.data.role === "MEMBER") {
    //     // //             this.setState({
    //     // //                 data_toggle_news: 'modal',
    //     // //                 data_target_news: '#modalVerifyPhone_Nb_Form',
    //     // //             })
    //     // //         } else if (res.data.role === "CHUNHATRO") {
    //     // //             this.setState({
    //     // //                 data_toggle_news: '',
    //     // //                 data_target_news: '',
    //     // //             })
    //     // //         }


    //     // //     })
    //     // //     .catch((error) => console.log(error));
    // }

    const callApiGetUser = async () => {
        let res = await authServices.getUserInfo();
        if (res.success) {
            localStorage.setItem('InfoUser', JSON.stringify(res.data))
            localStorage.setItem('UserName', JSON.stringify(res.data.local.username))
            localStorage.setItem('Role', JSON.stringify(res.data.role))
            console.log('run');
            setUserName(res.data.local.username)
            console.log('res.data', res.data)
            setInfoUser(res.data)
            setRole(res.data.role)
            settingUser()
            // this.setState({
            //     username: res.data.local.username,
            //     infoUser : res.data.inforUser,
            //     role: "MEMBER",
            // })
            if (res.success) {
                console.log("run this");
                setData_target_news_fb('#modalFeedBack')
                setData_toggle_news_fb('modal')
                // this.setState({
                //     data_toggle_news_fb: 'modal',
                //     data_target_news_fb: '#modalFeedBack',
                // })
            }
        }
        if (role === "TH??NH VI??N") {
            // this.setState({
            //     data_toggle_news: 'modal',
            //     data_target_news: '#modalVerifyPhone_Nb_Form',
            // })
            setData_target_news('modal')
            setData_toggle_news('#modalVerifyPhone_Nb_Form')
        } else {
            setData_target_news('')
            setData_toggle_news('')
            // this.setState({
            //     data_toggle_news: '',
            //     data_target_news: '',
            // })
            // await  axios.get("/nguoi-dung/thong-tin")
            // .then(res => {
            //     this.setState({
            //         result_infor_user:res.data.result,
            //         username:res.data.username,
            //         role:res.data.role,
            //         number_phone:res.data.number_phone
            //         });
            //         if(res.data.result){
            //             this.setState({
            //                 data_toggle_news_fb:'modal',
            //                 data_target_news_fb:'#modalFeedBack',
            //         })
            //         }
            //     })

            // .catch( (error) => console.log(error));
            // if(this.state.role==="MEMBER"){
            //     this.setState({
            //         data_toggle_news:'modal',
            //         data_target_news:'#modalVerifyPhone_Nb_Form',
            // })
            // }else if(this.state.role==="CHUNHATRO"){
            //     this.setState({
            //         data_toggle_news:'',
            //         data_target_news:'',
            // })
            // }
        }
    }
    const getVerifyPhoneNumber = (result) => {
        props.clickPostNewstoApp(result);
    }
    const clickPostNewstoApp = () => {
        props.clickPostNewstoApp(true);
    }

    const ClickLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('InfoUser')
        localStorage.removeItem('Role')
        localStorage.removeItem('UserName')
        localStorage.removeItem('UserId')
        setInfoUser()
        setRole()
        setUserName()
        logout()

        // this.setState({
        //     result_logout_user: null,
        //     data_toggle_news: 'modal',
        //     data_target_news: '#modalLoginForm',
        //     data_toggle_news_fb: 'modal',
        //     data_target_news_fb: '#modalLoginForm',
        //     result_infor_user: false,
        //     username: "",
        //     role: "",
        //     number_phone: ""
        // });

        // await axios.get("/nguoi-dung/dang-xuat")
        //     .then(res => {
        //         this.setState({
        //             result_logout_user: res.data.result,
        //             data_toggle_news: 'modal',
        //             data_target_news: '#modalLoginForm',
        //             data_toggle_news_fb: 'modal',
        //             data_target_news_fb: '#modalLoginForm',
        //             result_infor_user: false,
        //             username: "",
        //             role: "",
        //             number_phone: ""
        //         });
        //     })
        //     .catch((error) => console.log(error));
    }
    const OpenModalChangePassword = () => {
        const close = document.getElementById("HiddenChangePassword");
        close.click();
    }
    // const showListChat = () => {
    //     setIsShowChat(!isShowChat)
    // }
    // const getItemChat = (id) => {
    //     console.log('id', id)
    //     setIdChat(id)
    // }
    const closeChat = () => {
        setIdChat(null)
    }


    // render() {
    // console.log('user', user)
    return (
        <div className="navbar navbar-expand-sm header1_info_right__div-login_register">
            {user === null ?
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to='/nguoi-dung/dang-nhap' className="nav-link" data-toggle="modal" data-target="#modalLoginForm">????ng nh???p</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/nguoi-dung/dang-ky' className="nav-link" data-toggle="modal" data-target="#modalRegisterForm">????ng k??</NavLink>
                    </li>
                </ul>
                :
                <div className="btn-group">
                    {/* Menu Website if User login success (Menu website n???u user ????ng nh???p th??nh c??ng)*/}
                    <button type="button" className="btn dropdown-toggle bnt_btuserprofile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {username}
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item dropdown-menu_btn" type="button">
                            <NavLink className="text-secondary"  to='/nguoi-dung/sua-thong-tin'
                                onClick={props.clickMovedOnUsertoApp}
                            >Th??ng tin c?? b???n</NavLink>
                        </button>
                        <button className="dropdown-item dropdown-menu_btn"
                            onClick={OpenModalChangePassword} type="button">
                            ?????i m???t kh???u</button>
                        <button className="dropdown-item dropdown-menu_btn"
                            type="button"
                            onClick={ClickLogout}>
                            ????ng xu???t</button>
                        <button className="dropdown-item dropdown-menu_btn hidden-change-password"
                            type="button" id="HiddenChangePassword" data-toggle="modal" data-target="#modalChangePassword"
                        >
                            HiddenChangePassWord</button>
                    </div>
                </div>
            }
            {/* Link post news of menu Website (Link ????ng k?? tin m???i c???a website)*/}
            {
                role === "CH??? NH?? TR???" ? (
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to='/nguoi-dung' className="nav-link"
                                data-toggle data-target={data_target_news}
                            // onClick={clickPostNewstoApp}
                            >????ng tin m???i</NavLink>
                        </li>
                    </ul>
                ) : (
                    user?
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to='/nguoi-dung' className="nav-link"
                                data-toggle="modal" data-target="#modalVerifyPhone_Nb_Form"
                            // onClick={clickPostNewstoApp}
                            >????ng tin m???i</NavLink>
                        </li>
                    </ul>:
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to='/nguoi-dung' className="nav-link"
                            data-toggle="modal" data-target="#modalRegisterForm"
                        // onClick={clickPostNewstoApp}
                        >????ng tin m???i</NavLink>
                    </li>
                </ul>

                )

            }



            <div>
                {/* Modal Login of Website (Form ????ng nh???p c???a website)*/}
                <Login callApiGetUser={callApiGetUser} />
            </div>
            {/* Modal Register of Website (Form ????ng k?? t??i kho???n c???a website)*/}
            <div className="modal fade" id="modalRegisterForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <Register />
            </div>
            {/* Modal Verify PhoneNumber Member want post news
                (Form modal cho kh??ch h??ng member ????ng tin c???n x??c th???c s??? ??i???n tho???i) */}
            <VerifyPhoneNumber
                email={user ? user.local.email : ""}
                getVerifyPhoneNumber={getVerifyPhoneNumber}
            />
            {/* Button feedback (Kh??ch h??ng ????nh gi?? cho website) */}
            {/* <div className="btn-feedback"
                // onClick={ClickBntFeedback}
                data-toggle={data_toggle_news_fb} data-target={data_target_news_fb}>????nh gi??</div> */}

            {/* data-toggle="modal" data-target="#modalLoginForm" */}
            {/* {
                user ? <Link className='btn-Chat cursor-pointer'
                    // onClick={() => showListChat()}
                    to="/messenger"
                >
                    Chat
                    <div className='bg-danger rounded-circle d-flex justify-content-center align-items-center' style={{width:"15px",height:"15px",position:'absolute',top:'0px',right:'7px',zIndex:'99999999'}}>
                        <div>5</div>
                    </div>
                </Link> : <Link className='btn-Chat cursor-pointer' to="/" data-toggle="modal" data-target="#modalLoginForm">
                    Chat
                </Link>
            } */}


            <FeedBack />
            {/* <ListChat
                isShowChat={isShowChat}
                showListChat={showListChat}
                getItemChat={(id) => getItemChat(id)}
            /> */}
            {/* <Chat
                idChat={idChat}
                closeChat={closeChat}
            /> */}
        </div>
    );
}


export default LoginRegister;