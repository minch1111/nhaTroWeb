import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import authServices from '../../services/authServices';
import './confirmEmail.css'

export default function ConfirmEmail() {
  let path = `/`;
  let history = useHistory();
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('UserId')))
  const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem('token')))
  const confirmEmail = async () => {
    let res = await authServices.confirmEmail({ idUser: userId });
    if (res.result) {
      localStorage.removeItem('UserId')
      alert('đã xác nhận email');
      history.push(path)
    }
  };

  const confirmEmailToPost = async()=>{
    let res = await authServices.confirmEmailAgainToPostNews();
    if (res.success) {
      // localStorage.removeItem('UserId')
      localStorage.setItem('Role',JSON.stringify(res.data))
      alert('đã xác nhận email');
      history.push(path)
    }
  }

  return (
    <div className='confirmEmail'>
      <i>Click để xác nhận đăng kí tài khoản</i>
      {
        userId ?
          <button type='button' className='btn btn-warning' onClick={confirmEmail}> Xác nhận email </button>
          :
          <button type='button' className='btn btn-warning' onClick={confirmEmailToPost}> Xác nhận email </button>

      }
    </div>
  )
}
