import React from 'react'
import '../style/Message.css'

export default function Message({ user, message }) {
    return (
        <div className="message-wrap">
            <span className="user">{user}</span>
            :
            <span className="message">{message}</span>

        </div>
    )
}
