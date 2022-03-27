import { SocketService } from "./SocketService";

export class ChatService extends SocketService {
    constructor(socketService) {
        super(socketService)

        this.socket = socketService.socket;
    }

    sendMessage(msg) {
        this.socket.emit('chat:newMessage', msg);
    }
    
    onNewMessage() {
        return super.toObservable('chat:newMessage');
    }
}