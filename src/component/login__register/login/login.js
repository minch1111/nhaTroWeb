import React, { Component, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import img_icon_login from '../image_icon_LaR/avatar.png';
import img_icon_password from '../image_icon_LaR/lock.png';
import authServices from "../../../services/authServices"
import useForm from '../../../hooks/useForm'
import axios from 'axios';
let $ = window.$
function Login(props) {

    const { form, error, handleSubmit, register } = useForm()
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)
    var KTL = true

    // function handleChangeField() {
    //     this.setState({
    //         username: this.refs.username.value,
    //         password: this.refs.password.value
    //     })
    // }
    // const submitLogin = async () => {
    //     console.log("clicked");
    // let res = await authServices.login(form)
    // console.log('res', res)

    // this.setState({
    //     message: "Đăng nhập thành công",
    //     result: {
    //         name: "Bùi Minh Chiến",
    //     }
    // })
    // const close = document.getElementById("closelogin");
    // close.click();
    // this.props.callApiGetUser();
    // this.handleClickClose();

    // let {username,password}= this.state;
    // if(!username || !password)
    // {
    //     this.setState({
    //         message:"Vui lòng nhập đầy đủ thông tin!!"
    //     })
    // }else{
    //     // axios.post('/nguoi-dung/dang-nhap',{
    //     //     username:username,
    //     //     password:password
    //     //  },{headers: {'Accept': 'application/json'}})
    //     .then(res => {
    //         this.setState({
    //             message:res.data.message,
    //             result:res.data.result,

    //         });
    //         if(this.state.result){
    //             const close = document.getElementById("closelogin");
    //             close.click();
    //             this.props.callApiGetUser();
    //             this.handleClickClose();
    //             //this.props.onCloseForm(true);
    //         }
    //     })
    //     .catch( (error) => console.log(error));
    // }

    const submitLogin = async () => {
        let res = await authServices.login(form)
        if (res.success) {
            localStorage.setItem('token', JSON.stringify(res.data))
            handleClickClose()
            props.callApiGetUser();
            setMessage(null)
        }
        else {
            setMessage(res.message)
        }
        // let res = await authServices.login(form)
        // if(res.success){

        //     // localStorage.setItem('loginn',JSON.stringify(res.customer))
        //     dispatch({type:LOGIN_SUCCESS,payload:res.customer})
        //     seterrorLogin()
        //     props.togglePopup()
        // }
        // else{
        //     seterrorLogin(res.message)
        // }

    }


    function handleClickClose() {
        // setSuccess(true)
        document.getElementById("closelogin").click()

    }

    useEffect(() => {
        if (success) {
            KTL = false;
        }
    }, [success])


    return (
        <div className="modal fade" id="modalLoginForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <form onSubmit={handleSubmit(submitLogin)} className="modal-content">
                    <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">Đăng nhập</h4>
                        <button type="button" className="close" id="closelogin" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" >×</span>
                        </button>
                    </div>
                    <div className="modal-body mx-3">
                        {message && <div className='text-center text-danger mb-2'>{message}</div>}
                        <div className="md-form mb-4 row">
                            <div className="col-md-2 col-sm-2 col-xs-3 icon_username">
                                <img src={img_icon_login} alt="icon" />
                            </div>
                            <div className="col-md-10 col-sm-8 col-xs-9 inputusername">
                                <input type="text"
                                    className="form-control "
                                    placeholder="Tên đăng nhập"
                                    {...register('username', { required: true })}
                                // ref="username"
                                // onChange={this.handleChangeField}
                                // value={this.state.username}
                                />
                                {
                                    error.username && <small className="text-danger"> {error.username} </small>
                                }
                            </div>
                        </div>
                        <div className="md-form mb-3 row">
                            <div className="col-md-2 col-sm-2 col-xs-3 icon_password">
                                <img src={img_icon_password} alt="icon" />
                            </div>
                            <div className="col-md-10 col-sm-8 col-xs-9 inputpassword">
                                <input type="password"
                                    id="defaultForm-pass"
                                    className="form-control "
                                    placeholder="Mật khẩu"
                                    {...register('password', { required: true })}
                                // ref="password"
                                // onChange={this.handleChangeField}
                                // value={this.state.password}
                                />
                            </div>
                            {
                                error.password && <small className="text-danger"> {error.password} </small>
                            }
                            <div className="col-md-4 col-sm-4 col-xs-4 span_registerinlogin">
                                <Link to='/nguoi-dung/dang-ky' data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#modalRegisterForm">
                                    Quên mật khẩu
                                </Link>
                            </div>
                            <div className="col-md-8 col-sm-8 col-xs-8 span_registerinlogin">
                                <span>Bạn chưa có tài khoản?<Link to='/nguoi-dung/dang-ky' data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#modalRegisterForm">
                                    Đăng ký
                                </Link></span>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center bntdangnhap">
                        <button className='btn btn-default'>Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Login;