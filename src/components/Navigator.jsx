import React, { useState } from "react";
import Navigationtab from "./NavigationTab";
import { connect } from 'react-redux'
import "../style/Navigator.css";
import OnlineList from "./OnlineList";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Room from "./Room";


function Navigator({ rooms, usersOnline, socket }) {
  const [tab, setTab] = useState(0)


  function tabRender() {
    if (tab === 0) {
      return (
        <div>
          {rooms.map(room => <Room key={room.id} {...room} socket={socket}></Room>)}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            New Room
      </Button>

        </div>)
    }
    if (tab === 1) {
      return <OnlineList />
    }
  }


  return (
    <div className="navigator">
      <Navigationtab onChange={(e) => setTab(e)} />
      {tabRender()}


    </div>
  );
}

function mapState(state) {
  const { rooms, usersOnline } = state
  return { rooms, usersOnline }
}
export default connect(mapState)(Navigator)
