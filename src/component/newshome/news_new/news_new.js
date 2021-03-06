import React, { Component, useContext } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';


import img_icon_location from '../../home/image_icon/location.png'
import img_icon_price from './news_image/price.png'
import img_icon_space from './news_image/space.png'
import img_icon_phone_call from './news_image/phone-call.png'
import ReactLoading from "react-loading";
import './news_new.css'

import UploadImage from './upload_image_news/upload_image';
import SelectOption from './select_option_NT/select_option_NT';
import GoogleMap from './google_map/google_map';
import Utilities from './utilities/utilities';
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from "sub-vn"
import { apiWithoutUser } from '../../../config/api';
import postt from '../../../services/news';
import AlertCustom from '../../alert/AlertCustom';
import { Context } from '../../../App';

class Newsnew extends Component {


    constructor(props) {
        super(props);
        this.state = {
            form: {},
            //###########__ Get Children Select address__########
            city: '',
            district: '',
            street: '',
            //###########__ Get data Select address (to database)__########
            citys: [],
            districts: [],
            wards: [],
            streets: [],
            errMessage:"",

            //###########__ Get value input address__########
            inputmap: '',
            open_selectoption_NT_CH: false,
            result_postnews: false,
            //################__ Save News __###############
            code_city: '',
            code_dictrict: '',
            code_street: '',
            number_home: '',
            title: '',
            code_type_news: '',
            content_infor: '',
            price: '',
            acreage: '',
            url_Image: null,
            url_Images_Infor: [],
            message_postnews: '',
            price_format: '',
            //################__ Optiion Select Home __########
            nb_bedroom: null,
            nb_bath_toilet: null,
            nb_kitchenroom: null,
            //################__Utilities __########
            utilities: '',
            //################__Type Home (Th??? lo???i ????ng tin) __########
            typehome: 1,
            urltypenews: '',
            Lat_ggmap: '',
            Lng_ggmap: '',

            isAlertSuccess:false,
            isAlertError:false,
            isAlertWarning:false,
            isLoadingButton:false,
            phone:JSON.parse(localStorage.getItem('InfoUser'))
        }
    }
    componentWillMount() {
        //    console.log('getProvinces()', getProvinces())
        this.state.citys = getProvinces()
        // console.log('run')
    }

