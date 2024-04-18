import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import styled from 'styled-components'
import { allUsersRoute, host } from '../utils/APIRoutes'
import ChatContainer from '../components/ChatContainer'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import bg from '../components/image.jpg'
import { Navbar } from '../components/Navbar'

export default function Chat () {
  const navigate = useNavigate()
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  const [currentUser, setCurrentUser] = useState(undefined)
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/login')
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      )
      const defaultUser = { _id: '661e645b08d30a400ec1ca65', username: 'OneAssist', email: 'oneassist.mehta@oneadvanced.com' }
      setCurrentChat(defaultUser)
    }
  }, [])
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host)
      socket.current.emit('add-user', currentUser._id)
    }
  }, [currentUser])

  useEffect(async () => {
    if (currentUser) {
      const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
      setContacts(data.data)
    }
  }, [currentUser])
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }
  return (
    <>
   <div>

      <Container>
      <Navbar/>
        <div className='container'>
          {/* <Contacts contacts={contacts} changeChat={handleChatChange} /> */}
          {currentChat === undefined
            ? (
              <Welcome />
              )
            : (
              <ChatContainer currentChat={currentChat} socket={socket} />
              )}
        </div>
      </Container>
      </div>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  // align-items: center;
  background-color: white; 
  .container {
    height: 100vh;
    width: 100vw;
    background-color: white;
    display: grid;
    // @media screen and (min-width: 720px) and (max-width: 1080px) {
    //   grid-template-columns: 35% 65%;
    // }
  }
`
