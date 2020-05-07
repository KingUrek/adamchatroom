import React from "react";
import "./style/App.css";
import OnlineList from "./components/OnlineList";
import TextArea from "./components/TextArea";
import io from "socket.io-client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignModal from "./components/SignModal";

const socket = io("http://localhost:8080/");
socket.on("connect", () => {
  console.log("Soket with the server is open");
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      users: [],
      user: "",
    };
    this.setUser = this.setUser.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  setUser(user) {
    this.setState({ ...user }, () => {
      socket.emit("userON", { user: this.state.user, id: socket.id });
      socket.emit("join", this.state.room);
    });
  }

  componentDidMount() {
    socket.on("user", (data) => this.setState({ users: data }));
    socket.on("send message", (data) => {
      console.log("Message received: " + data);
      this.setState((m) => {
        console.log(m);
        return {
          messages: [...m.messages, `${data.user}: ${data.message}`],
        };
      });
    });
  }

  sendMessage(message) {
    console.log(
      "enviando a menssagem " + message + "para a sala" + this.state.room
    );
    socket.emit("send message", { ...message, room: this.state.room });
  }

  render() {
    return (
      <Router>
        <Route exact path={"/"}>
          <SignModal setUser={this.setUser} />
        </Route>

        <Route
          path="/rooms/:roomId"
          render={(props) => (
            <div className="app">
              <OnlineList users={this.state.users}></OnlineList>
              <TextArea
                {...props}
                user={this.state.user}
                sendMessage={this.sendMessage}
                messages={this.state.messages}
              />
            </div>
          )}
        ></Route>
      </Router>
    );
  }
}

export default App;
