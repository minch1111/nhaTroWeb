import React, { useContext, useEffect, useState } from 'react'
import img from "../../assets/img/ava.jpg"
import "../chatRoom/Messenger.css"
import { Socket, io } from 'socket.io-client';
import { apiWithoutUser } from '../../config/api';
import { Context } from '../../App';
import chatServices from '../../services/chatService';

let $ = window.$
let socket


export default function Messenger() {
  let { user } = useContext(Context)
  const [room, setRoom] = useState();
  const [message, setMessage] = useState();
  const [messageContent,setMessageContent]=useState('')
  const [receiver,setReceiver]= useState("Tin nhắn");
  const [idReceiver,setIdReceiver]=useState();

  useEffect(() => {
    // const { name, room } = queryString.parse(location.search);

    socket = io(apiWithoutUser, {
      // withCredentials:true,
    });

    // console.log('socket', socket)
    // setRoom(room);
    // setName(name)
    console.log(socket)


    if (user) {
      socket.emit('setUpSocket', { user_id: user._id }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }

  }, []);

  useEffect(async () => {
    let res = await chatServices.getRooms({ user_id: user._id });
    if (res.success) {
      setRoom(res.data)
    }
  }, [])

  const handleChange = (e) => {
    let value = e.target.value;
    setMessageContent(value)
  }

  useEffect(()=>{

      var element = document.getElementById("listMessage");
      element.scrollTop = element.scrollHeight;

  },[])

  useEffect(() => {
    // socket.on('renderMessage',message =>{setMessages([...messages,message])})
    socket.on('renderMessage', messagee => {
      setMessage(message => [...message, messagee]);
    });
  },[])

  const submit = (e) => {
    e.preventDefault();
    let currentId = user._id
    console.log("run");
    // console.log('currentId', currentId)
    socket.emit('sendMessage', { IdSender: currentId, IdReceiver: idReceiver, message: messageContent })
    // setMessages([...messages,message])
    setMessageContent('')
  }
  const getRoomItem = async (id) => {
    let res = await chatServices.getMessages({ IdSender: user._id, IdReceiver: id })
    if (res.success) {
      console.log('res.data', res.data)
      setMessage(res.data)
      setIdReceiver(id)
    }
  }

  const getReceiver =(u)=>{
    setReceiver(u);
  }

  // console.log('room', room)
  console.log('message', message)
  return (
    <div className='d-flex justify-content-center align-items-center px-5 py-3'>
      <div className="" style={{ width: '100%', height: "600px", margin: "0 200px" }}>
        <div className="row no-gutters h-100">
          <div className="col-md-4 h-100 border">
            <div className="container-fluid h-100">
              <div className="listChat-header border-bottom  d-flex justify-content-center align-items-center">
                <strong className='m-0 m-3'> {user.local.username} </strong>
              </div>
              <div className="listChat-body overflow-hidden" style={{ height: "90.5%" }} >
                <div className="list h-100 overflow-auto">
                  {
                    room ?
                      room?.map((o, i) => <RoomItem data={o} key={i} getUserId={(id) => getRoomItem(id)} getReceiver={(u)=>getReceiver(u)} />)
                      : <div>Loading...</div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 h-100 border">
            <div className="container-fluid h-100">
              <div className="listChat-header border-bottom  d-flex justify-content-center align-items-center">
                <strong className='m-0 m-3'>{receiver}</strong>
              </div>
              <div className="contentChat w-100 overflow-hidden b" style={{ height: '78.6%' }}>
                <div className="listMessage overflow-auto h-100 w-100 px-3 pt-4" id='listMessage'>
                  {
                    message?.map((o, i) => (
                      user._id === o.id_sender ?
                        <Message key={i} float="end" border="right" value={{ message: o.message_content }} bg="gray" />

                        :
                        <Message key={i} float="start" border="left" value={{ message: o.message_content }} bg="light" />

                    ))
                  }

                  {/*
                   <Message float="end" border="right" value={{ message: "next" }} bg="gray" />
                  <Message float="start" border="left" value={{ message: "nextssssssssss" }} bg="light" />
                  <Message float="end" border="right" value={{ message: "next" }} bg="gray" />
                  <Message float="end" border="right" value={{ message: "next" }} bg="gray" />
                  */}
                </div>
                <form onSubmit={(e) => submit(e)} className="form-group d-flex justify-content-center align-items-center mb-0 w-100" style={{ position: 'absolute', bottom: '0px', height: '70px', zIndex: 9999 }}>
                  <input onSubmit={submit} type="text"
                    value={messageContent} onChange={e => handleChange(e)}
                    // ref={messageForm}
                    className="form-control"
                    style={{ width: '80% !important', borderRadius: '25px !important' }} placeholder="Nhập tin nhắn ..." />
                  <button type='submit' className='btn' style={{ marginLeft: '-50px', color: '#947054' }}>Gửi</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Message = (props) => {
  // console.log('props.', props.value)
  const test = () => {
    console.log('test');
  }
  return (
    <div style={{ display: 'flex', justifyContent: props.float }} className="w-100" onClick={test}>
      <div className={`text-light mt-1 p-2 px-3 bg-${props.bg} border`} style={{ borderRadius: '25px', backgroundColor: props.bg == "gray" ? "#e6e6e6" : "" }} >
        <div className={`text-center text-dark`} style={{ minWidth: '50px' }} > {props.value.message} </div>
      </div>
    </div>
  )
}

export const RoomItem = (props) => {

  const getId = () => {
    props.getUserId(props.data.room_info.members[0]._id);
    props.getReceiver(props.data.room_info.members[0].local.username);
  }

  return (
    <div onClick={getId} className='item-chat d-flex align-items-center cursor-pointer rounded px-1 hover' style={{ minHeight: "20%" }}  >
      <div className="p-2">
        <div style={{ width: '60px', height: '60px' }} className="overflow-hidden rounded-circle">
          <img className='w-100 h-100' src={props.data.room_info.members[0].infor.img_avatar} alt="" />
        </div>
      </div>
      <div className='name flex-grow-1 ml-2 row'>
        <div className="col-12"><strong> {props.data.room_info.members[0].local.username} </strong></div>
        <div className="col-12"><span className='text-muted'> {props.data.room_info.members[0].infor.firstname} {props.data.room_info.members[0].infor.lastname}</span></div>
      </div>
    </div>
  )
}
