import React, { Component } from 'react';
import axios from 'axios';

import img_delete_image from '../news_image/delete_image.png'
import img_default_avatar from '../news_image/default_avatar.png'

import './upload_image.css'
import { apiWithoutUser } from '../../../../config/api';
let $ = window.$
let list = 0;

class UploadImage extends Component {
    constructor(props) {
        super(props);
        // this.list =[];
        // this.HandleChangeList = this.HandleChangeList.bind(this)
        this.state = {
            //nhận biết thay đổi hình
            isUploading: false,
            //##############___Set value file avatar__##############
            file: '',
            //##############___Result Upload Image Avatar (Back End)__##############
            result_upload_avatar: false,
            //##############___URL Image Avatar News __##############
            URL_avatar: null,
            //##############___ClassName Hidden Button Choose Image Avatar__##############
            css_choose_file_avatar: "choose_file_avatar",
            //##############___FileName Image Avatar__##############
            filename_avatar: '',
            //##############___Result Delete Image Avatar (Back End)__##############
            result_delete_avatar: false,

            //##############___Set value files Image Infor News__##############
            files: null,
            //##############___Array File Name Image Infor (Back End)__##############
            arrayimagenames: [],
            testArray: [],
            //##############___Result Upload Image Infor News (Back End)__##############
            result_upload_imginfor: false,
            //##############___Result Delete Image Infor News (Back End)__##############
            result_delete_imginfor: false,
        }
    }

    UploadImageAvatar = async (e) => {
        const token = JSON.parse(localStorage.getItem('token'))
        e.preventDefault();
        console.log('e.target.files[0]', e.target.files[0])
        await this.setState({
            file: e.target.files[0],
        });
        const formData = new FormData();
        formData.append('file', this.state.file);
        // const config = {
        //     method: 'HEAD',
        //     mode: 'no-cors',
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //         'authorization': `Bearer ${token.accessToken}`,

        //     }
        // }
        await fetch(apiWithoutUser + "phong-tro/dang-tin-moi/upload_image", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token.accessToken}`,
            },
            body: formData
        })
            .then((res) => {
                this.setState({
                    result_upload_avatar: res.data.result,
                    filename_avatar: res.data.filename_avatar,
                    URL_avatar: apiWithoutUser + "phong-tro/open_image/nameimage=" + res.data.filename_avatar
                });
            }).catch((error) => {
                console.log(error);
            });
        this.props.getUrlImage_News(this.state.URL_avatar, this.state.arrayimagenames);
    }
    Deleteavatar = async () => {
        await axios.post(apiWithoutUser + 'phong-tro/dang-tin-moi/xoa-anh-dai-dien', {
            filename_avatar: this.state.filename_avatar
        }, { headers: { 'Accept': 'application/json' } })
            .then((res) => {
                this.setState({
                    result_delete_avatar: res.data.result,
                    file: '',
                    result_upload_avatar: false,
                    URL_avatar: '',
                    css_choose_file_avatar: "choose_file_avatar",
                    filename_avatar: '',
                });
            }).catch((error) => {
                console.log(error);
            });
        this.props.getUrlImage_News(this.state.URL_avatar, this.state.arrayimagenames);
    }

    UploadImageInfor = async (e) => {
        e.preventDefault();
        await this.setState({
            files: e.target.files,
        });
        const formDataFilesInfor = new FormData();
        for (let i = 0; i < this.state.files.length; i++) {
            formDataFilesInfor.append("files", this.state.files[i]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        await axios.post(apiWithoutUser + "/phong-tro/dang-tin-moi/up-load_hinh-mo-ta", formDataFilesInfor, config)
            .then((res) => {
                this.setState({
                    arrayimagenames: res.data.arrayimagenames,
                    result_upload_imginfor: res.data.result
                })
            }).catch((error) => {
                console.log(error);
            });
        this.props.getUrlImage_News(this.state.URL_avatar, this.state.arrayimagenames);
    }
    DeleteImageInfor = async (e, item, index) => {
        e.preventDefault();
        await axios.post(apiWithoutUser + '/phong-tro/dang-tin-moi/xoa-anh-mo-ta', {
            filename_imageinfor: item
        }, { headers: { 'Accept': 'application/json' } })
            .then((res) => {
                this.setState({
                    result_delete_imginfor: res.data.result
                });
            }).catch((error) => {
                console.log(error);
            });
        var arrayimagenames_delete = this.state.arrayimagenames;
        arrayimagenames_delete.splice(index, 1);

        await this.setState({
            arrayimagenames: arrayimagenames_delete,
        })
        this.props.getUrlImage_News(this.state.URL_avatar, this.state.arrayimagenames);
    }

    HandleChangAvatar = (ev) => {
        Array.from(ev.target.files).forEach(file => {

            // Define a new file reader
            let reader = new FileReader();
            // Function to execute after loading the file
            reader.onload = () => {
                // list.push(reader.result)
                // setForm({ ...form, imageRepresent: reader.result })
                this.setState({
                    URL_avatar: reader.result
                })
            };
            // Read the file as a text
            reader.readAsDataURL(file);
        });
    }
    HandleChangeList = async (ev) => {

        // [...ev.target.files].forEach(file => {
        //     console.log("file >>> ", file);

        //     tempArr.push({
        //         data: file,
        //         url: URL.createObjectURL(file)
        //     });

        //     // console.log("pictures >> ", pictures);
        // });

        // this.setState({
        //     arrayimagenames:tempArr
        // })

        // setForm({...form,listImg:list})
        // var i = 0
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
                list=list+1;
                this.setState({
                    arrayimagenames:[...this.state.arrayimagenames,reader.result]
                })
            };
            reader.readAsDataURL(file);
            // }
            // else{
            //     ev.currentTarget.value=null
            // }
            // console.log(`a`, a)

        });
    }
    componentDidMount(){
     if(this.state.URL_avatar !== null && this.state.arrayimagenames.length>0){
         this.props.getUrlImage_News(this.state.URL_avatar,this.state.arrayimagenames)
     }
    }


    render() {


        return (
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
                        <input type="file" className="form-control " required onChange={this.HandleChangAvatar} id="avatar-input" accept="gif|jpg|png" />
                    </div>
                </div>
                <div className='col-md-6'>

                    <div id="preview-avatar" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                        {
                            this.state.URL_avatar !== null ?
                                <img
                                    src={this.state.URL_avatar}
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
                        <input type="file" id="file-input" onChange={this.HandleChangeList} className="form-control btn-file" multiple accept="gif|jpg|png" />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div id="preview" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                        {
                            this.state.arrayimagenames.length > 0 ?
                                this.state.arrayimagenames.map((o, i) => (
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
            // <div className="row image_news  wow fadeInUp" data-wow-delay="0.1s">
            //     <div className="row image_news_title">
            //         <div className="col-md-12 col-sm-12 col-xs-12">
            //             <h2 className="info_news_div-h2">Hình ảnh mô tả</h2>
            //         </div>
            //     </div>
            //     <div className="row image_news_avatar">
            //         <div className="col-md-6 col-sm-6 col-xs-12 image_news_avatar_selectFile">
            //             <div className="col-md-12 col-sm-12 col-xs-12 image_news_avatar_selectFile-lable">
            //                 <label className="image_news_avatar_lable">Ảnh đại điện</label>
            //             </div>
            //             <div className="col-md-12 col-sm-12 col-xs-12 image_news_avatar_selectFile-input">
            //                 <label htmlFor="upload-photo-avatar" className={this.state.result_upload_avatar ? this.state.css_choose_file_avatar : ''}>Chọn ảnh</label>
            //                 <input type="file" name="file" id="upload-photo-avatar" onChange={this.UploadImageAvatar} className={this.state.result_upload_avatar ? this.state.css_choose_file_avatar : ''} />
            //             </div>
            //         </div>
            //         <div className="col-md-6 col-sm-6 col-xs-12 image_news_avatar_upload">
            //             <div className="image_news_avatar_upload_box">
            //                 <div className="col-md-12 col-sm-12 col-xs-12 image_news_avatar_upload_div">
            //                     <img src={this.state.result_upload_avatar ? this.state.URL_avatar : img_default_avatar} alt="avatar" className="image_news_avatar_img" />
            //                 </div>
            //                 <div className="col-md-12 col-sm-12 col-xs-12 image_news_avatar_img-button">
            //                     <button onClick={this.Deleteavatar}><img src={img_delete_image} alt="avatar" onClick={this.Deleteavatar} /><span> Xóa</span></button>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="row image_infor_news">
            //         <div className="col-md-12 col-sm-12 col-xs-12 image_infor_avatar_">
            //             <div className="col-md-12 col-sm-12 col-xs-12">
            //                 <label className="image_news_avatar_lable">Ảnh mô tả</label>
            //             </div>
            //             <div className="col-md-12 col-sm-12 col-xs-12">
            //                 <label htmlFor="upload-photo-imginfor" className="upload-imginfor">Chọn ảnh</label>
            //                 <input type="file" name="files" id="upload-photo-imginfor" multiple onChange={(e) => this.UploadImageInfor(e)} />
            //             </div>
            //         </div>
            //         <div className="row image_infor_news">
            //             {
            //                 this.state.arrayimagenames.map((item, index) =>
            //                     <div className="col-md-3 col-sm-3 col-xs-6" key={index}>
            //                         <div className="image_infor_news_item">
            //                             <div className="col-md-12 col-sm-12 col-xs-12 image_infor_news_item-img">
            //                                 <img src={"http://localhost:3001/phong-tro/open_image/nameimage=" + item} alt="infor" className="image_infor_news-img" />
            //                             </div>
            //                             <div className="col-md-12 col-sm-12 col-xs-12 image_news_avatar_img-button">
            //                                 <button onClick={e => this.DeleteImageInfor(e, item, index)}><img src={img_delete_image} alt="avatar" className="img-infor" /><span> Xóa</span></button>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 )
            //             }
            //         </div>
            //     </div>
            // </div>

        );
    }
}

export default UploadImage;