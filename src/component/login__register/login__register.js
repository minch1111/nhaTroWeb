import React, { Component, useContext, useState } from 'react';
import { NavLink } from "react-router-dom";
import './login__register.css';
import Login from './login/login';
import Register from './register/register';
import VerifyPhoneNumber from './verify_phone_number/verify_phone_number';
import axios from 'axios';
import FeedBack from './feedback/feedback';
import authServices from '../../services/authServices';
import { Context } from '../../App';
import ListChat from './chat/ListChat';
import Chat from './chat/Chat';

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
    const [data_toggle_news, setData_toggle_news] = useState('modal')
    const [data_target_news, setData_target_news] = useState('#modalLoginForm')
    const [data_toggle_news_fb, setData_toggle_news_fb] = useState('modal')
    const [data_target_news_fb, setData_target_news_fb] = useState('#modalLoginForm')
    const [result_infor_user, setResult_infor_user] = useState(false)
    const [result_logout_user, setResult_logout_user] = useState(false)
    const [username, setUserName] = useState(userName)
    const [infoUser, setInfoUser] = useState(user)
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('Role')))
    const [isShowChat, setIsShowChat] = useState(false)
    const [idChat,setIdChat] = useState(null)



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
            localStorage.setItem('InfoUser', JSON.stringify(res.data.infor))
            localStorage.setItem('UserName', JSON.stringify(res.data.local.username))
            localStorage.setItem('Role', JSON.stringify('MEMBER'))
            console.log('run');
            setUserName(res.data.local.username)
            setInfoUser(res.data.inforUser)
            setRole('MEMBER')
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
        if (role === "MEMBER") {
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
        if (username && role === "CHUNHATRO") {
            props.clickPostNewstoApp(true);
        }
    }

    const ClickLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('InfoUser')
        localStorage.removeItem('Role')
        localStorage.removeItem('UserName')
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
    const showListChat = () => {
        setIsShowChat(!isShowChat)
    }
    const getItemChat =(id)=>{
        console.log('id', id)
        setIdChat(id)
    }
    const closeChat =()=>{
        setIdChat(null)
    }
    // render() {
    // console.log('user', user)
    return (
        <div className="navbar navbar-expand-sm header1_info_right__div-login_register">
            {user === null ?
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to='/nguoi-dung/dang-nhap' className="nav-link" data-toggle="modal" data-target="#modalLoginForm">Đăng nhập</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/nguoi-dung/dang-ky' className="nav-link" data-toggle="modal" data-target="#modalRegisterForm">Đăng ký</NavLink>
                    </li>
                </ul>
                :
                <div className="btn-group">
                    {/* Menu Website if User login success (Menu website nếu user đăng nhập thành công)*/}
                    <button type="button" className="btn dropdown-toggle bnt_btuserprofile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {username}
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item dropdown-menu_btn" type="button">
                            <NavLink to='/nguoi-dung/sua-thong-tin'
                                onClick={props.clickMovedOnUsertoApp}
                            >Thông tin cơ bản</NavLink>
                        </button>
                        <button className="dropdown-item dropdown-menu_btn"
                            onClick={OpenModalChangePassword} type="button">
                            Đổi mật khẩu</button>
                        <button className="dropdown-item dropdown-menu_btn"
                            type="button"
                            onClick={ClickLogout}>
                            Đăng xuất</button>
                        <button className="dropdown-item dropdown-menu_btn hidden-change-password"
                            type="button" id="HiddenChangePassword" data-toggle="modal" data-target="#modalChangePassword"
                        >
                            HiddenChangePassWord</button>
                    </div>
                </div>
            }
            {/* Link post news of menu Website (Link đăng ký tin mới của website)*/}
            {
                role === "CHUNHATRO" && (<ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to='/nguoi-dung/dang-tin-moi' className="nav-link" data-toggle={data_toggle_news} data-target={data_target_news}
                            onClick={clickPostNewstoApp}>Đăng tin mới</NavLink>
                    </li>
                </ul>)
            }



            <div>
                {/* Modal Login of Website (Form đăng nhập của website)*/}
                <Login callApiGetUser={callApiGetUser} />
            </div>
            {/* Modal Register of Website (Form đăng ký tài khoản của website)*/}
            <div className="modal fade" id="modalRegisterForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <Register />
            </div>
            {/* Modal Verify PhoneNumber Member want post news
                (Form modal cho khách hàng member đăng tin cần xác thực số điện thoại) */}
            <VerifyPhoneNumber getVerifyPhoneNumber={getVerifyPhoneNumber} />
            {/* Button feedback (Khách hàng đánh giá cho website) */}
            <div className="btn-feedback"
                // onClick={ClickBntFeedback}
                data-toggle={data_toggle_news_fb} data-target={data_target_news_fb}>Đánh giáâ</div>
            <div className='btn-Chat cursor-pointer'
                onClick={() => showListChat()}
            >
                Chat
            </div>
            <FeedBack />
            <ListChat
            isShowChat={isShowChat}
            showListChat={showListChat}
            getItemChat={(id)=>getItemChat(id)}
             />
            <Chat
                idChat = {idChat}
                closeChat={closeChat}
            />
        </div>
    );
}


export default LoginRegister;