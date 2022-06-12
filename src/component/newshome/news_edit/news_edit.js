import React, { Component, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';


import img_icon_location from '../../home/image_icon/location.png'
import img_icon_price from './news_image/price.png'
import img_icon_space from './news_image/space.png'
import img_icon_phone_call from './news_image/phone-call.png'

import './news_new.css'

import UploadImage from './upload_image_news/upload_image';
import SelectOption from './select_option_NT/select_option_NT';
// import GoogleMap from './google_map/google_map';
import Utilities from './utilities/utilities';
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from "sub-vn"
import { apiWithoutUser } from '../../../config/api';
import postt from '../../../services/news';
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";


function EditNews(props) {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         form: {},
    //         //###########__ Get Children Select address__########
    //         city: '',
    //         district: '',
    //         street: '',
    //         //###########__ Get data Select address (to database)__########
    //         citys: [],
    //         districts: [],
    //         wards: [],
    //         streets: [],

    //         //###########__ Get value input address__########
    //         inputmap: '',
    //         open_selectoption_NT_CH: false,
    //         result_postnews: false,
    //         //################__ Save News __###############
    //         code_city: '',
    //         code_dictrict: '',
    //         code_street: '',
    //         number_home: '',
    //         title: '',
    //         code_type_news: '',
    //         content_infor: '',
    //         price: '',
    //         acreage: '',
    //         url_Image: null,
    //         url_Images_Infor: [],
    //         price_format: '',
    //         //################__ Optiion Select Home __########
    //         nb_bedroom: null,
    //         nb_bath_toilet: null,
    //         nb_kitchenroom: null,
    //         //################__Utilities __########
    //         utilities: '',
    //         //################__Type Home (Thể loại đăng tin) __########
    //         typehome: 1,
    //         urltypenews: '',
    //     }
    // }

    const { slug } = useParams()


    const [data, setData] = useState(null)

    const [citys, setCitys] = useState(getProvinces())
    const [isChangeDistrict, setIsChangeDistrict] = useState(true)
    const [isChangeWard, setIsChangeWard] = useState(true)
    const [city, setCity] = useState();
    const [districts, setDistricts] = useState()
    const [wards, setWards] = useState()
    const [address_detail, setAddressDetail] = useState("")
    const [title, setTitle] = useState("")
    const [typehome, setTypeHome] = useState("1")
    const [content_infor, setContentInfor] = useState("")
    const [price, setPrice] = useState();
    const [price_format, setPriceFormat] = useState();
    const [acreage, setAcreage] = useState()
    const [open_selectoption_NT_CH, setOpenSelectionNTCH] = useState(false);
    const [url_Image, setUrlImage] = useState()
    const [url_Images_Infor, setUrlImagesInfor] = useState([])



    useEffect(() => {
        (async () => {
            let res = await postt.getNewsDetailToEdit(slug)
            if (res.success) {
                setData(res.data)
                // setCity(res.data.address.city)
            }
        })()
    }, [])

    useEffect(() => {

        if (data) {
            let datas = getProvinces()
            let index = datas.find(e => e.name === data.address.city)
            let district = getDistrictsByProvinceCode(index.code);
            let indexDistric = district.find(e => e.name === data.address.district)
            setWards(getWardsByDistrictCode(indexDistric.code))
            setDistricts(district)
        }

    }, [data?.infor?.number_phone])

    // componentWillMount() {
    //     //    console.log('getProvinces()', getProvinces())
    //     this.state.citys = getProvinces()
    //     // console.log('run')
    // }

    // async componentDidMount () {
    //     let res = await postt.getNewsDetail()
    //     //  axios.post('/phong-tro/dang-tin-moi/chon-tinhTP')
    //     // .then(res=>
    //     // document. getElementById("city"). setAttribute("disabled", "disabled");
    //     // this.setState({
    //     // citys: [{code:50,name:"Thành Phố Hồ Chí Minh"}]})
    //     // }))
    //     // .catch( (error) => console.log(error));
    // }
    const submitClickCity = (e) => {   // Get value and children submit
        let value = e.currentTarget.value
        console.log('value', typeof value)
        setData({ ...data, address: { ...data.address, city: value } })
        if (value === 0 || value === "0") {
            alert("Không được để trống trường Thành Phố/Tỉnh")
            setDistricts()
            setWards()
        }
        else {
            let datas = getProvinces()
            let index = datas.find(e => e.name === value)
            setDistricts(getDistrictsByProvinceCode(index.code))
            setWards()
            setIsChangeDistrict(false)
        }

        // setDistrict()
    }
    const sumitClickDictrict = (e) => {
        let value = e.currentTarget.value;
        setData({ ...data, address: { ...data.address, district: e.target.value } });

        if (value !== "0") {
            let indexDistric = districts.find(e => e.name === value);
            setWards(getWardsByDistrictCode(indexDistric.code));
            setIsChangeWard(false)
        }

        // var district="";
        // let parent_code =  e.target.value;
        // let parent_code_city=this.state.code_city;
        // if(e.target.value!== 0) {district=e.target[e.target.selectedIndex].text+", "}
        // this.setState({
        //     district:district,
        //     code_dictrict:parent_code,
        //     inputmap:this.state.number_home+" "+this.state.street+district+this.state.city
        // })
        // await axios.post('/phong-tro/dang-tin-moi/chon-Duong',{
        //     parent_code,
        //     parent_code_city
        //  },{headers: {'Accept': 'application/json'}})
        // .then(res => {
        //     this.setState({
        //         streets:res.data.streets
        //     });
        // })
        // .catch( (error) => console.log(error));
    }

    const sumitClickWard = (e) => {
        let value = e.currentTarget.value;
        setData({ ...data, address: { ...data.address, street: value } });
    }
    const HandlerInputNumberHome = (e) => {
        // let number_home = this.refs.number_home.value;
        // this.setState({
        //     address_detail: number_home,
        // })
        let val = e.currentTarget.value;
        setData({ ...data, address: { ...data.address, address_detail: val } })
    }
    const SelectTypeHome = (e) => {
        if (e.target.value === "1") {
            setData({
                ...data, infor: {
                    ...data.infor,
                    typehome: 1
                }
            })
            setOpenSelectionNTCH(false)
        } else if (e.target.value === "2") {
            // this.setState({
            //     typehome: 2,
            //     open_selectoption_NT_CH: true
            // })
            setData({
                ...data, infor: {
                    ...data.infor,
                    typehome: 2
                }
            })
            setOpenSelectionNTCH(true)
        } else {
            // this.setState({
            //     typehome: 3,
            //     open_selectoption_NT_CH: true
            // })
            setData({
                ...data, infor: {
                    ...data.infor,
                    typehome: 3
                }
            })
            setOpenSelectionNTCH(true)
        }
    }
    const getSelectSelectOption = (nb_bedroom, nb_bath_toilet, nb_kitchenroom) => {
        // this.setState({
        //     nb_bedroom: nb_bedroom,
        //     nb_bath_toilet: nb_bath_toilet,
        //     nb_kitchenroom: nb_kitchenroom
        // })
        setData({
            ...data, infor: {
                ...data.infor, nb_bath_toilet: parseInt(nb_bath_toilet),
                nb_bedroom: parseInt(nb_bedroom),
                nb_kitchenroom: parseInt(nb_kitchenroom),
            }
        })

    }
    const getUrlImage_News = (Url_Image, NameImages_Infor) => {
        // var Url_Images_Infor = [];
        // NameImages_Infor.forEach(item => {
        //     Url_Images_Infor.push(apiWithoutUser+"/phong-tro/open_image/nameimage=" + item);
        // });
        // this.setState({
        //     url_Image: Url_Image,
        //     url_Images_Infor: Url_Images_Infor
        // })
        // console.log('Url_Image_Info', NameImages_Infor)
        this.setState({
            url_Image: Url_Image,
            url_Images_Infor: NameImages_Infor
        })
    }
    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    }

    const handleChangeTitle = (e) => {
        let val = e.currentTarget.value;
        setData({ ...data, infor: { ...data.infor, title: val } })
    }

    const handleChangePrice = (e) => {
        let val = e.currentTarget.value;
        setData({ ...data, infor: { ...data.infor, price: val } })
    }

    const handleChangeAcreage = (e) => {
        let val = e.currentTarget.value;
        setData({ ...data, infor: { ...data.infor, acreage: val } })
    }

    const handleChangeContent = (e) => {
        let val = e.currentTarget.value;
        setData({ ...data, infor: { ...data.infor, content_infor: val } })
    }

    const sumitPostNews = async () => {
        var formObj = {};

        formObj = {
            title: data?.infor?.title,
            content_infor: data?.infor?.content_infor,
            number_phone: "0783412710",
            price: data?.infor?.price,
            acreage: data?.infor?.acreage,
            img_avatar: data?.img_avatar,
            img_infor: data?.img_infor,
            city: data?.address?.city,
            district: data?.address?.district,
            street: data?.address?.street,
            address_detail: data?.address?.address_detail,
            nb_bedroom: data?.infor?.nb_bedroom,
            nb_bath_toilet: data?.infor?.nb_bath_toilet,
            nb_kitchenroom: data?.infor?.nb_kitchenroom,
            utilities: data?.utilities,
            typehome: data?.infor?.typehome
        }
        console.log('formObj', formObj)
        if (data?.address?.city === "" || data?.address?.district === "" || data?.address?.street === "" || !data?.address?.address_detail || data?.address?.address_detail === "") {
            alert("Chưa nhập địa chỉ")
        } else if (data?.infor?.title === "" || data?.infor?.content_infor === "") {
            alert("Chưa nhập thông tin bài viết")
        }
        else if (data?.infor?.price === "" || !data?.infor?.price) {
            alert("Chưa nhập giá tiền")
        }
        else if (data?.infor?.acreage === "" || !data?.infor?.acreage) {
            alert("Chưa nhập diện tích")
        }
        else if (!data.utilities) {
            alert("Chưa nhập tiện ích")
        } else if (!data.img_avatar || data.img_infor.length === 0) {
            alert("Chưa chọn hình ảnh")
        } else {
            let res = await postt.updateNews(slug,formObj);
            if (res.result) {
                alert(res.message)
            } else {
                alert(res.message)
            }
        }


        // let date = new Date();
        // let date_format = date.toLocaleDateString();


        // let date_n = new Date();
        // let date_fn = new Date(date_n.setMonth(date_n.getMonth() + 1));
        // let date_finish_format = date_fn.toLocaleDateString();



        // let title = this.state.title;
        // let content_infor = this.state.content_infor;
        // let number_phone = this.props.GetPhone_Number;
        // let price = this.state.price;
        // let acreage = this.state.acreage;
        // let img_avatar = this.state.url_Image;
        // let img_infor = this.state.url_Images_Infor;
        // let code_city = this.state.code_city;
        // let code_dictrict = this.state.code_dictrict;
        // let code_street = this.state.code_street;
        // let address_detail = this.state.inputmap;
        // let typehome = this.state.typehome;
        // let date_now = date_format;
        // let date_finish = date_finish_format;
        // let utilities = this.state.utilities
        // let Lat_ggmap = this.state.Lat_ggmap;
        // let Lng_ggmap = this.state.Lng_ggmap;


        // if (this.state.typehome === 1) {
        //     await axios.post('/phong-tro/dang-tin-moi/phong-tro', {
        //         title, content_infor, number_phone, price, acreage, img_avatar, img_infor,
        //         code_city, code_dictrict, code_street, Lat_ggmap, Lng_ggmap, typehome,
        //         utilities, date_now, date_finish, address_detail
        //     }, { headers: { 'Accept': 'application/json' } })
        //         .then(res => {
        //             if (res.data.result) {
        //                 this.setState({
        //                     result_postnews: true,
        //                     message_postnews: res.data.message,
        //                     urltypenews: '/nguoi-dung/quan-ly-tin-dang/phong-tro'
        //                 });

        //             } else {
        //                 this.setState({
        //                     result_postnews: false,
        //                     message_postnews: res.data.message
        //                 });
        //             }

        //         })
        //         .catch((error) => console.log(error));
        // } else if (this.state.typehome === 2) {
        //     let nb_bedroom = this.state.nb_bedroom;
        //     let nb_bath_toilet = this.state.nb_bath_toilet;
        //     let nb_kitchenroom = this.state.nb_kitchenroom;
        //     axios.post('/phong-tro/dang-tin-moi/nha-tro', {
        //         title, content_infor, number_phone, price, acreage, img_avatar, img_infor,
        //         code_city, code_dictrict, code_street, Lat_ggmap, Lng_ggmap, nb_bedroom, nb_bath_toilet,
        //         nb_kitchenroom, utilities, date_now, date_finish, typehome, address_detail
        //     }, { headers: { 'Accept': 'application/json' } })
        //         .then(res => {
        //             if (res.data.result) {
        //                 this.setState({
        //                     result_postnews: true,
        //                     message_postnews: res.data.message,
        //                     urltypenews: '/nguoi-dung/quan-ly-tin-dang/nha-tro'
        //                 });
        //             } else {
        //                 this.setState({
        //                     result_postnews: false,
        //                     message_postnews: res.data.message
        //                 });
        //             }

        //         })
        //         .catch((error) => console.log(error));
        // }
        // else {
        //     let nb_bedroom = this.state.nb_bedroom;
        //     let nb_bath_toilet = this.state.nb_bath_toilet;
        //     let nb_kitchenroom = this.state.nb_kitchenroom;
        //     axios.post('/phong-tro/dang-tin-moi/can-ho', {
        //         title, content_infor, number_phone, price, acreage, img_avatar, img_infor,
        //         code_city, code_dictrict, code_street, Lat_ggmap, Lng_ggmap, nb_bedroom, nb_bath_toilet,
        //         nb_kitchenroom, utilities, date_now, date_finish, typehome, address_detail
        //     }, { headers: { 'Accept': 'application/json' } })
        //         .then(res => {
        //             if (res.data.result) {
        //                 this.setState({
        //                     result_postnews: true,
        //                     message_postnews: res.data.message,
        //                     urltypenews: '/nguoi-dung/quan-ly-tin-dang/can-ho'
        //                 });
        //             } else {
        //                 this.setState({
        //                     result_postnews: false,
        //                     message_postnews: res.data.message
        //                 });
        //             }
        //         })
        //         .catch((error) => console.log(error));
        // }
        // let res = await postt.updateNews(slug,formObj)
        // if(res.success){
        //     alert("Cập nhật thành công !")
        // }else{
        //     alert(res.message)
        // }
    }


    // Check value utilities (Lấy giá trị của các tiện ích)
    const getValueUtilities = (valueisCheck) => {
        console.log(valueisCheck)
        setData({
            ...data,
            utilities: valueisCheck
        })

    }
    const HandleChangAvatar = (ev) => {
        // this.setState({
        //     url_Image: null
        // })
        Array.from(ev.target.files).forEach(file => {

            // Define a new file reader
            let reader = new FileReader();
            // Function to execute after loading the file
            reader.onload = () => {
                // list.push(reader.result)
                // setForm({ ...form, imageRepresent: reader.result })
                // this.setState({
                //     url_Image: reader.result
                // })
            };
            // Read the file as a text
            reader.readAsDataURL(file);
        });
    }
    const HandleChangeList = async (ev) => {
        // this.setState({
        //     url_Images_Infor:[]
        // })
        await Array.from(ev.target.files).forEach(async (file) => {
            // console.log("run " + i);
            // Define a new file reader
            let reader = new FileReader();
            // Function to execute after loading the file
            // console.log(`file`, file)
            // if (file.size < 5120) {
            reader.onload = () => {

                // list.push(reader.result)
                // run = true
                // this.setState({
                //     url_Images_Infor: [...this.state.url_Images_Infor, reader.result]
                // })
            };
            reader.readAsDataURL(file);
        });
    }
    // render() {
    // var KTL = true;
    // if (this.state.message_postnews) {
    //     KTL = false;
    // }

    // console.log('this.state.form', this.state.form)
    // if (this.state.result_postnews) return <Redirect to={this.state.urltypenews} />
    // console.log('data', data)
    if (!data) return <div className='d-flex justify-content-center align-items-center'> <ReactLoading type='bars' color='rgb(148 112 84)' /> </div>
    return (
        <div className="container-fluid">
            <div className="row alert_messager">
                {/* {!KTL && <div className="alert alert-danger">{this.state.message_postnews}</div>} */}
            </div>
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 tieudepage_mg">
                    <h2 className="tieudepage_mg-h2">Chỉnh sửa bài đăng</h2>
                    <p>Thông tin càng chính xác giúp cho người thuê một cách tốt nhất</p>
                </div>
            </div>
            <div className="ggmappage wow fadeInUp" data-wow-delay="0.1s">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 ggmappage_mg">
                        <h2 className="ggmappage_mg-h2" >Địa chỉ cho thuê</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-3 col-xs-12">
                        <div className="form-group">
                            <select className="form-control nice-select wide select_item " id='city' value={data?.address?.city} name="calc_shipping_provinces" onChange={e => submitClickCity(e)}>
                                <option value="0" >-- Chọn Tỉnh/Thành Phố --</option>
                                {
                                    citys?.map((item, index) =>
                                        <option key={index} value={item.name} typename={item.name}>{item.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-12">
                        <div className="form-group">
                            {

                            }
                            <select className="form-control nice-select wide select_item" value={data?.address?.district} onChange={e => sumitClickDictrict(e)} disabled={isChangeDistrict}>
                                <option value='0'>-- Chọn Quận/Huyện --</option>
                                {
                                    districts?.map((item, index) =>
                                        <option key={index} value={item.name} typename={item.name}>{item.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-12">
                        <div className="form-group">
                            <select className="form-control nice-select wide select_item" value={data?.address?.street} onChange={e => sumitClickWard(e)} disabled={isChangeWard}>
                                <option value='0'>-- Chọn Tên Phường/Xã --</option>
                                {
                                    wards?.map((item, index) =>
                                        <option key={index} value={item.name}>{item.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-12">
                        <div className="form-group">

                            <input type="text" name="" id="" className="form-control" aria-describedby="helpId"
                                placeholder="Số Nhà"
                                value={data?.address?.address_detail}
                                // ref="number_home"
                                onChange={e => HandlerInputNumberHome(e)}
                            />

                        </div>

                    </div>
                </div>
            </div>
            <div className="row info_news  wow fadeInUp" data-wow-delay="0.1s">
                <div className="col-md-12 col-sm-12 col-xs-12 info_news_div">
                    <h2 className="info_news_div-h2">Thông tin mô tả</h2>
                </div>
                <div className="col-md-8 col-sm-8 col-xs-12">
                    <input className="infor_news_input_td"
                        // ref="title"
                        value={data?.infor.title}
                        onChange={(e) => handleChangeTitle(e)}
                        placeholder="Tiêu đề" />
                </div>
                <div className="col-md-4 col-sm-4 col-xs-12">
                    <div className="col-md-10 col-sm-10 col-xs-12">
                        <select className="form-control nice-select wide select_item" value={data?.infor?.typehome.toString()} onChange={e => SelectTypeHome(e)}>
                            <option value="1">Thuê phòng trọ</option>
                            <option value="2">Thuê nhà nguyên căn</option>
                            <option value="3">Thuê căn hộ</option>
                        </select>
                    </div>
                </div>
                <div className="row content_news">
                    <div className="col-md-8 col-sm-8 col-xs-12 content_news">
                        <textarea
                            // ref="content_infor"
                            value={data?.infor?.content_infor}
                            onChange={e => handleChangeContent(e)}
                            placeholder="Mô tả thông tin nhà trọ" />
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12 content-warning">
                        <div className="alert alert-warning" role="alert" >
                            <div className="row titel-warning">
                                <h4>Lưu ý khi đăng tin</h4>
                            </div>
                            <div className="row body-warning">
                                <ul>
                                    <li>Nội dung phải viết bằng tiếng Việt có dấu</li>
                                    <li>Tiêu đề tin không dài quá 100 kí tự</li>
                                    <li>Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.</li>
                                    <li> Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.</li>
                                    <li>Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-4 ">
                    <div className="row">
                        <div className="col-md-2 col-sm-2 col-xs-4 icon_option">
                            <img src={img_icon_phone_call} alt="icon phone" />
                        </div>
                        <div className="col-md-10 col-sm-10 col-xs-8 input_option">
                            <input className="content_news_ip"
                                placeholder="Số điện thoại"
                                value={data?.infor?.number_phone}
                                disabled />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-4">
                    <div className="row">
                        <div className="col-md-2 col-sm-2 col-xs-2 icon_option">
                            <img src={img_icon_price} alt="icon price" />
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6 input_option">
                            <input className="content_news_ip"
                                type='number'
                                // ref="price"
                                value={data?.infor?.price}
                                onChange={e => handleChangePrice(e)}
                                placeholder="Giá tiền" />
                        </div>
                        {price_format &&
                            <div className="col-md-4 col-sm-6 col-xs-4 row price_format">
                                <div className="row price_format-label">
                                    <label>Số tiền:</label>
                                </div>
                                <div className="row  price_format-span">
                                    <span>{price_format ? price_format + " VND" : " "}</span>
                                </div>

                            </div>
                        }
                    </div>

                </div>
                <div className="col-md-4 col-sm-4 col-xs-4">
                    <div className="row">
                        <div className="col-md-2 col-sm-2 col-xs-4 icon_option">
                            <img src={img_icon_space} alt="icon space" />
                        </div>
                        <div className="col-md-10 col-sm-10 col-xs-8 input_option">
                            <input className="content_news_ip"
                                // ref="acreage"
                                type="number"
                                value={data?.infor?.acreage}
                                onChange={e => handleChangeAcreage(e)}
                                placeholder="Diện tích" />
                            <label className="input_option-acreage" >m<sup>2</sup></label>
                        </div>
                    </div>
                </div>
                {open_selectoption_NT_CH && <SelectOption getSelectSelectOption={(val) => getSelectSelectOption(val)} data={data} />}
            </div>
            <Utilities typehome={data?.infor?.typehome} utilitiesData={data?.utilities} open_selectoption_NT_CH={open_selectoption_NT_CH} getValueUtilities={getValueUtilities} />
            {/* <UploadImage getUrlImage_News={this.getUrlImage_News}  /> */}
            <div className='row image_news  wow fadeInUp'>
                <div className="row image_news_title">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <h2 className="info_news_div-h2">Hình ảnh mô tả</h2>
                    </div>
                </div>
                <div className='col-md-12'>
                    <label className='image_news_avatar_lable'>Ảnh Đại Diện Sản Phẩm</label>
                </div>
                <div className='col-md-6'>
                    <div className="form-group">
                        <input type="file" className="form-control " required onChange={HandleChangAvatar} id="avatar-input" accept="gif|jpg|png" />
                    </div>
                </div>
                <div className='col-md-6'>

                    <div id="preview-avatar" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                        {
                            data?.img_avatar !== null ?
                                <img
                                    src={data?.img_avatar}
                                    className="w-100"
                                />
                                :
                                <p>Bạn chưa chọn hình nào</p>
                        }
                    </div>
                </div>
                <div className='col-md-12'>
                    <label className='image_news_avatar_lable'>Album ảnh mô tả</label>
                </div>
                <div className='col-md-6'>
                    <div className="form-group">
                        <input type="file" id="file-input" onChange={HandleChangeList} className="form-control btn-file" multiple accept="gif|jpg|png" />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div id="preview" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                        {
                            data?.img_infor?.length > 0 ?
                                data?.img_infor?.map((o, i) => (
                                    <img
                                        key={i}
                                        src={o}
                                        className="w-50"
                                    />
                                ))
                                :
                                <p>Bạn chưa chọn hình ảnh nào </p>
                        }
                    </div>
                </div>

            </div>
            <div className="col-md-12 col-sm-12 col-xs-12">
                <button className="btn_PostNews" onClick={sumitPostNews}>Cập nhật tin</button>
            </div>
        </div>
    );
}
// }

export default EditNews;