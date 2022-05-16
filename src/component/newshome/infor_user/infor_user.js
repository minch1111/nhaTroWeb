import React, { Component, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './infor_user.css'
import { Context } from '../../../App';
import useForm from '../../../hooks/useForm';
import authServices from "../../../services/authServices"
import { getDistrictsByProvinceCode, getProvinces, getWardsByDistrictCode } from 'sub-vn';
import { FormControl } from '@material-ui/core';
function Inforuser(props) {
  // constructor(props) {
  //     super(props);
  //     this.state={
  //         user:[],
  //         firstname:'',
  //         lastname:'',
  //         username:'',
  //         email:'',
  //         male:true,
  //         female:false,
  //         img_avatar:'',
  //         file:'',
  //         result_upload_avatar:false,
  //         filename_avatar:'',
  //         messages:''
  //     }
  let { user, setUpProfileEdit } = useContext(Context);
  const [fo, setFo] = useState({
    firstname: user.infor.firstname,
    lastname: user.infor.lastname,
    gender: user.infor.gender ? user.infor.gender : true,
    // email: user.local.email,
    // username: user.local.username,
    phone: user.number_phone ? user.number_phone :"",
    city: user.address.city,
    address_detail:user.address.address_detail
  })


  // const [user, setUser] = useState([]);
  const [img_avatar, setImg_avatar] = useState(user.infor.img_avatar);

  const [citys, setCitys] = useState(getProvinces())
  const [districts, setDistricts] = useState([])
  const [streets,setStreets] = useState([])


  const [district,setDistrict] = useState(user.address.district)
  const [street,setStreet] = useState(user.address.street)


  // console.log('user', user)

  const { form, handleSubmit, error, register,setForm } = useForm(fo)


  useEffect(()=>{
    let data = getProvinces()
    let index = data.find(e=>e.name === fo.city)
    let district = getDistrictsByProvinceCode(index.code);
    let indexDistric = district.find(e=>e.name === user.address.district)
    setStreets(getWardsByDistrictCode(indexDistric.code))
    setDistricts(district)
  },[])

// console.log('districts', districts)
  // }
  // async componentDidMount(){
  //     await  axios.get("/nguoi-dung/chinh-sua-thong-tin")
  //     .then(res => {
  //         this.setState({
  //             user:res.data.user,
  //             firstname:res.data.user.infor.firstname,
  //             lastname:res.data.user.infor.lastname,
  //             username:res.data.user.local.username,
  //             number_phone:res.data.user.number_phone,
  //             email:res.data.user.local.email,
  //             male:res.data.user.infor.male_female.male,
  //             female:res.data.user.infor.male_female.female,
  //             img_avatar:res.data.user.infor.img_avatar

  //         })
  //     })
  //     .catch( (error) => console.log(error));
  // }
  // handleChangeField=()=>{
  //     this.setState({
  //        firstname:this.refs.firstname.value,
  //        lastname:this.refs.lastname.value,
  //    })
  // }
  // UploadImageUser= async(e)=>{
  //     e.preventDefault();
  //     await this.setState({
  //         file:e.target.files[0],
  //     });
  //     const formData = new FormData();
  //     formData.append('file',this.state.file);
  //     const config = {
  //         headers: {
  //             'content-type': 'multipart/form-data'
  //         }
  //     }
  //     await axios.post("/nguoi-dung/chinh-sua-thong-tin/anh-dai-dien",formData,config)
  //         .then((res) => {
  //             this.setState({
  //                 result_upload_avatar:res.data.result,
  //                 filename_avatar:res.data.filename_avatar,
  //                 img_avatar:"http://localhost:3001/nguoi-dung/open_image/nameimage="+res.data.filename_avatar
  //             });
  //         }).catch((error) => {
  //         console.log(error);
  //     });
  // }
  // ClickEditProfile=async ()=>{
  //     let {firstname,lastname,username,email,male,female,img_avatar}=this.state;
  //     await axios.post('/nguoi-dung/chinh-sua-thong-tin-ca-nhan',{
  //         firstname,lastname,username,email,male,female,img_avatar
  //      },{headers: {'Accept': 'application/json'}})
  //     .then(res => {
  //         this.setState({
  //             result:res.data.result,
  //             user:res.data.useredited,
  //             firstname:res.data.useredited.infor.firstname,
  //             lastname:res.data.useredited.infor.lastname,
  //             username:res.data.useredited.local.username,
  //             number_phone:res.data.useredited.number_phone,
  //             email:res.data.useredited.local.email,
  //             male:res.data.useredited.infor.male_female.male,
  //             female:res.data.useredited.infor.male_female.female,
  //             img_avatar:res.data.useredited.infor.img_avatar,
  //             messages:res.data.message
  //         });
  //     })
  //     .catch( (error) => console.log(error));
  // }
  // render() {
  //    console.log(this.state.male);

  const handleChange =(e)=>{
    let value = e.currentTarget.value
    setForm({...form,city:e.target.value})
    let data = getProvinces()
    let index = data.find(e=>e.name === value)
    setDistricts(getDistrictsByProvinceCode(index.code))
    setDistrict()
  }

  const handleChangeDistrict = (e)=>{
    let value = e.currentTarget.value;
    setForm({...form,district:e.target.value});
    let indexDistric = districts.find(e=>e.name === value);
    setStreets(getWardsByDistrictCode(indexDistric.code));
    setStreet()
    setDistrict(value)
  }

  const handleChangeWard =(e)=>{
    let value = e.currentTarget.value;
    setForm({...form,street:value});
    setStreet(value)
  }

  const changeAva =(ev)=>{
    console.log('e', ev)
    Array.from(ev.target.files).forEach(file => {

      // Define a new file reader
      let reader = new FileReader();
      // Function to execute after loading the file
      reader.onload = () => {
          // list.push(reader.result)
          console.log('reader.result', reader.result)
          setImg_avatar(reader.result)
          // setForm({ ...form, imageRepresent: reader.result })
      };
      // Read the file as a text
      reader.readAsDataURL(file);
  });
  }

  const submit = async (e) => {
    console.log('form', form)
    let res = await authServices.updateProfileWithoutPassword(form)
    if(res.success){
      console.log('res', res)
      setUpProfileEdit();
    }
    // console.log('res', res)
  }
  return (
    <div className="container-fluid">
      <div className="row alert_messager">
        {/* { this.state.messages  && <div className="alert alert-danger">{this.state.messages}</div>} */}
      </div>
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12 tieudepage_mg">
          <h2 className="tieudepage_mg-h2">Chỉnh sửa thông tin cá nhân</h2>
          <p>Thông tin càng chính xác giúp cho người thuê một cách tốt nhất</p>
        </div>
      </div>

      <div className="row info_news  wow fadeInUp" data-wow-delay="0.1s">
        {/* left column */}
        <div className="col-md-3 form-change-image p-1">
          <div className="text-center">
            <img src={img_avatar ? img_avatar : "https://static123.com/uploads/images/2018/12/12/boy_1544603222.png"} className="avatar img-circle img-responsive" alt="avatar" />
            <h6>Upload a different photo...</h6>
            {/* <input type="file" className="form-control"
            // onChange= {UploadImageUser}
            /> */}
            <div className="file-input">
              <input
                type="file"
                name="file-input"
                id="file-input"
                className="file-input__input"
                accept="gif|jpg|png"
                onChange={changeAva}
              />
              <label className="file-input__label" for="file-input">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="upload"
                  className="svg-inline--fa fa-upload fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                  ></path>
                </svg>
                <span>Upload file</span></label
              >
            </div>
          </div>
        </div>
        {/* edit form column */}
        <form onSubmit={handleSubmit(submit)} className="col-md-9 personal-info">
          <h3>Thông tin</h3>
          <div className="form-group">
            <label className="col-lg-3 control-label">Họ:</label>
            <div className="col-lg-8">
              <input className="form-control" type="text"
                {...register('firstname', { required: true })}
              // ref="firstname"
              // value={this.state.firstname}
              // onChange={this.handleChangeField}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Tên:</label>
            <div className="col-lg-8">
              <input className="form-control" type="text"
                {...register('lastname', { required: true })}
              //  ref="lastname"
              //  onChange={this.handleChangeField}
              //  value={this.state.lastname}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label"> Giới Tính </label>
            <div className='col-lg-8'>
              <select className="form-control " id="gender"
                {...register('gender', { required: true })}
              >
                <option value={false}>Nam</option>
                <option value={true}>Nữ</option>
                {/* <option>Khác</option> */}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Email:</label>
            <div className="col-lg-8">
              <input className="form-control" type="text" disabled
                value={user.local.email}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label">Tên đăng nhập:</label>
            <div className="col-md-8">
              <input className="form-control" type="text"
                // {...register('username')}
                value={user.local.username}
                disabled />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label">Số điện thoại:</label>
            <div className="col-md-8">
              <input className="form-control" type="text"
                {...register('phone')}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label"> Thành phố </label>
            <div className='col-lg-8'>
              <select className="form-control " id="gender"
                {...register('city')}
                onChange={(e)=>{handleChange(e)}}
              >
                {
                  citys.map((o, i) => (
                    <option key={i} value={o.name}>{o.name}</option>

                  ))
                }
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label"> Quận/Huyện </label>
            <div className='col-lg-8'>
              <select className="form-control " id="gender"
                value={district}
                onChange={(e)=>{handleChangeDistrict(e)}}
              >
                {
                  districts.map((o, i) => (
                    <option key={i} value={o.name}>{o.name}</option>

                  ))
                }
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label"> Phường/Xã </label>
            <div className='col-lg-8'>
              <select className="form-control " id="gender"
                value={street}
                onChange={(e)=>{handleChangeWard(e)}}
              >
                {
                  streets.map((o, i) => (
                    <option key={i} value={o.name}>{o.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label">Địa chỉ :</label>
            <div className="col-md-8">
              <input className="form-control" type="text"
                {...register('address_detail')}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label" />
            <div className="col-md-8">
              <button type="submit" className="btn btn-primary"
              // defaultValue="Lưu"
              // onClick={this.ClickEditProfile}
              >
                Lưu
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
// }

export default Inforuser;