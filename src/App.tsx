import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

function App() {
    const [clientCount, setClientCount] = useState<number>(0);
    const socketRef = useRef<Socket>();

    useEffect(() => {
        socketRef.current = io("http://192.168.1.7:3003/");
        console.log(socketRef);

        socketRef.current?.on("client-count", (message: { data: number }) => {
            setClientCount(message.data);
        });
    }, []);

    return <div className="App">Clients {clientCount}</div>;
}

export default App;
