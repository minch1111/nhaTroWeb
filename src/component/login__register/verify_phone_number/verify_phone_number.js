import React, { Component } from 'react';
import axios from 'axios';
import authServices from '../../../services/authServices'


import img_icon_phone from '../image_icon_LaR/phone.png';
import img_icon_authentication from '../image_icon_LaR/authentication.png';

import './verify_phone_number.css'
class VerifyPhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number_phone: '',
      error_message: '',
      result_send_opt: false,
      disabled_input_phone_NB: '',
      key_OTP: '',
      result_key_Otp: ''
    }

  }
  Click_send_otp = async (e) => {
    e.preventDefault();
    let res = await authServices.confirmEmailToPostNews()
    if (res.success) {
      const closePhone_nb = document.getElementById("closePhone_nb");
      closePhone_nb.click();
      this.props.getVerifyPhoneNumber(true);
    }
    // if (this.state.number_phone.length < 10) {
    //   this.setState({
    //     error_message: "Vui lòng kiểm tra lại số điện thoại"
    //   })
    // } else {
    //   let { number_phone } = this.state;
    //   let number_phone_post = '84' + parseInt(number_phone, 10);
    //   this.setState({
    //     result_send_opt: "0909",
    //     error_message: "ok",
    //     disabled_input_phone_NB: "disabled"
    //   });
    // }
  }
  getvaluePhone_NB = () => {
    this.setState({
      number_phone: this.refs.number_phone.value,
    })
  }
  handleClickClosePhone_NB = () => {
    this.setState({
      number_phone: '',
      error_message: '',
      result_send_opt: false,
      key_OTP: ''
    })
  }
  getvaluekey_Otp = () => {
    this.setState({
      key_OTP: this.refs.key_otp.value,
    })
  }
  Click_key_Otp = () => {
    let { number_phone, key_OTP } = this.state;


    this.setState({
      result_send_opt: "0909",
      error_message: "ok"
    });

    const closePhone_nb = document.getElementById("closePhone_nb");
    closePhone_nb.click();
    this.props.getVerifyPhoneNumber(true);


  }
  render() {
    return (
      <div className="modal fade" id="modalVerifyPhone_Nb_Form" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">Xác thực Email</h4>
              <button type="button" className="close" id="closePhone_nb" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={this.handleClickClosePhone_NB}>×</span>
              </button>
            </div>
            <div className="modal-body mx-3">
              {this.state.error_message.length > 0 && <p className="error_message-login">{this.state.error_message}</p>}
              <div className="row row_form_phone_nb " >
                <div className="col-md-2 col-sm-2 col-xs-3 icon_number_phone">
                  <i class="fa fa-envelope-o" aria-hidden="true" style={{ fontSize: '20px' }}></i>
                </div>
                <div className="col-md-7 col-sm-6 col-xs-5 inputnumber_phone">
                  <input type="text"
                    className="form-control "
                    // placeholder="Số điện thoại"
                    readOnly
                    value={this.props.email}
                  // disabled={this.state.disabled_input_phone_NB}
                  />
                </div>
                <div className=" col-md-3 col-sm-4 col-xs-4 bnt_form_phone_nb">
                  <input type="button" style={{ fontSize: '12px' }} value="Xác thực Email" onClick={(e) => this.Click_send_otp(e)} />
                </div>

              </div>
              {/* {this.state.result_send_opt &&
                <div className="row row_form_phone_nb">
                  <div className="col-md-2 col-sm-2 col-xs-3 icon_key_otp">
                    <img src={img_icon_authentication} alt="icon" />
                  </div>
                  <div className="col-md-7 col-sm-6 col-xs-5 inputkey_otp">
                    <input type="text"
                      className="form-control "
                      placeholder="Mã OTP"
                      ref="key_otp"
                      onChange={this.getvaluekey_Otp}
                      value={this.state.key_OTP}
                    />
                  </div>
                  <div className=" col-md-3 col-sm-4 col-xs-4 bnt_form_phone_nb">
                    <input type="button" value="Xác nhận" onClick={this.Click_key_Otp} />
                  </div>
                </div>
              } */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyPhoneNumber;