import React, { Component, useState,useEffect } from 'react';
import axios from 'axios';
import postt from '../../../services/news'
import ReactLoading from "react-loading";


import '../post_management/post_management.css'

import { Link } from 'react-router-dom';
function PostmanagementCH (props) {

    const [list_PT,setList_PT] = useState();

    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        (async ()=>{
            let res = await postt.getListCanHo();
            if(res.success){
                console.log('res', res)
                setList_PT(res.data)
                setLoading(false)
            }
        })()
    },[])

    const formatNumber=(num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const formatDate =(data)=>{
        var date = new Date(data)
        return ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/'+ ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/'  + date.getFullYear()
    }
    // ClickHiddenNews=async (e)=>{

    //     let id=e.target.value
    //     await axios.post('/phong-tro/quan-ly-tin-dang/an-tin-tuc-phong-tro',{
    //        id
    //      },{headers: {'Accept': 'application/json'}})
    //     .then(res => {
    //         this.setState({
    //             list_PT:res.data.list_PT
    //         });
    //     })
    //     .catch( (error) => console.log(error));


    // }
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 tieudepage_mg">
                        <h2 className="tieudepage_mg-h2">Quản lý tin Phòng Trọ</h2>
                        <p>Thông tin càng chính xác giúp cho người thuê một cách tốt nhất</p>
                    </div>
                </div>

                <div className="wapper-post_manager wow fadeInUp" data-wow-delay="0.1s">

                        <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ảnh đại diện</th>
                            <th scope="col">Tiêu đề</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Ngày đăng tin</th>
                            {/* <th scope="col">Ngày</th> */}
                            <th scope="col">Trạng thái</th>
                            <th scope='col'> Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            loading ?
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td ><div className='d-flex justify-content-center'><ReactLoading type='bars' color='rgb(148 112 84)' /></div></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                </tr>
                            :
                            list_PT?.map((item,index)=>
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td><img className="img-postmanager" src={item.img_avatar} alt="anh dai dien" style={{objectFit:"contain"}}/></td>
                                    <td>{item.infor.title}</td>
                                    <td>{formatNumber(item.infor.price) + " VND"}</td>
                                    <td>{formatDate(item.createtime)}</td>
                                    <td>{item.infor.status_news}</td>
                                    <td> <Link className='btn rounded-circle bg-warning' to={`/nguoi-dung/sua-bai-viet/${item._id}`}><i className='fa fa-edit'></i> </Link> </td>
                               </tr>
                            )
                        }

                        </tbody>
                    </table>
                </div>
            </div>
        );

}

export default PostmanagementCH;