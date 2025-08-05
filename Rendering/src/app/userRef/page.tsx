'use client'

import { useRef } from "react"
   
export default function UserFocus() {
    const inputUser = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        if (inputUser.current) {
            inputUser.current.focus();
            console.log("Current input value:", inputUser.current.value);
        }
    };
    
    return (
        <div style={{
            textAlign: "center"
        }}>
            <h1>Focus Input</h1>

            <br /><br />

            <input
                ref={inputUser}
                type="text"
                placeholder="Input stores in console"
            />

            <br /><br />

            <button
                onClick={handleClick}
                style={{
                    fontSize: '1rem',
                    cursor: 'pointer',
                }}
            >
                Focus & Log input
            </button>
        </div>
    )
}