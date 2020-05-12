import React, { useState } from "react";
import Navigationtab from "./NavigationTab";
import { connect } from 'react-redux'
import "../style/Navigator.css";
import OnlineList from "./OnlineList";

import Room from "./Room";
import NewRoomButton from "./NewRoomButton";


function Navigator({ rooms, socket }) {
  const [tab, setTab] = useState(0)


  function tabRender() {
    if (tab === 0) {
      return (
        <div>
          {rooms.map(room => <Room key={room.id} {...room} socket={socket}></Room>)}

          <NewRoomButton socket={socket}></NewRoomButton>

        </div>)
    }
    if (tab === 1) {
      return <OnlineList />
    }
  }


  return (
    <div className="navigator-wrap">
      <Navigationtab onChange={(e) => setTab(e)} />
      <div className="navigator">
        {tabRender()}

      </div>



    </div>
  );
}

function mapState(state) {
  const { rooms } = state
  return { rooms }
}
export default connect(mapState)(Navigator)
