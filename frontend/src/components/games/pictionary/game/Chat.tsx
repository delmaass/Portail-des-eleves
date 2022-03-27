import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ChatService } from "../services/services";

interface Message {
    user: string;
    message: string;
}

export const Chat = ({chatService} : {chatService: ChatService}) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = () => {
        const messageEl = document.querySelector('#message') as HTMLInputElement;
        if(messageEl) {
            const message = messageEl.value;
            if(message !== "") {
                chatService.sendMessage(message);
            }
            messageEl.value = "";
        }
    }

    useEffect(() => {
        chatService.onNewMessage().subscribe((msg: Message) => setMessages(messages => [msg, ...messages]));

        return () => {
            setMessages([]);
        };
    }, []);

    return (
        <div className="mt-2">
            <ul id="chat" className="border rounded-3 border-black p-2">
                {messages ? messages.map((msg, idx) => (
                    <li key={idx}>
                        <b>{msg.user}</b>
                        <br/>{msg.message}
                    </li>
                )) : ""}
            </ul>
            <div className="d-flex w-100">
                <input type="text" name="message" id="message" className="mr-2"/>
                <Button variant="primary" onClick={sendMessage} />
            </div>
        </div>
    );
}