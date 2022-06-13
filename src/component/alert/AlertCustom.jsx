import React, { useState } from 'react'
import "../alert/alert.css"

export default function AlertCustom(props) {

  const[type,setType]= useState(props?.type)

switch(type)
{
  case "success":
    return <Success content ={props.content} />
  case "error" :
    return <Error content={props.content} />
  case "warning" :
    return <Warning content={props.content}/>
}


}


export  function Success(props) {
  return (
    <div className='alert-custom bg-success'>
      <div className="row">
        <div className="col-12">
          <strong> Thông báo </strong>
          <p> {props?.content} </p>
        </div>

      </div>
    </div>
  )
}

export  function Error(props) {
  return (
    <div className='alert-custom bg-danger'>
      <div className="row">
        <div className="col-12">
          <strong> Thông báo </strong>
          <p> {props?.content} </p>
        </div>

      </div>
    </div>
  )
}

export  function Warning(props) {
  return (
    <div className='alert-custom bg-warning' >
      <div className="row">
        <div className="col-12">
          <strong> Thông báo </strong>
          <p> {props?.content} </p>
        </div>

      </div>
    </div>
  )
}

