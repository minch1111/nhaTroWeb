import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import {getProvinces,getDistrictsByProvinceCode,getWardsByDistrictCode, getProvincesWithDetail, getWards} from 'sub-vn'
import './filter.css'
import Slider from '@material-ui/core/Slider';
let code =''


function Filter (props) {
    //     constructor(props) {
    //         super(props);
    //         this.state={
    //             valuePrice:[2,20],
    //             valueAcreage:[20,100],

    //             citys:[],
    //             districts:[],
    //             streets:[],
    //             wards:[],

    //             code_city:'' ,
    //             code_dictrict:'',
    //             code_street:'',

    //             typehome:'',

    //             NewsFilter:[],
    //             NameCityFilter:[],
    //             NameDistrictsFilter:[]
    //         }
    //     }
    //     componentDidMount(){
    //        this.setState({
    //            citys:getProvinces()
    //        })
    //    }
    //     setRangePrice=(value)=>{
    //         this.setState({
    //             valuePrice:value
    //         })
    //     }
    //     setRangeAcreage=(value)=>{
    //         this.setState({
    //             valueAcreage:value
    //         })
    //     }
    //     submitClickCity= async (e)=>{   // Get value and children submit
    //         let city_code = e.target.value;
    //         let d = getDistrictsByProvinceCode(city_code)
    //         this.setState({
    //             districts :d
    //         })

    //     }
    //      sumitClickDictrict= async (e)=>{
    //         let district_code =  e.target.value;
    //         let w = getWardsByDistrictCode(district_code);
    //         // let parent_code_city=this.state.code_city;
    //         this.setState({
    //             wards:w,
    //         })
    //     }
    //     HandlerInput=()=>{

    //     }
    //     sumitClickStreet=  (e)=>{
    //         this.setState({
    //             code_street:e.target.value,
    //         })
    //     }
    //     sumitClickTypeHome=(e)=>{
    //         this.setState({
    //             typehome:e.target.value,
    //         })
    //     }
    //     ClickFilter= async(e)=>{
    //     e.preventDefault();
    //     let{code_city,code_dictrict,code_street,typehome,valuePrice,valueAcreage}=this.state;
    //     let PriceMin=valuePrice[0]*1000000;
    //     let PriceMax=valuePrice[1]*1000000;
    //     let AcreageMin=valueAcreage[0];
    //     let AcreageMax=valueAcreage[1];
    //     if(this.props.GetTypeNewstoApp)  typehome=this.props.GetTypeNewstoApp;



    //     await axios.post('/trang-chu/tim-kiem/gia-tien/dien-tich',{
    //     PriceMin,PriceMax,AcreageMin,AcreageMax
    //         },{headers: {'Accept': 'application/json'}})
    //     .then(res => {
    //             var NewsFilter=res.data.NewsFilter;
    //             if(code_city !=="0" && code_city!=='' ){
    //                 NewsFilter=res.data.NewsFilter.filter(result=>result.address.code_city==code_city);

    //             }
    //             if(code_dictrict !=="0" && code_dictrict!=='' ){
    //                 NewsFilter=NewsFilter.filter(result=>result.address.code_dictrict==code_dictrict);
    //             }
    //             if(code_street!=="0" && code_street!==''){
    //                 NewsFilter=NewsFilter.filter(result=>result.address.code_street==code_street);
    //             }
    //             if(typehome!=="0" && typehome!==''){
    //                 NewsFilter=NewsFilter.filter(result=>result.infor.typehome==typehome);
    //             }
    //             this.setState({
    //                 NewsFilter:NewsFilter
    //             })
    //         }
    //     )
    //     .catch( (error) => console.log(error));
    //     if(this.state.NewsFilter){
    //       this.state.NewsFilter.forEach(element => {
    //             axios.get(`/trang-chu/thong-tin-chi-tiet/city/${element.address.code_city}`)
    //             .then(res=>{
    //                 let NameCityFitter_Array=this.state.NameCityFilter;
    //                 NameCityFitter_Array.push(res.data.NameCity)
    //                 this.setState({
    //                     NameCityFilter:NameCityFitter_Array
    //                 })
    //             })
    //             .catch( (error) => console.log(error));

    //             axios.get(`/trang-chu/thong-tin-chi-tiet/dictrict/${element.address.code_dictrict}`)
    //             .then(res=>{
    //                 let NameDistrictsFitter_Array=this.state.NameDistrictsFilter;
    //                 NameDistrictsFitter_Array.push(res.data.NameDistricts)
    //                 this.setState({
    //                     NameDistrictsFilter:NameDistrictsFitter_Array
    //                 })
    //             })
    //             .catch( (error) => console.log(error));
    //         });

    //     }
    //     this.props.GetNewsFiltertoApp(this.state.NewsFilter,this.state.NameCityFilter,this.state.NameDistrictsFilter,true);
    // }
    // render() {

    const [type,setType] = useState();
    const [city,setCity] = useState();
    const [district,setDistrict] = useState();
    const [ward,setWard] = useState();
    const [temp,setTemp]= useState('')

    const [citys,setCitys] = useState([]);
    const [districts,setDistrics] = useState([]);
    const [wards,setWards] = useState([])

    const getCity =(e)=>{
        setDistrics(getDistrictsByProvinceCode(e.target.value))
        setTemp(e.target.value)
        let dt = getProvinces()
        dt.forEach(element => {
            if(element.code === e.target.value){
                setCity(element.name)
            }
        });

    }

    const getDistrict =(e)=>{
        // console.log('e.target.value', e.target.value)
        setWards(getWardsByDistrictCode(e.target.value))
        let dt = getDistrictsByProvinceCode(temp)
        dt.forEach(el=> {
            if(el.code === e.target.value){
                setDistrict(el.name)
            }
        })
        setTemp(e.target.value)
    }
    const getWard =(e)=>{
        // let dt = getWardsByDistrictCode(temp)
        // console.log('dt', dt)
        // dt.forEach(el=>{
        //     if(el.code === e.target.value){

        //     }
        // })
        setWard(e.target.value)
        // dt.forEach(el=>{
        //     if(el.code === temp){
        //         setWard(el.name)
        //     }
        // })
        // let dt = getWardsByDistrictCode(e.target.value)
        // console.log('dt', dt)
    }

    useEffect(()=>{
        setCitys(getProvinces())
    },[])
    console.log('city', city)
    console.log('district', district)
    console.log('ward', ward)
        return (
            <div className="advanced-search-form" >
                 <div className="search-title" id="Find_News">
                     Tìm kiếm
                 </div>
                 <div className="row" >
                    <div className="col-md-3 col-sm-4 col-xs-12 select_item">
                        <select className="form-control nice-select wide select_item"
                        // disabled={this.props.StateFiterTyhomeNews_TF ? "": "disabled"}
                        onChange={e=>this.sumitClickTypeHome(e)}>
                                    <option data-display="Thể loại" value="0" >Tất cả</option>
                                    <option value="1">Thuê Phòng Trọ</option>
                                    <option value="2">Thuê Nhà Trọ</option>
                                    <option value="3">Thuê Căn Hộ</option>
                        </select>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12">
                        <div className="form-group">
                            <select className="form-control nice-select wide select_item" name="Haha"
                            //  onChange={e=>this.submitClickCity(e)}
                            onChange={e=>getCity(e)}
                             >
                                      <option value='0'>-- Chọn Tỉnh/Thành Phố --</option>

                                    {
                                      citys.map((item,index)=>
                                        <option key={index} value={item.code} >{item.name}</option>)
                                    }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12">
                        <div className="form-group">
                            <select className="form-control nice-select wide select_item"
                            // onChange={e=>this.sumitClickDictrict(e)}
                            onChange={e => getDistrict(e)}
                            >
                                            <option value='0'>-- Chọn Quận/Huyện --</option>
                                            {
                                                districts.map((item,index)=>
                                                    <option key={index} value={item.code} >{item.name}</option>
                                                )
                                            }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12">
                        <div className="form-group">
                                <select className="form-control nice-select wide select_item"
                                // onChange={e=>this.sumitClickStreet(e)}
                                onChange={e=>getWard(e)}
                                >
                                            <option value='0'>-- Chọn Phường/Xã --</option>
                                            {
                                            wards.map((item,index)=>
                                                <option key={index} value={item.name}>{item.name}</option>
                                            )
                                            }
                                </select>
                        </div>
                    </div>
                 </div>
                 <div className="row">

                        <div className="col-md-6 col-sm-6 col-xs-12">
                                <Slider
                                max={50}
                                min={0}
                                // value={this.state.valuePrice}
                                // onChange={(e,value)=>this.setRangePrice(value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"/>

                                {/* <label className="range">{this.state.valuePrice[0] + " Triệu  - "  +  this.state.valuePrice[1]+ " Triệu "}</label> */}


                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                                <Slider
                                 max={200}
                                 min={0}
                                // value={this.state.valueAcreage}
                                // onChange={(e,value)=>this.setRangeAcreage(value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"/>

                                {/* <label className="range">{this.state.valueAcreage[0] + " m2  - "  +  this.state.valueAcreage[1]+ " m2 "}</label> */}
                        </div>


                 </div>
                 <div className="row find_home">
                        <input className="bnt_find" type="button" value="Tìm Kiếm"/>
                 </div>
            </div>
        );
    }
// }

export default Filter;