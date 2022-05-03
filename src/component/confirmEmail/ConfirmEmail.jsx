import React from 'react'
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import  './confirmEmail.css'

export default function ConfirmEmail() {
  let path = `/`;
  let history = useHistory();
  const confirmEmail=()=>{
    alert('đã xác nhận email');
    history.push(path)
  };
  return (
    <div className='confirmEmail'>
      <i>Click để xác nhận đăng kí tài khoản</i>
      <button type='button' className='btn btn-warning' onClick={confirmEmail}> Xác nhận email </button>
    </div>
  )
}
