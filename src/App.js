import React from "react";
import "./style/App.css";
import TextArea from "./components/TextArea";
import io from "socket.io-client";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SignModal from "./components/SignModal";
import { connect } from 'react-redux'
import Navigator from './components/Navigator'

const socket = io('/');
socket.on("connect", () => {
  console.log("Soket with the server is open");
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],

    };
    this.sendMessage = this.sendMessage.bind(this);


  }
  componentDidMount() {

    socket.on("change_messages", (data) => {
      console.log("change_messages event: " + data);
      this.props.dispatch({ type: 'CHANGE_MESSAGES', message: data })
    })

    socket.on("user", (data) => {
      console.log("user event")
      this.props.dispatch({ type: 'SET_USERS_ONLINE', usersOnline: data })
    });
    socket.on("send message", (data) => {
      console.log('send message event:' + data);
      this.props.dispatch({ type: 'SET_NEW_MESSAGE', message: data })

    });

    socket.on("add_room", (data) => {
      console.log('add_room event:' + data);
      this.props.dispatch({ type: 'CREATE_ROOM', room: data })
    })

  }

  sendMessage(message) {
    console.log(
      "enviando a menssagem " + message + " para a sala " + this.props.room
    );
    console.log({ ...message, room: this.props.room })
    socket.emit("send message", { ...message, room: this.props.room });
  }

  render() {
    return (
      <Router>
        <Route exact path={"/"}>
          <SignModal socket={socket} />
        </Route>

        <Route
          path="/rooms"
          render={(props) => (
            !this.props.user ? <Redirect to="/" /> :

              (<div className="app">
                <Navigator socket={socket} />
                {this.props.room ? (<TextArea
                  {...props}
                  sendMessage={this.sendMessage}
                />) : <p className="choose_room">Choose a room</p>}
              </div>)
          )}
        ></Route>
      </Router>
    );
  }
}

function mapState(state) {
  const { room, user } = state;
  return { room, user }
}

export default connect(mapState)(App);
