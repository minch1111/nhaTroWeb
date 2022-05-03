import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import img_icon_login from '../image_icon_LaR/avatar.png';
import img_icon_password from '../image_icon_LaR/lock.png';
import img_icon_email from '../image_icon_LaR/email.png';
import useForm from '../../../hooks/useForm';
import authServices from '../../../services/authServices';
import img_icon_location from '../../home/image_icon/location.png'
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode, getProvincesWithDetail, getWards } from 'sub-vn'

function Register(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [verifypassword, setVerifyPassword] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [message, setMessage] = useState('')
    const [result, setResult] = useState('')
    const [citys, setCitys] = useState([]);
    const [districts, setDistrics] = useState([]);
    const [wards, setWards] = useState([])
    const [temp, setTemp] = useState('');



    // this.state = {
    //     username: '',
    //     password: '',
    //     email: '',
    //     verifypassword: '',
    //     firstname: '',
    //     lastname: '',
    //     message: '',
    //     result: '',
    // }
    const { form, register, handleSubmit, error, setForm } = useForm()
    const handleSubmitRegister = async () => {
        let res = await authServices.signUp(form)
        if (res.success) {
            setMessage(res.message);
            localStorage.setItem('UserId',JSON.stringify(res.data))
            setTimeout(() => { document.getElementById("IdRegister").click(); }, 100 * 1)
        }

        // let { username, password, email, verifypassword, firstname, lastname } = this.state;
        // if (!username || !password || !email || !verifypassword || !firstname || !lastname) {
        //     this.setState({
        //         message: "Vui lòng nhập đầy đủ thông tin!!"
        //     })
        // } else {
        //     if (password === verifypassword) {
        //         await axios.post('/nguoi-dung/dang-ky', {
        //             username, password, email, firstname, lastname
        //         }, { headers: { 'Accept': 'application/json' } })
        //             .then(res => {
        //                 this.setState({
        //                     message: res.data.message,
        //                     result: res.data.result,
        //                 });
        //                 if (res.data.result) {
        //                     const close = document.getElementById("IdRegister");
        //                     setTimeout(() => { close.click() }, 1000 * 1);
        //                 }
        //             })
        //             .catch((error) => console.log(error));
        //     } else {
        //         this.setState({
        //             message: "Nhập lại mật khẩu không khớp",
        //         })
        //     }
        // }

    }

    // handleChangeField = () => {
    //     this.setState({
    //         username: this.refs.username.value,
    //         password: this.refs.password.value,
    //         email: this.refs.email.value,
    //         verifypassword: this.refs.verifypassword.value,
    //         firstname: this.refs.firstname.value,
    //         lastname: this.refs.lastname.value,
    //     })
    // }
    const handleClickCloseRegister = () => {

    }

    const getCity = (e) => {
        setDistrics(getDistrictsByProvinceCode(e.target.value))
        setTemp(e.target.value)
        let dt = getProvinces()
        dt.forEach(element => {
            if (element.code === e.target.value) {
                // setCity(element.name)
                setForm({ ...form, city: element.name })

            }
        });

    }

    const getDistrict = (e) => {
        // console.log('e.target.value', e.target.value)
        setWards(getWardsByDistrictCode(e.target.value))
        let dt = getDistrictsByProvinceCode(temp)
        dt.forEach(el => {
            if (el.code === e.target.value) {
                // setDistrict(el.name)
                setForm({ ...form, district: el.name })
            }
        })
        setTemp(e.target.value)
    }
    const getWard = (e) => {
        // setWard(e.target.value)
        setForm({ ...form, street: e.target.value })

    }
    useEffect(() => {
        setCitys(getProvinces())
    }, [])
    console.log('form', form)
    return (
        <form onSubmit={handleSubmit(handleSubmitRegister)} className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header text-center">
                    <h4 className="modal-title w-100 font-weight-bold">Đăng Ký</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" id="IdRegister" onClick={handleClickCloseRegister}>×</span>
                    </button>
                </div>
                <div className="modal-body mx-3">

                    <div className="md-form mb-3 row">
                        <div className="col-md-6 col-sm-6 col-xs-6 inputusername input_formname">
                            <input type="text"
                                className="form-control "
                                placeholder="Họ"
                                id='firstname'
                                {...register('firstname', { required: true })}

                            // ref="firstname"
                            // onChange={this.handleChangeField}
                            // value={this.state.firstname}
                            />
                            {
                                error.firstname && <small className="text-danger"> {error.firstname} </small>

                            }
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6 inputusername input_formname">
                            <input type="text"
                                className="form-control "
                                placeholder="Tên"
                                id='lastname'
                                {...register('lastname', { required: true })}

                            // ref="lastname"
                            // onChange={this.handleChangeField}
                            // value={this.state.lastname}
                            />
                            {
                                error.lastname && <small className="text-danger"> {error.lastname} </small>

                            }
                        </div>
                    </div>
                    <div className="md-form mb-3 row">
                        <div className="col-md-2 col-sm-2 col-xs-3 icon_username">
                            <img src={img_icon_login} alt="icon" />
                        </div>
                        <div className="col-md-10 col-sm-8 col-xs-9 inputusername">
                            <input type="text"
                                className="form-control "
                                placeholder="Tên đăng nhập"
                                id='username'
                                {...register('username', { required: true, min: 6, max: 32 })}
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
                                className="form-control "
                                placeholder="Mật khẩu"
                                id='password'
                                {...register('password', { required: true, min: 6, max: 32 })}
                            // ref="password"
                            // onChange={this.handleChangeField}
                            // value={this.state.password}
                            />
                            {
                                error.password && <small className="text-danger"> {error.password} </small>
                            }
                        </div>
                    </div>
                    <div className="md-form mb-3 row">
                        <div className="col-md-2 col-sm-2 col-xs-3 icon_password">
                            <img src={img_icon_password} alt="icon" />
                        </div>
                        <div className="col-md-10 col-sm-8 col-xs-9 inputpassword">
                            <input type="password"
                                className="form-control "
                                placeholder="Nhập lại mật khẩu"
                                id='confirm'
                                {...register('confirm', { required: true, confirm: true })}

                            // ref="verifypassword"
                            // onChange={this.handleChangeField}
                            // value={this.state.verifypassword}
                            />
                            {
                                error.confirm && <small className="text-danger"> {error.confirm} </small>
                            }
                        </div>
                    </div>
                    <div className="md-form mb-3 row">
                        <div className="col-md-2 col-sm-2 col-xs-3 icon_password">
                            <img src={img_icon_email} alt="icon" />
                        </div>
                        <div className="col-md-10 col-sm-8 col-xs-9 inputpassword">
                            <input type="email"
                                className="form-control "
                                placeholder="Email"
                                id='email'
                                // ref="email"
                                // onChange={this.handleChangeField}
                                // value={this.state.email}
                                {...register('email', { required: true })}
                            />
                            {
                                error.email && <small className="text-danger"> {error.email} </small>
                            }
                        </div>
                    </div>
                    <div className="md-form mb-3 row">
                        <div className="col-md-2 col-sm-2 col-xs-3 icon_password">
                            <img src={img_icon_location} alt="icon" />
                        </div>
                        <div className="col-md-4 col-sm-8 col-xs-9 inputpassword">
                            <div class="form-group">
                                <select class="form-control" name='city' id="" onChange={getCity}>
                                    <option value={null} >-- Chọn Tỉnh/Thành Phố --</option>
                                    {
                                        citys.map((item, index) =>
                                            <option key={index} value={item.code} >{item.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col-md-2'>

                        </div>
                        <div className="col-md-4 col-sm-8 col-xs-9 inputpassword">
                            <div class="form-group">
                                <select class="form-control" name='district' id="" onChange={getDistrict}>
                                    <option value={null} >-- Chọn Quận/Huyện --</option>
                                    {
                                        districts.map((item, index) =>
                                            <option key={index} value={item.code} >{item.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="md-form mb-3 row">
                        <div className="col-md-2 col-sm-2 col-xs-3 icon_password">
                            <img src={img_icon_location} alt="icon" />
                        </div>
                        <div className="col-md-4 col-sm-8 col-xs-9 inputpassword">
                            <div class="form-group">
                                <select class="form-control" name='ward' id="" onChange={getWard} >
                                    <option value={null} >-- Chọn Phường/Xã --</option>
                                    {
                                        wards.map((item, index) =>
                                            <option key={index} value={item.name} >{item.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col-md-2'>

                        </div>
                        <div className="col-md-4 col-sm-8 col-xs-9 inputpassword">
                            <div class="form-group">
                                <input className='form-control' type='text' placeholder='Nhập địa chỉ' {...register('address_detail')} />
                            </div>
                        </div>
                    </div>


                </div>
                <div className="modal-footer d-flex justify-content-center bntdangnhap">
                    <button type="submit" className="btn btn-defaul text-light" >Đăng ký</button>
                </div>
            </div>
        </form>
    );
}


export default Register;