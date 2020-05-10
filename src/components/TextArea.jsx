import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux'
import "../style/TextArea.css";
import Message from "./Message"
const _ = require("lodash");

function TextArea({ sendMessage, user, messages, room: { name, id } }) {
  const [message, setMessage] = useState("");

  function handleSubmit() {
    sendMessage({ user, message });
    setMessage("");
  }
  function sendButton(e) {
    e.preventDefault();
    handleSubmit();
  }

  return (
    <div className="chat">
      <p style={{ fontSize: 23, fontWeight: 500, marginBlockStart: 0, marginBlockEnd: 0, fontFamily: 'roboto' }}> {name}</p>
      <div className="message-area">
        <ul style={{ listStyle: "none" }}>
          {messages.map((m) => {


            return <li key={_.uniqueId()}><Message {...m} /></li>

          })}
        </ul>
      </div>
      <form onSubmit={sendButton} autoComplete="off">
        <TextField
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          id="standard-full-width"
          label="Message"
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
