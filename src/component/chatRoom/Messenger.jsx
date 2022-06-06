import React, { useContext, useEffect, useState } from 'react'
import img from "../../assets/img/ava.jpg"
import "../chatRoom/Messenger.css"
import { Socket, io } from 'socket.io-client';
import { apiWithoutUser, chatAPI } from '../../config/api';
import { Context } from '../../App';
import chatServices from '../../services/chatService';
import { Link } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

let $ = window.$
let socket


export default function Messenger() {
  let { user ,runNotifyMessageAgain} = useContext(Context)
  const [room, setRoom] = useState();
  const [message, setMessage] = useState([]);
  const [messageContent, setMessageContent] = useState('')
  const [messageImage, setMessageImage] = useState()
  const [receiver, setReceiver] = useState("Tin nhắn");
  const [idReceiver, setIdReceiver] = useState();

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

  useEffect(() => {
    async function runAPI() {
      let res = await chatServices.getRooms({ user_id: user._id });
      if (res.success) {
        setRoom(res.data)
      }
    }
    runAPI()
  }, [])

  const handleChange = (e) => {
    let value = e.target.value;
    setMessageContent(value)
  }


  useEffect(() => {
    // socket.on('renderMessage',message =>{setMessages([...messages,message])})
    socket.on('renderMessage', messagee => {
      setMessage(message => [...message, messagee]);
      async function runAPI() {
        let res = await chatServices.getRooms({ user_id: user._id });
        if (res.success) {
          console.log('run')
          setRoom(res.data)
        }
      }
      runAPI()
    });
  }, [])

  const getImages = (ev) => {
    console.log('run')
    setMessageImage([])
    Array.from(ev.target.files).forEach(async (file) => {
      // console.log("run " + i);
      // Define a new file reader
      let reader = new FileReader();
      // Function to execute after loading the file
      // console.log(`file`, file)
      // if (file.size < 5120) {
      reader.onload = () => {

        // list.push(reader.result)
        // run = true
        setMessageImage(messageImage =>[...messageImage, reader.result])
        console.log('messageImage', messageImage)
        // this.setState({
        //     url_Images_Infor: [...this.state.url_Images_Infor, reader.result]
        // })
      };
      reader.readAsDataURL(file);
      // }
      // else{
      //     ev.currentTarget.value=null
      // }
      // console.log(`a`, a)

    });
  }

  const submit = (e) => {
    e.preventDefault();
    let currentId = user._id
    console.log("run");
    // console.log('currentId', currentId)
      socket.emit('sendMessage', { IdSender: currentId, IdReceiver: idReceiver, message: {content:messageContent,images:messageImage} })
    // setMessages([...messages,message])
    setMessageContent('')
    setMessageImage([])
  }
  const getRoomItem = async (id) => {
    let res = await chatServices.getMessages({ IdSender: user._id, IdReceiver: id })
    if (res.success) {
      console.log('res.data', res.data)
      setMessage(res.data)
      setIdReceiver(id)
      let res1 = await chatServices.getRooms({ user_id: user._id });
        if (res1.success) {
          console.log('run')
          setRoom(res1.data)
        }
      runNotifyMessageAgain()
    }
  }

  const getReceiver = (u) => {
    setReceiver(u);
  }

  // console.log('room', room)
  console.log('messageImage', messageImage)
  return (
    <div className='d-flex justify-content-center align-items-center px-5 py-3'>
      <div className="" style={{ width: '100%', height: "600px", margin: "0 200px" }}>
        <div className="row no-gutters h-100">
          <div className="col-md-4 h-100 border">
            <div className="container-fluid h-100">
              <div className="listChat-header border-bottom  d-flex justify-content-between align-items-center">
                <Link to="/" style={{ color: 'black', textDecoration: 'none' }} className='m-0 m-3'> <i className='fa fa-home'></i></Link>
                <strong className='m-0 m-3'> {user.local.username} </strong>
              </div>
              <div className="listChat-body overflow-hidden" style={{ height: "90.5%" }} >
                <div className="list h-100 overflow-auto">
                  {
                    room ?
                      room?.map((o, i) => <RoomItem data={o} key={i} getUserId={(id) => getRoomItem(id)} getReceiver={(u) => getReceiver(u)} />)
                      : <div className='h-100 w-100 d-flex justify-content-center align-items-center'>Chưa có liên hệ nào 🙄</div>
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
                <div></div>
                {/* <div className="listMessage overflow-auto h-100 w-100 px-3 pt-4" id='listMessage'> */}
                {
                  message && <ScrollToBottom className='h-100 w-100 listMessage overflow-auto' >
                    {
                      message?.map((o, i) => (
                        user._id === o.id_sender ?
                          <Message key={i} float="end" border="right" value={{ message: o.message }} bg="gray" margin="r"/>
                          :
                          <Message key={i} float="start" border="left" value={{ message: o.message }} bg="light" margin="l" />

                      ))
                    }
                  </ScrollToBottom>
                }

                {/*
                   <Message float="end" border="right" value={{ message: "next" }} bg="gray" />
                  <Message float="start" border="left" value={{ message: "nextssssssssss" }} bg="light" />
                  <Message float="end" border="right" value={{ message: "next" }} bg="gray" />
                  <Message float="end" border="right" value={{ message: "next" }} bg="gray" />
                  */}
                {/* </div> */}
                <form onSubmit={(e) => submit(e)} className="form-group d-flex justify-content-center align-items-center mb-0 w-100 row no-gutters my-2" style={{ position: 'absolute', bottom: '0px', zIndex: 9999 }}>
                  <div className='col-md-12 d-flex align-items-center p-2'>
                    {
                      messageImage?.map((o, i) =>
                      <div className="item-image-selected" key={i} style={{ maxWidth: '90px',height:'90px' }}>
                        <img src={o} alt="" className='w-100 h-100' />
                      </div>)
                    }
                  </div>

                  <div className='col-md-12 d-flex justify-content-center align-items-center'>
                    <input type="text"
                      value={messageContent} onChange={e => handleChange(e)}
                      // ref={messageForm}
                      className="form-control"
                      style={{ width: '80% !important', borderRadius: '25px !important' }} placeholder="Nhập tin nhắn ..." />
                    <div className="file-input mr-3 text-dark cursor-pointer" style={{ marginLeft: '-90px', padding: '6px' }}>
                      <input
                        type="file"
                        name="file-input"
                        id="file-input"
                        className="file-input__input"
                        accept="gif|jpg|png"
                        multiple
                        onChange={(e) => getImages(e)}
                      />
                      <label className=" d-flex align-items-center mb-0" htmlFor="file-input">
                        <i style={{ fontSize: '22px' }} className="fa fa-picture-o" aria-hidden="true"></i>
                      </label>
                      {/* <span>Chọn hình đại diện</span></label> */}

                    </div>
                    <button type='submit' className='btn' style={{ marginLeft: '-20px', color: '#947054' }}>Gửi</button></div>
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
      <div className={`text-light mt-1 m${props.margin}-3 p-2 bg-${props.bg} border`} style={{ borderRadius: '25px', backgroundColor: props.bg == "gray" ? "#e6e6e6" : "" }} >
        { props.value.message.content!=="" &&  <div className={`text-center text-dark`} style={{ minWidth: '50px' }} > {props.value.message.content} </div> }
        {
          props.value?.message?.images?.length > 0 &&
           <div className='row' style={{maxWidth:"400px"}}>
             {
               props.value.message.images.map((o,i)=><div key={i} style={{maxHeight:"350px",}}  className="col p-1">
                 <Zoom >
                  <img src={o} className="" style={{width:"100px",height:"100px"}} />
                 </Zoom>
               </div>)
             }
          </div>
        }
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
          <img className='w-100 h-100' src={props.data?.room_info?.members[0]?.infor?.img_avatar} alt="" />
        </div>
      </div>
      <div className='name flex-grow-1 ml-2 row'>
        <div className="col-12"><strong> {props.data?.room_info?.members[0]?.local?.username} </strong></div>
        <div className="col-12"><span className={props.data?.last_message?.status ==0?'font-weight-bold':'text-muted'}> {props.data?.room_info?.members[0]?.infor?.firstname} {props.data?.room_info?.members[0]?.infor?.lastname}</span></div>
      </div>
    </div>
  )
}
