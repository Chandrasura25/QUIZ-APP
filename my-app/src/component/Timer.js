import React, { useState, useEffect, useRef } from 'react'

const Timer = () => {
    const [timer, setTimer] = useState(10);
    const id = useRef(null);
    useEffect(() => {
        id.current = window.setInterval(() => {
            setTimer((time) => time - 1)
        }, 1000)
        return () => clear();
    }, [])
    useEffect(() => {
        if (timer === 0) {
            clear()
        }

    }, [timer])
    const clear = () => {
        window.clearInterval(id.current)
    }
    return (
        <>
            <div>Time left : {timer} </div>

        </>
    )
}

export default Timer

