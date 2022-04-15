import React, { Component } from 'react';
import './footer.css'
import img_school from './img_footer/img_school.jpg';
import img_envelope from './img_footer/envelope.png';
import img_location from './img_footer/location.png';
import img_phone_call from './img_footer/phone-call.png'



class Footer extends Component {
    render() {
        return (
            <div>
                <div className="Footer">
                    <div className="container ">
                        <div className="row">
                            <div className="col-md-4 col-sm-4 col-xs-4 Footer-infor">
                                <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-header">
                                    <h3>Thông tin liên hệ</h3>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-content">
                                    <img src={img_school} alt="logo" />
                                    <h1>Phòng Trọ Sinh Viên</h1>
                                    <p>PhongTroSinhVien rất vui khi giúp được bạn</p>
                                </div>

                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4">
                                <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-header">
                                    <h3>Giờ làm việc</h3>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-hourwork">
                                    <p>Thứ 2 - Thứ 6 <span>09 AM - 19 PM</span></p>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                    <p>Thứ 7  <span>09 AM - 12 AM</span></p>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                    <p>Chủ nhật <span>09 AM - 19 PM</span></p>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                    <h6><img src={img_phone_call} alt="cty" /><span> (+84 - 028) 38964922</span></h6>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                    <h6><img src={img_envelope} alt="cty" /><span>phongtrosinhvien@gmail.com</span> </h6>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                    <h6><img src={img_location} alt="cty" /> <span>Sư Vạn Hạnh, Quận 10, Thành phố Hồ Chí Minh.</span></h6>
                                </div>

                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4">
                                <div className="row ">
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-header">
                                        <h3>Menu</h3>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6 Footer-menu">
                                        <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                            <p>Trang chủ</p>
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                            <p>Thuê phòng trọ</p>
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                            <p>Thuê căn hộ</p>
                                        </div>

                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6 Footer-menu ">
                                        <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                            <p>Thuê nhà trọ</p>
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                            <p>Liên hệ</p>
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                            <p>Thông tin chi tiêt</p>
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
}

export default Footer;