import React, { Component, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import postt from '../../../services/news'
import ReactStar from 'react-rating-stars-component'


import './feedback.css'
import { Link } from 'react-router-dom';
import feedback from '../../../services/feedback';
import { Context } from '../../../App';
function FeedBack(props) {

    const { user } = useContext(Context);
    const [isHideRate, setIsHideRate] = useState(false)
    const [listFeedBack, setListFeedBack] = useState()
    const [itemChoose, setItemChoose] = useState()

    useEffect(() => {
        (async () => {
            let res = await feedback.listFeedBack(user._id);
            if (res.success) {
                console.log('res', res)
                setListFeedBack(res.data)
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

    const showRate = (item) => {
        // setIsHideRate(true)
        setItemChoose(item)
        console.log('item', item)
    }
    const closeRate = () => {
        // setIsHideRate(false)
        setItemChoose()
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 tieudepage_mg">
                    <h2 className="tieudepage_mg-h2">Danh sách nhận xét</h2>
                    <p>Hãy đánh giá theo cách trung thực nhất</p>
                    <p>*Lưu ý: Danh sách dưới đây được đánh giá khi bạn và người khác đã liên hệ với nhau</p>
                </div>
            </div>

            <div className="wapper-post_manager wow fadeInUp" data-wow-delay="0.1s">

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Ảnh đại diện</th>
                            {/* <th scope="col">Ngày</th> */}
                            <th scope="col">Tên người dùng</th>
                            <th scope="col">Họ & Tên</th>
                            <th scope='col'> Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listFeedBack?.map((item, index) =>
                                <tr key={index}>
                                    <td >{index + 1}</td>
                                    <td><img className="img-postmanager" src={item?.room_member?.infor?.img_avatar} alt="anh dai dien" style={{ objectFit: "contain" }} /></td>
                                    <td> <Link className='text-secondary' to={`/thong-tin-lien-he/${item?.room_member?._id}`}> <strong>{item?.room_member?.local?.username}</strong> </Link> </td>
                                    <td> {item?.room_member?.infor?.firstname} {item?.room_member?.infor?.lastname}  </td>
                                    <td> <Link className='btn rounded-circle bg-warning' to="#" onClick={() => showRate(item?.room_member?._id)} ><i className='fa fa-edit'></i> </Link> Viết nhận xét </td>

                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            {
                itemChoose &&
                <FeedBackItem closeRate={closeRate} data={itemChoose} user={user} />
            }
        </div>
    );
}
export default FeedBack;

export const FeedBackItem = (props) => {



    useEffect(() => {
        (
            async () => {
                let res = await feedback.getFeedBackItem({ feedback_sender: props.user._id, feedback_receiver: props.data })
                if (res.success) {
                    if (res.data.length > 0) {
                        setForm(res.data[0])
                        setLoading(false)
                    }
                    else {
                        setLoading(false);
                    }
                    // console.log('res.data[0]', res.data[0].rate)
                }
            }
        )()
    }, [])


    const closeRate = () => {
        props.closeRate();
    }

    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({ feedback_sender: props.user._id, feedback_receiver: props.data, rate: 0, content_feedback: "" })

    const getRate = (e) => {
        setForm({ ...form, rate: e })
    }
    const getContent = (e) => {
        setForm({ ...form, content_feedback: e.currentTarget.value })
    }
    // console.log('props.data', form)

    const submit = async (e) => {
        e.preventDefault();
        console.log('form', form)
        let res = await feedback.feedbackAction(form);
        if (res.success) {
            alert("Đã đánh giá thành công");
            closeRate();
        }
    }
    return (
        <div className='form-rate d-flex'>
            {
                loading ? <div> Loading... </div> :
                    <><div className='row my-2'>
                        <div className='col-md-11 d-flex justify-content-center font-weight-bold text-uppercase'>
                            Nhận xét
                        </div>
                        <div className='col-md-1 d-flex justify-content-center pointer' onClick={closeRate} > <i className='fa fa-times'></i> </div>
                    </div>
                        <div className='row'>
                            <div className='col-md-12 my-2 bg-dark border border-bottom'>
                            </div>
                        </div>
                        <form onSubmit={e => submit(e)}>
                            <div className='row'>
                                {/* <div className='col-md-4 d-flex justify-content-center align-items-center'> {props.data?.createbyname} </div> */}
                            </div>
                            <div className='row'>
                                <div className='col-md-4 d-flex justify-content-center align-items-center'>Đánh giá</div>
                                <div className='col-md-8 d-flex justify-content-center align-items-center'> <ReactStar value={parseInt(form?.rate)} size={30} edit={true} onChange={(e) => getRate(e)} /> </div>
                            </div>
                            <div className='row mt-2' style={{ height: "100px" }}>
                                <div className='col-md-4 d-flex justify-content-center align-items-center'>Viết nhận xét</div>
                                <div className='col-md-8 d-flex justify-content-center align-items-center'> <textarea onChange={e => getContent(e)} className='form-control' row={3} value={form?.content_feedback}></textarea> </div>
                                <div className='col-md-12 mt-2 d-flex justify-content-end'> <button type='submit' className='btn btn-warning'>Lưu</button> </div>
                            </div>
                        </form>
                    </>
            }
        </div>
    )
}