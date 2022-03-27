import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ChatService } from "../services/services";

export const Chat = ({chatService} : {chatService: ChatService}) => {
    const [messages, setMessages] = useState<string[]>([]);

    const sendMessage = () => {
        const messageEl = document.querySelector('#message') as HTMLInputElement;
        if(messageEl) {
            const message = messageEl.value;
            chatService.sendMessage(message);
            messageEl.value = "";
        }
    }
    
    const scrollToBottom = () => {
        setTimeout(() => {
          const chat = document.querySelector('#chat');
          if(chat) {
            chat.scrollTop = chat.scrollHeight;
          }
        });
      }

    useEffect(() => {
        chatService.onNewMessage().subscribe((msg: string) => {
            setMessages([...messages, msg]);
            scrollToBottom();
        });

        return () => {
            setMessages([]);
        }
    }, []);

    return (
        <div>
            <ul>

            </ul>
            <div>
                <input type="text" name="message" id="message"/>
                <Button variant="primary" onClick={sendMessage} />
            </div>
        </div>
    );
}