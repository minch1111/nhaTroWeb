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
            let res = await postt.getListCanHo();
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
            let res1 = await postt.getListCanHo();
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
                    alertSuccess && <AlertCustom type="success" content="???? xo?? th??nh c??ng" />
                }
                <div className="col-md-12 col-sm-12 col-xs-12 tieudepage_mg">
                    <h2 className="tieudepage_mg-h2">Qu???n l?? tin Ph??ng Tr???</h2>
                    <p>Th??ng tin c??ng ch??nh x??c gi??p cho ng?????i thu?? m???t c??ch t???t nh???t</p>
                </div>
            </div>

            <div className="wapper-post_manager wow fadeInUp" data-wow-delay="0.1s">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">???nh ?????i di???n</th>
                            <th scope="col">Ti??u ?????</th>
                            <th scope="col">Gi??</th>
                            <th scope="col">Ng??y ????ng tin</th>
                            {/* <th scope="col">Ng??y</th> */}
                            <th scope="col">Tr???ng th??i</th>
                            <th scope='col'> Thao t??c</th>
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
                            <h4 className="modal-title w-100 font-weight-bold">Th??ng b??o</h4>
                            <button type="button" className="close" id="close_alert" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" >??</span>
                            </button>
                        </div>
                        <div className="modal-body mx-3">
                            {/* {message && <div className='text-center text-danger mb-2'>{message}</div>} */}
                            <div className="md-form mb-4 row">
                                <h3>B???n c?? ch???c xo?? b??i ????ng n??y ?</h3>
                            </div>
                        </div>
                        {
                            loadingButton ?
                                <div className="modal-footer d-flex justify-content-center bntdangnhap">
                                    <div className='d-flex justify-content-center'><ReactLoading type='bars' color='rgb(148 112 84)' /></div>
                                </div>
                                :
                                <div className="modal-footer d-flex justify-content-center bntdangnhap">
                                    <button type='button' className='btn btn-default' onClick={acceptDelete} > Ch???p nh???n </button>
                                    <button type='button' className='btn btn-danger' style={{ backgroundColor: "#dc3545" }} onClick={() => { $("#close_alert").click() }} > Hu??? </button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Postmanagement;