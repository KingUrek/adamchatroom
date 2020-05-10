import { createStore } from "redux";



let initialState = {
  usersOnline: [],
  user: '',
  rooms: [{ name: 'Main Room', id: 0 }, { name: 'Trybe Room', id: 1 }, { name: "Jackson's Room", id: 2 }],
  room: false,
  messages: []
};

function reducer(state = initialState, action) {
  const { usersOnline, room, user, message } = action

  switch (action.type) {
    case 'SET_USERS_ONLINE':

      return { ...state, usersOnline }

    case 'SET_ROOM':

      return { ...state, room }

    case 'SET_USER':

      return { ...state, user }

    case 'SET_NEW_MESSAGE':

      return { ...state, messages: [...state.messages, message] }

    case 'CHANGE_MESSAGES':
      return { ...state, messages: message }

    default:
      return state

  }


}

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
