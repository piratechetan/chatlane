import React,{useState,useEffect} from 'react'
import hamburger from '../../assets/list.png'
import Reload from '../../assets/reload.png'
import { useNavigate,useLocation } from "react-router-dom";
const Converation = () => {
    const [selected, setselected] = useState(false)
    const [data, setdata] = useState([])
    const [list, setlist] = useState([])
    const location = useLocation();
    const PAGE_ID ="104964737747276"
    useEffect(() => {
        window.FB.api(
              `/v14.0/${location.state.page_id}/conversations?access_token=${location.state.page_token}`,
              (response) =>{
                console.log(response)
                response.data.forEach((item)=>{
                    console.log(item.id)
                    window.FB.api(`/v14.0/${item.id}?fields=messages&access_token=${location.state.page_token}`,
                    (res)=>{
                        window.Fb.api(`/v14.0/${res.messages.data[0].id}?access_token=${location.state.page_token}`,(
                            user=>console.log(user)
                        ))
                    })
                })
              }
            )
      }, []);
  return (
    <div className="conversation">
    <aside>
        <header>
            <div className="avatar-component" style={{justifyContent:'space-between'}}>
                <div className="leftside">
                <img src={hamburger} alt="" className="icon-small" />
                <div style={{marginLeft:10}}>Conversation</div>
                </div>
                <img src={Reload} alt="" className="icon-small" />
            </div>
        </header>
        {
            data.length==0 ?
            <div className="contact-boxes" style={data.length<=0 ? {justifyContent:'center',alignItems:'center'}:{}}>
            <h5>No Conversations</h5>
            </div> :
            <div className="contact-boxes">
            <div className="contact-box">
                <div className="avatar-component">
                    <img
                        className="avatar"
                        src="https://pbs.twimg.com/profile_images/501759258665299968/3799Ffxy.jpeg"
                        alt=""
                    />
                    <div className="right-section">
                    <div className="contact-box-header">
                        <h3 className="avatar-title">Jessica</h3>
                        <span className="time-mark">{data.updated_time}</span>
                    </div>
                    <div className="last-msg">
                        <img src={hamburger} alt="" className="icon-small" />
                        <span className="text">Lorem ipsum dolor</span>
                    </div>
                </div>
                </div>

            </div>
        </div>
        }
    </aside>
        <main>
        <header>
            {selected ? 
            <div className="avatar-component">
            <img
                className="avatar"
                src="https://pbs.twimg.com/profile_images/501759258665299968/3799Ffxy.jpeg"
                alt=""
            />

            <h3 className="avatar-title">Sofia</h3>
        </div>:null}
        </header>
        {
        selected ? 
        <>
        <div className="chats">
            <div className="message received">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur voluptatibus fuga illo.
                <div className="metadata">
                    <span className="date">05/20/2020</span>
                </div>
            </div>
            <div className="message sent">
                Lorem ipsum dolor, sit amet consectetur adipisicing.
                <div className="metadata">
                    <span className="date">05/20/2020</span>
                    {/* <img src={doubleCheck} alt="" className="icon-small" /> */}
                </div>
            </div>
        </div>
        <div className="chat-input-box">
            <div className="icon emoji-selector">
                {/* <img src={emojiIcon} alt="" /> */}
            </div>

            <div className="chat-input">
                <input type="text" placeholder="Type a message" />
            </div>

            <div className="icon send">
                {/* <img src={micIcon} alt="" /> */}
            </div>
        </div>
        </>: <></>}
    </main>
</div>
  )
}

export default Converation