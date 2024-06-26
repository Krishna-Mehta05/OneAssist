import React, { useState } from 'react'
import { BsEmojiSmileFill } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import styled from 'styled-components'
import image2 from '../assets/plusicon.png'
import { FaMicrophone } from 'react-icons/fa'
import { RiImageAddFill } from 'react-icons/ri'

export default function ChatInput ({ handleSendMsg }) {
  const [msg, setMsg] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg
    message += emojiObject.emoji
    setMsg(message)
  }

  const sendChat = (event) => {
    event.preventDefault()
    if (msg.length > 0) {
      handleSendMsg(msg)
      setMsg('')
    }
  }

  return (
    <Container>
      <div className='button-container'>

        {/* <div className='emoji'>
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />

          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}

          </div> */}
        {/* <FaPlus /> */}
        <div className='plus'>
          <RiImageAddFill />

        </div>
        {/* <img src={image2} alt="" /> */}
      </div>
      <form className='input-container' onSubmit={(event) => sendChat(event)}>
        <input
          type='text'
          placeholder='Ask us Anything...'
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button className='submitBtn' type='submit'>
          <IoMdSend />
          <FaMicrophone />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 4% 95%;
  background-color: #e24a05;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    // gap: 1rem;
    .plus{
     font-size: 40px;
     margin-top:2px;
    }
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {

        position: absolute;
        top: -350px;
        background-color: white;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #f08d04;
          width: 5px;
          &-thumb {
            background-color: white;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: white;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: white;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #f08d04;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: orange;
      }
    }
  }
`
