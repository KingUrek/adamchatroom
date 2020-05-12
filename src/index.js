import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux'
import { store } from './redux'
import AudioSender from './components/AudioSender'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <AudioSender></AudioSender> */}



    </Provider>

  </React.StrictMode>,
  document.getElementById("root")
);
