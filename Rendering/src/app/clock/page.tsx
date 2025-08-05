'use client'

import { useEffect, useState } from "react";

export default function Clock() {
    const [clockTime, setClockTime] = useState<string>(
        new Date().toLocaleTimeString()
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setClockTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);                  
    }, []);

    useEffect(() => {
        document.title = `Time: ${clockTime}`;
    }, [clockTime]);

    return (
        <div
            style={{
                paddingTop: "50px"
            }}
        >
            <h1> Clock timer </h1>
            <p>
                <strong>Clock Time: </strong> {clockTime}
            </p>
        </div>
    )

}


// 'use client';
// import { useEffect, useState } from 'react';

// export default function Clock() {
//   const [time, setTime] = useState<string | null>(null);

//   useEffect(() => {
//     const update = () => {
//       setTime(new Date().toLocaleTimeString(undefined, {
//         hour: 'numeric',
//         minute: 'numeric',
//         second: 'numeric',
//         hour12: true
//       }));
//     };

//     update(); // initial
//     const interval = setInterval(update, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   if (!time) return null; // or a fallback

//   return <strong>{time}</strong>;
// }
