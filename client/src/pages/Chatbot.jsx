import React, {useEffect, useRef, useState, useContext} from 'react'
import gptLogo from '../assets/chatgpt.svg'
import addBtn from '../assets/add-30.png'
import msgIcon from '../assets/message.svg'
import home from '../assets/home.svg'
import saved from '../assets/bookmark.svg'
import sendBtn from '../assets/send.svg'
import userIcon from '../assets/user.webp'
import gptImgLogo from '../assets/bot.jpg'
import axios from 'axios'
import { DataContext } from '../DataContext';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css'
const Chatbot = () => {

    const {hellodata, setHelloData} = useContext(DataContext);
    const msgEnd = useRef(null);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
    {
        text: "Hello there! I am MentalEase, your personal mental health assistant.  Ask me anything!", 
        isBot: true ,
    }
]);


    useEffect(() => {
        msgEnd.current.scrollIntoView({behavior: "smooth"});
    }, [messages])



        const sendMsgToOpenAI = async (text) => {
           
            const response = await fetch('http://localhost:9337/chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email : hellodata.userDetails.email,
                message: text,
                city: hellodata.userDetails.city      
              }),
            });
        
            const data = await response.json();
            return data;
          };
    const navigate = useNavigate();
    const handleNavToDashboard = () => {
        navigate('/dashboard')
    }
    const handleSend = async() => {
        const text = input;
        setInput("");
        setMessages([...messages, {text, isBot: false}]);
        const res = await sendMsgToOpenAI(text); 
        setMessages([...messages, 
            {text, isBot: false},
            {text: res, isBot: true}
        ]);
    }

    const handleEnter = async (e)=>{
        if(e.key == 'Enter'){
            await handleSend();
        }
    }

    const handleErase = () =>{
        window.location.reload();
    }

    return (
        <div className="chatbot">
            <div className="sideBar">
                <div className="upperSide">
                    <div className="upperSideTop flex "><img src='/MuzicLogo.png' alt="Logo" className='logo'/><span className="brand">MentalEase</span></div>
                    <button className="midBtn" onClick={handleErase}>New Chat</button>
                    
                </div>

                <div className="lowerSide">
                    <button className="midBtn" onClick={handleNavToDashboard}><img src={home} alt="Home" className="listItemsImg" />Home</button>
                    <button className="midBtn2" onClick={handleErase}>Erase All</button>
                </div>
            </div>

            <div className="main">
                <div className="chats">
                    {messages.map((message, i) =>
                    
                        <div key ={i} className={message.isBot?"chat bot" : "chat"}>
                            <img className = 'chatImg' src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt"> {message.text}</p>
                        </div>
                    )}
                    <div ref={msgEnd}/>
                </div>
                <div className="chatFooter">
                <div className="inp">
                    <input placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className='send' onClick={handleSend} ><img src={sendBtn} alt="" className="" /></button>
                </div>
            </div>
            </div>

            
        </div>
    )
}

export default Chatbot