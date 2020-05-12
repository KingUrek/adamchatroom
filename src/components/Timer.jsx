import React, { useState, useEffect } from 'react'

export default function Timer() {
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        let timeint = setInterval(() => setTimer(timer + 1), 1000)
        return () => {
            clearInterval(timeint);
        }
    })


    return (
        <span>{timer}</span>
    )
}
