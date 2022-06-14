import React, { Component, useState, useEffect } from 'react';
import postt from '../../../services/news'
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';
import AlertCustom from '../../alert/AlertCustom';

let $ = window.$


function Postmanagement(props) {

    const [list_PT, setList_PT] = useState();
    const [loading, setLoading] = useState(true);
    const [idSelected, setIdSelected] = useState();
    const [loadingButton, setLoadingButton] = useState(false);
    const [alertSuccess, setAllertSuccess] = useState(false)
    const [alertError, setAllertError] = useState(false)



    useEffect(() => {
        (async () => {
            let res = await postt.getListNhaTro();
            if (res.success) {
                console.log('res', res)
                setList_PT(res.data)
                setLoading(false)
            }
        })()
    }, [])

    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const formatDate = (data) => {
        var date = new Date(data)
        return ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear()
    }


    const getId = (id) => {
        console.log('id', id)
        setIdSelected(id)
    }

    const acceptDelete = async () => {
        setLoadingButton(true);
        let res = await postt.deleteNews(idSelected);
        if (res) {
            setAllertSuccess(true);
            setLoadingButton(false);
            $("#close_alert").click();
            setTimeout(() => {
                setAllertSuccess(false)
            }, 2000);
            setLoading(true);
            let res1 = await postt.getListNhaTro();
            if (res1.success) {
                setList_PT(res1.data)
                setLoading(false)
            }
        }

    }

    return (
        <div>
            <div className="row">
                {
                    alertSuccess && <AlertCustom type="success" content="Đã xoá thành công" />
                }
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
                                    <td colSpan={7} ><div className='d-flex justify-content-center'><ReactLoading type='bars' color='rgb(148 112 84)' /></div></td>
                                </tr>
                                :
                                list_PT?.map((item, index) =>
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td><img className="img-postmanager" src={item.img_avatar} alt="anh dai dien" style={{ objectFit: "contain" }} /></td>
                                        <td>{item.infor.title}</td>
                                        <td>{formatNumber(item.infor.price) + " VND"}</td>
                                        <td>{formatDate(item.createtime)}</td>
                                        <td><strong>{item.infor.status_news} </strong>{item?.reason && <> <br /> {item?.reason} </>} </td>
                                        <td> <Link className='btn rounded-circle bg-warning' to={`/nguoi-dung/sua-bai-viet/${item._id}`}><i className='fa fa-edit'></i> </Link>
                                            <div className='ml-2 btn rounded-circle bg-danger text-white' data-toggle="modal" data-target="#modalAlertDelete" onClick={(id) => { getId(item._id) }} > <i className='fa fa-trash'></i> </div>
                                        </td>
                                    </tr>
                                )
                        }

                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="modalAlertDelete" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">Thông báo</h4>
                            <button type="button" className="close" id="close_alert" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" >×</span>
                            </button>
                        </div>
                        <div className="modal-body mx-3">
                            {/* {message && <div className='text-center text-danger mb-2'>{message}</div>} */}
                            <div className="md-form mb-4 row">
                                <h3>Bạn có chắc xoá bài đăng này ?</h3>
                            </div>
                        </div>
                        {
                            loadingButton ?
                                <div className="modal-footer d-flex justify-content-center bntdangnhap">
                                    <div className='d-flex justify-content-center'><ReactLoading type='bars' color='rgb(148 112 84)' /></div>
                                </div>
                                :
                                <div className="modal-footer d-flex justify-content-center bntdangnhap">
                                    <button type='button' className='btn btn-default' onClick={acceptDelete} > Chấp nhận </button>
                                    <button type='button' className='btn btn-danger' style={{ backgroundColor: "#dc3545" }} onClick={() => { $("#close_alert").click() }} > Huỷ </button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Postmanagement;