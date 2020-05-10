import React from "react";
import "../style/Room.css";
import { connect } from 'react-redux'

function Room({ name, id, users, room, dispatch, socket }) {
  function setRoom() {
    dispatch({ type: 'SET_ROOM', room: { name, id } })
    socket.emit("join", id);

  }
  return (
    <div className={name === room.name ? "room-wrap selected" : "room-wrap"} onClick={setRoom}>
      <p className="room-title">{name}</p>
      <p className="users-online">{`${users.filter(usr => usr.roomID === id).length} users online`} </p>
    </div >
  );
}

function mapState(state) {
  const { usersOnline, room } = state;
  return { users: usersOnline, room }
}

export default connect(mapState)(Room)
