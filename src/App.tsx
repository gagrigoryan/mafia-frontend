import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

type TClient = {
    id: string;
    name: string;
};

function App() {
    const [name, setName] = useState<string>("");
    const [clients, setClients] = useState<TClient[]>([]);
    const socketRef = useRef<Socket>();

    const submitHandler: FormEventHandler = (event) => {
        event.preventDefault();
        name && socketRef.current?.emit("join", name);
    };

    useEffect(() => {
        socketRef.current = io("http://192.168.1.7:3003/");

        socketRef.current?.on("get-clients", (message: { data: TClient[] }) => {
            setClients(message.data);
        });
    }, []);

    return (
        <div className="App">
            <form onSubmit={submitHandler}>
                <input value={name} onChange={(event) => setName(event.target.value)} type="text" />
                <button type="submit">Join</button>
            </form>
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>{client.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
