import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux'
import "../style/TextArea.css";
import Message from "./Message"
import EmojiOpener from "./EmojiOpener";
import AudioSender from './AudioSender'
import AudioFile from "./AudioFile";
import ImageSender from "./ImageSender";
const _ = require("lodash");

function TextArea({ sendMessage, user, messages, room: { name, id } }) {
  const [message, setMessage] = useState("");

  function handleSubmit() {
    if (message) {
      sendMessage({ user, message });
      setMessage("");

    }

  }
  function sendButton(e) {
    e.preventDefault();
    handleSubmit();
  }

  function addEmoji(emoji) {
    setMessage(message + emoji)
  }

  function sendAudio(audio) {
    sendMessage({ user, audio })
  }

  function sendImage(image) {
    sendMessage({ user, image })
  }
  return (
    <div className="chat">
      <p style={{ fontSize: 23, fontWeight: 500, marginBlockStart: 0, marginBlockEnd: 0, fontFamily: 'roboto' }}> {name}</p>
      <div className="message-area">
        <ul style={{ listStyle: "none" }}>
          {messages.map((m) => {
            if (m.audio) {
              if (m._id) {
                let buff = (Buffer.from(m.audio.data))
                return <li key={_.uniqueId()}>
                  <span className="user">{m.user + ": "}</span>

                  <AudioFile blob={buff}></AudioFile></li>

              }
              return <li key={_.uniqueId()}>
                <span className="user">{m.user + ": "}</span>
                <AudioFile blob={m.audio}></AudioFile></li>

            }
            if (m.image) {
              return <li key={_.uniqueId()}>
                <p className="user">{m.user + ": "}</p>
                <img className="image-message" src={m.image} alt='some pic'></img></li>
            }



            return <li key={_.uniqueId()}><Message {...m} /></li>

          })}
        </ul>
      </div>
      <form onSubmit={sendButton} autoComplete="off">
        <div className='tools'>
          <EmojiOpener emojiSelector={addEmoji} />
          <AudioSender sendAudio={sendAudio}></AudioSender>
          <ImageSender sendImage={sendImage}></ImageSender>

        </div>

        <TextField
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Write your message"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          className="sendButton"
          variant="contained"
          color="primary"
          type="submit"
        >
          Send
        </Button>
      </form>
    </div >
  );
}

function mapState(state) {
  const { user, room, messages } = state
  return {
    room, user, messages
  }
}

export default connect(mapState)(TextArea)
