import React, { Component } from "react";
import OnlineUser from "./OnlineUser";
import AlignItemsList from "./AlignListItems";
import { connect } from "react-redux";
let _ = require("lodash");

class OnlineList extends Component {
  render() {
    const { usersOnline } = this.props
    return (
      <div className="userList">
        {/* <h3>Usuários online</h3> */}
        <AlignItemsList>
          {usersOnline.map((usr) => (
            <OnlineUser key={_.uniqueId()} user={usr.user} />
          ))}
        </AlignItemsList>
      </div>
    );
  }
}

function mapState(state) {
  const { usersOnline } = state
  return {
    usersOnline
  }
}

export default connect(mapState)(OnlineList)
