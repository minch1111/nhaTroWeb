import React, { useEffect } from 'react'
import { Widget, addResponseMessage } from 'react-chat-widget';
import { ChatBox } from 'react-chatbox-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useForm from '../../../hooks/useForm';
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
let $ =window.$

export default function Chat(props) {
  useEffect(() => {
    if (props.idChat !== null) {
      document.querySelector('.chat.boxF').classList.add('open')
    }
    else {
      document.querySelector('.chat.boxF').classList.remove('open')
    }
  }, [props.idChat])
  console.log('props.idChat', props.idChat)

  useEffect(() => {
    addResponseMessage('Welcome to this **awesome** chat!');
    $(document).ready(function() {
      $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });
    });
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };
  const closeChat = () => {
    props.closeChat()
  }
  const submit =(e)=>{
    e.preventDefault();
  }
  const {form,handleSubmit,error,register} = useForm()
  const arr = [1,2,3,4,5]
  console.log('props.idChat', props.idChat)
  return (
    <div className='chat boxF bg-light open' >
      {/* <Widget
        handleNewUserMessage={handleNewUserMessage}
        // profileAvatar={logo}
        title="My new awesome title"
        subtitle="And my cool subtitle"
      /> */}
      {/* <ChatBox
      messages={messages}
      /> */}
      <div className='title-name px-2 w-100 bg-info d-flex align-items-center justify-content-between' style={{ height: '45px' }}>
        <div className='Name text-light'><strong>Huy Lê</strong></div>
        <div className='cursor-pointer' onClick={() => closeChat()}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fontSize={12} width={15}><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg></div>
      </div>
      <div className="content mt-1 px-1">
        <Message bg="warning"/>
      <Message float="right" bg="primary"/>
      </div>
      <form onSubmit={(e)=>submit(e)} class="form-group d-flex mb-0" style={{ position: 'absolute', bottom: '0px' }}>
        <input type="text" class="form-control" placeholder="Nhập tin nhắn ..." />
        <button type='submit' className='btn btn-secondary'>Gửi</button>
      </form>
    </div>
  )
}

export const Message =(props)=>{
  return(
    <div>
      <div className={`mt-1 p-2 rounded bg-${props.bg}`} style={{display:'inline-block',float:props.float}}>
      message
    </div>
    </div>
  )
}