    // componentDidMount() {
    //     //  axios.post('/phong-tro/dang-tin-moi/chon-tinhTP')
    //     // .then(res=>
    //     // document. getElementById("city"). setAttribute("disabled", "disabled");
    //     // this.setState({
    //     // citys: [{code:50,name:"Th??nh Ph??? H??? Ch?? Minh"}]})
    //     // }))
    //     // .catch( (error) => console.log(error));
    // }
    submitClickCity = (e) => {   // Get value and children submit
        // var city="";
        // let parent_code = e.target.value;
        // if(e.target.value!== "0") {city=e.target[e.target.selectedIndex].text}
        // this.setState({
        //     code_city:parent_code,
        //     city:city,
        //     inputmap:this.state.number_home+" "+this.state.street+this.state.district+city
        // })
        //  await axios.post('/phong-tro/dang-tin-moi/chon-QH',{
        //     parent_code
        //  },{headers: {'Accept': 'application/json'}})
        // .then(res => {
        //     this.setState({
        //         districts:res.data.districts
        //     });
        // })
        // .catch((error) => console.log(error));

        // //  Select list streets to code city (L???y m?? t???nh chon ra danh sach duong)
        // await axios.get(`/phong-tro/dang-tin-moi/danh-sach-duong/${parent_code}`)
        // .then(res => {
        //     this.setState({
        //         streets:res.data.streets
        //     });
        //     if(res.data.streets){
        //         this.setState({
        //             number_home:'',
        //             district:'',
        //             street:'',
        //             inputmap:city
        //         })
        //     }
        // })
        // .catch((error) => console.log(error));
        // if(parent_code==="0"){
        //     this.setState({
        //         streets:[],
        //         code_street:'',
        //         inputmap:'',
        //         number_home:''
        //     });
        // }
        let listCity = getProvinces()
        let code_province = e.target.value
        let dist = []
        if (code_province !== "") {
            dist = getDistrictsByProvinceCode(code_province)
            this.setState({
                districts: dist
            })
            listCity.map((o, i) => {
                if (o.code == code_province) {
                    this.setState({
                        city: o.name
                    })
                }
            })
        }
    }
    sumitClickDictrict = (e) => {
        console.log('e.target.value', e.target.value)
        let code_dictrict = e.target.value
        if (code_dictrict !== "") {
            this.setState({
                wards: getWardsByDistrictCode(code_dictrict)
            })
            this.state.districts.map((o, i) => {
                if (code_dictrict == o.code) {
                    this.setState({
                        district: o.name
                    })
                }
            })
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
    // HandlerInput = () => {

    // }
    sumitClickWard = (e) => {
        var street = "";
        let code_ward = e.target.value;
        if (e.target.value !== "") {
            this.state.wards.map((o, i) => {
                if (o.code = code_ward) {
                    this.setState({
                        street: o.name,
                    })
                }
            })

        }


    }
    HandlerInputNumberHome = () => {
        let number_home = this.refs.number_home.value;
        this.setState({
            address_detail: number_home,
        })
    }
    SelectTypeHome = (e) => {
        if (e.target.value === "1") {
            this.setState({
                typehome: 1,
                open_selectoption_NT_CH: false
            })
        } else if (e.target.value === "2") {
            this.setState({
                typehome: 2,
                open_selectoption_NT_CH: true
            })
        } else {
            this.setState({
                typehome: 3,
                open_selectoption_NT_CH: true
            })
        }
    }
    getSelectSelectOption = (nb_bedroom, nb_bath_toilet, nb_kitchenroom) => {
        this.setState({
            nb_bedroom: nb_bedroom,
            nb_bath_toilet: nb_bath_toilet,
            nb_kitchenroom: nb_kitchenroom
        })
    }
    getUrlImage_News = (Url_Image, NameImages_Infor) => {
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
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    }

    handleChangeField = () => {

        this.setState({
            title: this.refs.title.value,
            content_infor: this.refs.content_infor.value,
            price: parseInt(this.refs.price.value),
            // price_format: this.formatNumber(this.refs.price.value),
            acreage: parseFloat(this.refs.acreage.value)
        })
    }
    sumitPostNews = async () => {
        var formObj = {};

        formObj = {
            city: this.state.city,
            district: this.state.district,
            street: this.state.street,
            address_detail: this.state.address_detail,
            title: this.state.title,
            content_infor: this.state.content_infor,
            price: this.state.price,
            acreage: this.state.acreage,
            typehome: this.state.typehome,
            utilities: this.state.utilities,
            nb_bedroom: this.state.nb_bedroom ? parseInt(this.state.nb_bedroom) : null,
            nb_bath_toilet: this.state.nb_bath_toilet ? parseInt(this.state.nb_bedroom) : null,
            nb_kitchenroom: this.state.nb_kitchenroom ? parseInt(this.state.nb_bedroom) : null,
            number_phone: "0783412710",
            img_avatar: this.state.url_Image,
            img_infor: this.state.url_Images_Infor
        }
        console.log('formObj', formObj)

        if (formObj.city === "" || formObj.district === "" || formObj.street === "" || !formObj.address_detail || formObj.address_detail === "") {
            // alert("Ch??a nh???p ?????a ch???")
            this.setState({
                isAlertWarning:true,
                errMessage:"Ch??a nh???p ?????a ch???"
            })
            setTimeout(()=>{
                this.setState({
                    isAlertWarning:false,
                    errMessage:""
                })
            },3000)
        } else if (formObj.title === "" || formObj.content_infor === "") {
            this.setState({
                isAlertWarning:true,
                errMessage:"Ch??a nh???p th??ng tin b??i vi???t"
            })
            setTimeout(()=>{
                this.setState({
                    isAlertWarning:false,
                    errMessage:""
                })
            },3000)
        }
        else if (formObj.price === "" || !formObj.price) {
            this.setState({
                isAlertWarning:true,
                errMessage:"Ch??a nh???p gi?? ti???n"
            })
            setTimeout(()=>{
                this.setState({
                    isAlertWarning:false,
                    errMessage:""
                })
            },3000)
        }
        else if (formObj.acreage === "" || !formObj.acreage) {
            this.setState({
                isAlertWarning:true,
                errMessage:"Ch??a nh???p di???n t??ch"
            })
            setTimeout(()=>{
                this.setState({
                    isAlertWarning:false,
                    errMessage:""
                })
            },3000)
        }
        else if (!formObj.utilities) {
            this.setState({
                isAlertWarning:true,
                errMessage:"Ch??a ch???n ti???n ??ch"
            })
            setTimeout(()=>{
                this.setState({
                    isAlertWarning:false,
                    errMessage:""
                })
            },3000)
        } else if (!formObj.img_avatar || formObj.img_infor.length === 0) {
            this.setState({
                isAlertWarning:true,
                errMessage:"Ch??a ch???n h??nh ???nh"
            })
            setTimeout(()=>{
                this.setState({
                    isAlertWarning:false,
                    errMessage:""
                })
            },3000)
        } else {
            this.setState({
                isLoadingButton:true
            })
            let res = await postt.postNews(formObj);
            if (res.result) {
                this.setState({
                    isAlertSuccess :true,
                    isLoadingButton:false
                })
                setTimeout(()=>{
                    this.setState({isAlertSuccess:false})
                },3000)
            } else {
                this.setState({
                    isAlertError :true,
                    isLoadingButton:false,
                    errMessage:res.message
                })
                setTimeout(()=>{
                    this.setState({isAlertError:false,errMessage:""})
                },3000)
            }
        }

        // let res = await postt.postNews(formObj);
        // if(res.result){
        //     alert(res.message)
        // }else{
        //     alert(res.message)
        // }

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
    }


    // Check value utilities (L???y gi?? tr??? c???a c??c ti???n ??ch)
    getValueUtilities = (valueisCheck) => {
        // console.log(valueisCheck)
        this.setState({
            utilities: valueisCheck
        })

    }
    HandleChangAvatar = (ev) => {
        this.setState({
            url_Image: null
        })
        Array.from(ev.target.files).forEach(file => {

            // Define a new file reader
            let reader = new FileReader();
            // Function to execute after loading the file
            reader.onload = () => {
                // list.push(reader.result)
                // setForm({ ...form, imageRepresent: reader.result })
                this.setState({
                    url_Image: reader.result
                })
            };
            // Read the file as a text
            reader.readAsDataURL(file);
        });
    }
    HandleChangeList = async (ev) => {
        this.setState({
            url_Images_Infor: []
        })
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
                this.setState({
                    url_Images_Infor: [...this.state.url_Images_Infor, reader.result]
                })
            };
            reader.readAsDataURL(file);
        });
    }
    render() {
        var KTL = true;
        if (this.state.message_postnews) {
            KTL = false;
        }

        // console.log('this.state.form', this.state.form)
        // if (this.state.result_postnews) return <Redirect to={this.state.urltypenews} />
        return (
            <div className="container-fluid sss">
                {
                    this.state.isAlertSuccess === true && <AlertCustom type="success" content="???? th??m tin m???i th??nh c??ng, ch??? admin duy???t" />

                }
                {
                    this.state.isAlertError === true && <AlertCustom type="error" content={this.state.errMessage} />
                }
                {
                    this.state.isAlertWarning ===true && <AlertCustom type="warning" content={this.state.errMessage} />
                }
                <div className="row alert_messager">
                    {!KTL && <div className="alert alert-danger">{this.state.message_postnews}</div>}
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 tieudepage_mg">
                        <h2 className="tieudepage_mg-h2">????ng tin m???i</h2>
                        <p>Th??ng tin c??ng ch??nh x??c gi??p cho ng?????i thu?? m???t c??ch t???t nh???t</p>
                    </div>
                </div>
                <div className="ggmappage wow fadeInUp" data-wow-delay="0.1s">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 ggmappage_mg">
                            <h2 className="ggmappage_mg-h2" >?????a ch??? cho thu??</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="form-group">
                                <select className="form-control nice-select wide select_item " id='city' name="calc_shipping_provinces" onChange={e => this.submitClickCity(e)}>
                                    <option value="">-- Ch???n T???nh/Th??nh Ph??? --</option>
                                    {
                                        this.state.citys.map((item, index) =>
                                            <option key={index} value={item.code} typename={item.name}>{item.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="form-group">
                                {

                                }
                                <select className="form-control nice-select wide select_item" onChange={e => this.sumitClickDictrict(e)}>
                                    <option value='0'>-- Ch???n Qu???n/Huy???n --</option>
                                    {
                                        this.state.districts.map((item, index) =>
                                            <option key={index} value={item.code} typename={item.name}>{item.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="form-group">
                                <select className="form-control nice-select wide select_item" onChange={e => this.sumitClickWard(e)}>
                                    <option value='0'>-- Ch???n T??n Ph?????ng/X?? --</option>
                                    {
                                        this.state.wards.map((item, index) =>
                                            <option key={index} value={item.code}>{item.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="form-group">

                                <input type="text" name="" id="" className="form-control" aria-describedby="helpId"
                                    placeholder="S??? Nh??"
                                    value={this.state.address_detail}
                                    ref="number_home"
                                    onChange={this.HandlerInputNumberHome}
                                />

                            </div>

                        </div>
                    </div>
                    {/* <div className="row">
                                <div className="col-md-1 col-sm-1 col-xs-2 exact_icon_location">
                                    <img src={img_icon_location} alt="icon location"/>
                                </div>
                                <div className="col-md-11 col-sm-11 col-xs-10 exact_input_location">
                                    <input className="exact_input_location-input"
                                    placeholder="?????a ch??? ch??nh x??c"
                                    value={this.state.inputmap}
                                    ref="inputmap"
                                    onChange={this.HandlerInput}
                                    disabled/>
                                </div>
                        </div> */}
                    {/* <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12 google_map">
                                    <GoogleMap getLocationtoNewsNews={this.getLocation}/>
                            </div>


                        </div> */}
                </div>
                <div className="row info_news  wow fadeInUp" data-wow-delay="0.1s">
                    <div className="col-md-12 col-sm-12 col-xs-12 info_news_div">
                        <h2 className="info_news_div-h2">Th??ng tin m?? t???</h2>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-12">
                        <input className="infor_news_input_td"
                            ref="title"
                            value={this.state.title}
                            onChange={this.handleChangeField}
                            placeholder="Ti??u ?????" />
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <div className="col-md-10 col-sm-10 col-xs-12">
                            <select className="form-control nice-select wide select_item" onChange={e => this.SelectTypeHome(e)}>
                                <option value="1">Thu?? ph??ng tr???</option>
                                <option value="2">Thu?? nh?? nguy??n c??n</option>
                                <option value="3">Thu?? c??n h???</option>
                            </select>
                        </div>
                    </div>
                    <div className="row content_news">
                        <div className="col-md-8 col-sm-8 col-xs-12 content_news">
                            <textarea
                                ref="content_infor"
                                value={this.state.content_infor}
                                onChange={this.handleChangeField}
                                placeholder="M?? t??? th??ng tin nh?? tr???" />
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12 content-warning">
                            <div className="alert alert-warning" role="alert" >
                                <div className="row titel-warning">
                                    <h4>L??u ?? khi ????ng tin</h4>
                                </div>
                                <div className="row body-warning">
                                    <ul>
                                        <li>N???i dung ph???i vi???t b???ng ti???ng Vi???t c?? d???u</li>
                                        <li>Ti??u ????? tin kh??ng d??i qu?? 100 k?? t???</li>
                                        <li>C??c b???n n??n ??i???n ?????y ????? th??ng tin v??o c??c m???c ????? tin ????ng c?? hi???u qu??? h??n.</li>
                                        <li> ????? t??ng ????? tin c???y v?? tin rao ???????c nhi???u ng?????i quan t??m h??n, h??y s???a v??? tr?? tin rao c???a b???n tr??n b???n ????? b???ng c??ch k??o icon t???i ????ng v??? tr?? c???a tin rao.</li>
                                        <li>Tin ????ng c?? h??nh ???nh r?? r??ng s??? ???????c xem v?? g???i g???p nhi???u l???n so v???i tin rao kh??ng c?? ???nh. H??y ????ng ???nh ????? ???????c giao d???ch nhanh ch??ng!</li>
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
                                    placeholder="S??? ??i???n tho???i"
                                    value={this.state.phone.number_phone}
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
                                    ref="price"
                                    value={this.state.price}
                                    onChange={this.handleChangeField}
                                    placeholder="Gi?? ti???n" />
                            </div>
                            {this.state.price_format &&
                                <div className="col-md-4 col-sm-6 col-xs-4 row price_format">
                                    <div className="row price_format-label">
                                        <label>S??? ti???n:</label>
                                    </div>
                                    <div className="row  price_format-span">
                                        <span>{this.state.price_format ? this.state.price_format + " VND" : " "}</span>
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
                                    ref="acreage"
                                    type="number"
                                    value={this.state.acreage}
                                    onChange={this.handleChangeField}
                                    placeholder="Di???n t??ch" />
                                <label className="input_option-acreage" >m2</label>
                            </div>
                        </div>
                    </div>
                    {this.state.open_selectoption_NT_CH && <SelectOption getSelectSelectOption={this.getSelectSelectOption} />}
                </div>
                <Utilities typehome={this.state.typehome} open_selectoption_NT_CH={this.state.open_selectoption_NT_CH} getValueUtilities={this.getValueUtilities} />
                {/* <UploadImage getUrlImage_News={this.getUrlImage_News}  /> */}
                <div className='row image_news  wow fadeInUp'>
                    <div className="row image_news_title">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <h2 className="info_news_div-h2">H??nh ???nh m?? t???</h2>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <label className='image_news_avatar_lable'>???nh ?????i Di???n S???n Ph???m</label>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <input type="file" className="form-control " required onChange={this.HandleChangAvatar} id="avatar-input" accept="gif|jpg|png" />
                        </div>
                    </div>
                    <div className='col-md-6'>

                        <div id="preview-avatar" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                            {
                                this.state.url_Image !== null ?
                                    <img
                                        src={this.state.url_Image}
                                        className="w-100"
                                    />
                                    :
                                    <p>B???n ch??a ch???n h??nh n??o</p>
                            }
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <label className='image_news_avatar_lable'>Album ???nh m?? t???</label>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <input type="file" id="file-input" onChange={this.HandleChangeList} className="form-control btn-file" multiple accept="gif|jpg|png" />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div id="preview" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                            {
                                this.state.url_Images_Infor.length > 0 ?
                                    this.state.url_Images_Infor.map((o, i) => (
                                        <img
                                            key={i}
                                            src={o}
                                            className="w-50"
                                        />
                                    ))
                                    :
                                    <p>B???n ch??a ch???n h??nh ???nh n??o </p>
                            }
                        </div>
                    </div>

                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    {
                        this.state.isLoadingButton ?
                        <div className='border d-flex justify-content-center' style={{backgroundColor:"rgb(148 112 84)"}}><ReactLoading type='bars' color='white' /></div>
                        :
                        <button className="btn btn_PostNews" onClick={this.sumitPostNews}>????ng tin</button>
                    }
                </div>
            </div>
        );
    }
}

export default Newsnew;